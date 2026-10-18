import * as StellarSdk from '@stellar/stellar-sdk';
import { CONFIG } from '../config.js';
import { splitRemittance } from './split.js';

const Server = StellarSdk.Horizon?.Server || StellarSdk.Server;
const { Keypair, Asset, Operation, TransactionBuilder, BASE_FEE, Memo } = StellarSdk;

export async function sendSplit({ monto, porcentajeCuota }) {
  if (!CONFIG.senderSecret || !CONFIG.familyPublic || !CONFIG.cuotaPublic) {
    throw new Error(
      'Faltan las llaves en el archivo .env. Ejecuta primero: npm run cuentas'
    );
  }

  const server = new Server(CONFIG.horizonUrl);
  const senderKeypair = Keypair.fromSecret(CONFIG.senderSecret);
  const sourceAccount = await server.loadAccount(senderKeypair.publicKey());

  const split = splitRemittance(monto, porcentajeCuota);

  // Si existe issuer configurado usamos USDp, si no como Plan B usamos XLM nativo
  const asset = CONFIG.issuerPublic
    ? new Asset(CONFIG.assetCode, CONFIG.issuerPublic)
    : Asset.native();

  let builder = new TransactionBuilder(sourceAccount, {
    fee: BASE_FEE,
    networkPassphrase: CONFIG.networkPassphrase,
  });

  // Operación 1: Pago para el gasto del día (Familia - Hoy)
  if (Number(split.paraHoy) > 0) {
    builder = builder.addOperation(
      Operation.payment({
        destination: CONFIG.familyPublic,
        asset,
        amount: split.paraHoy,
      })
    );
  }

  // Operación 2: Pago directo a la Cuenta Cuota (Matrícula / Alquiler)
  if (Number(split.cuota) > 0) {
    builder = builder.addOperation(
      Operation.payment({
        destination: CONFIG.cuotaPublic,
        asset,
        amount: split.cuota,
      })
    );
  }

  const tx = builder
    .addMemo(Memo.text(CONFIG.memo))
    .setTimeout(60)
    .build();

  tx.sign(senderKeypair);

  const response = await server.submitTransaction(tx);

  return {
    hash: response.hash,
    ledger: response.ledger,
    assetCode: CONFIG.issuerPublic ? CONFIG.assetCode : 'XLM',
    familyAccount: CONFIG.familyPublic,
    cuotaAccount: CONFIG.cuotaPublic,
    split,
  };
}
