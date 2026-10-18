export function expertUrl(hash) {
  if (!hash) return 'https://stellar.expert/explorer/testnet';
  return `https://stellar.expert/explorer/testnet/tx/${hash}`;
}

export function expertAccountUrl(publicKey) {
  if (!publicKey) return 'https://stellar.expert/explorer/testnet';
  return `https://stellar.expert/explorer/testnet/account/${publicKey}`;
}
