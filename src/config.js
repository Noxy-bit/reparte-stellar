export const CONFIG = {
  horizonUrl: import.meta.env.VITE_HORIZON_URL || 'https://horizon-testnet.stellar.org',
  networkPassphrase:
    import.meta.env.VITE_NETWORK_PASSPHRASE || 'Test SDF Network ; September 2015',
  assetCode: import.meta.env.VITE_ASSET_CODE || 'USDp',
  issuerPublic: import.meta.env.VITE_ISSUER_PUBLIC || '',
  senderPublic: import.meta.env.VITE_SENDER_PUBLIC || '',
  senderSecret: import.meta.env.VITE_SENDER_SECRET || '',
  familyPublic: import.meta.env.VITE_FAMILY_PUBLIC || '',
  cuotaPublic: import.meta.env.VITE_CUOTA_PUBLIC || '',
  memo: 'REPARTE',
  feeRate: 0.01, // 1% modelo de negocio vs 6%-8% tradicional
  defaults: {
    monto: 200,
    destinatario: 'Mamá (La Paz)',
    porcentajeCuota: 30,
  },
};
