import React from 'react';
import { expertUrl } from '../lib/expert.js';

export function LaPaz({ result, onReset }) {
  if (!result) return null;
  const { hash, split, assetCode, familyAccount, cuotaAccount } = result;
  const url = expertUrl(hash);

  return (
    <div>
      <span className="badge">Paso 3 de 3 · Destino / La Paz</span>
      <h2>¡Remesa entregada y partida!</h2>
      <p>La transacción atómica se completó con éxito en la red de pruebas de Stellar.</p>

      <div className="card" style={{ borderColor: '#059669' }}>
        <div className="card-title">Cuenta 1 · Gasto del día (Para hoy)</div>
        <div className="card-amount">${split.paraHoy} {assetCode}</div>
        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px', wordBreak: 'break-all' }}>
          Destino: {familyAccount}
        </div>
      </div>

      <div className="card" style={{ borderColor: '#2563eb' }}>
        <div className="card-title">Cuenta 2 · Cuenta Cuota (Matrícula / Alquiler)</div>
        <div className="card-amount" style={{ color: '#60a5fa' }}>${split.cuota} {assetCode}</div>
        <div style={{ fontSize: '0.75rem', color: '#9ca3af', marginTop: '4px', wordBreak: 'break-all' }}>
          Destino: {cuotaAccount}
        </div>
      </div>

      <div className="preview-box">
        <p><strong>Comprobante Verificable (Hash):</strong></p>
        <a href={url} target="_blank" rel="noreferrer" className="link" style={{ fontSize: '0.85rem' }}>
          {hash} ↗
        </a>
        <p style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '6px' }}>
          Abre este enlace en Stellar Expert para ver las dos operaciones en el mismo recibo. ¡Ideal para los +10 puntos de bonus!
        </p>
      </div>

      <button className="btn" onClick={onReset} style={{ marginTop: '10px' }}>
        Hacer otro envío
      </button>
    </div>
  );
}
