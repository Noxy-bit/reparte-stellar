import fs from 'node:fs';
import * as StellarSdk from '@stellar/stellar-sdk';

const HORIZON_URL = 'https://horizon-testnet.stellar.org';
const PASSPHRASE = StellarSdk.Networks.TESTNET;
const ASSET_CODE = 'USDp';

const Server = StellarSdk.Horizon?.Server || StellarSdk.Server;
const server = new Server(HORIZON_URL);
const { Keypair, Asset, Operation, TransactionBuilder, BASE_FEE } = StellarSdk;

async function fondearConFriendbot(nombre, publicKey) {
  console.log(`⏳ Fondeando cuenta [${nombre}]: ${publicKey}...`);
  const res = await fetch(`https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Error en Friendbot para ${nombre}: ${text}`);
  }
  console.log(`✅ Cuenta [${nombre}] fondeada en Testnet.`);
}

async function abrirTrustline(nombre, cuentaKeypair, asset) {
  console.log(`⏳ Abriendo trustline de ${asset.getCode()} para [${nombre}]...`);
  const cuenta = await server.loadAccount(cuentaKeypair.publicKey());

  const tx = new TransactionBuilder(cuenta, {
    fee: BASE_FEE,
    networkPassphrase: PASSPHRASE,
  })
    .addOperation(
      Operation.changeTrust({
        asset,
      })
    )
    .setTimeout(60)
    .build();

  tx.sign(cuentaKeypair);
  const result = await server.submitTransaction(tx);
  console.log(`✅ Trustline abierta para [${nombre}] (tx: ${result.hash.slice(0, 12)}...)`);
}

async function main() {
  console.log('🚀 Creando las 3 cuentas de Reparte en Stellar Testnet...\n');

  const emisor = Keypair.random();
  const familia = Keypair.random();
  const cuota = Keypair.random();

  // 1. Fondear las 3 cuentas en paralelo con Friendbot
  await Promise.all([
    fondearConFriendbot('Emisor (Madrid)', emisor.publicKey()),
    fondearConFriendbot('Familia (Para hoy)', familia.publicKey()),
    fondearConFriendbot('Cuenta Cuota', cuota.publicKey()),
  ]);

  // 2. Definir el asset USDp emitido por la cuenta Emisor
  const usdpAsset = new Asset(ASSET_CODE, emisor.publicKey());

  // 3. Abrir trustlines en Familia y Cuenta Cuota para que puedan recibir USDp
  await abrirTrustline('Familia (Para hoy)', familia, usdpAsset);
  await abrirTrustline('Cuenta Cuota', cuota, usdpAsset);

  // 4. Construir y guardar el archivo .env (NO se sube a Git porque está en .gitignore)
  const envContent = `VITE_HORIZON_URL=${HORIZON_URL}
VITE_NETWORK_PASSPHRASE="${PASSPHRASE}"
VITE_ASSET_CODE=${ASSET_CODE}
VITE_ISSUER_PUBLIC=${emisor.publicKey()}
VITE_ISSUER_SECRET=${emisor.secret()}
VITE_SENDER_PUBLIC=${emisor.publicKey()}
VITE_SENDER_SECRET=${emisor.secret()}
VITE_FAMILY_PUBLIC=${familia.publicKey()}
VITE_FAMILY_SECRET=${familia.secret()}
VITE_CUOTA_PUBLIC=${cuota.publicKey()}
VITE_CUOTA_SECRET=${cuota.secret()}
`;

  fs.writeFileSync('.env', envContent, 'utf8');

  console.log('\n🎉 ¡Listo! Archivo .env generado automáticamente con estos datos:\n');
  console.log(envContent);
}

main().catch((err) => {
  console.error('❌ Error ejecutando scripts/cuentas.mjs:', err);
  process.exit(1);
});
