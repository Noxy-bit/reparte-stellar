import React, { useState } from 'react';
import { splitRemittance } from '../lib/split.js';
import { sendSplit } from '../lib/stellar.js';

export function Enviar({ monto, porcentajeCuota, destinatario, onBack, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const split = splitRemittance(monto, porcentajeCuota);

  const handleSend = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await sendSplit({ monto, porcentajeCuota });
      onSuccess(result);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al ejecutar la transacción atómica en Testnet.');
      setLoading(false);
    }
  };

  return (
    <div>
      <span className="badge">Paso 2 de 3 · Ejecución Testnet</span>
      <h2>Confirmar envío atómico</h2>
      <p>Se ejecutará una sola transacción en Stellar con dos operaciones simultáneas hacia {destinatario}.</p>

      <div className="card">
        <div className="card-title">Resumen de operación</div>
        <p style={{ marginTop: '8px' }}>Total a procesar: <strong>${split.montoTotal}</strong></p>
        <p>• Destino 1 (Gasto diario): <strong>${split.paraHoy}</strong></p>
        <p>• Destino 2 (Cuenta Cuota): <strong>${split.cuota}</strong></p>
        <p>• Memo de red: <code>REPARTE</code></p>
      </div>

      {error && <div className="alert-error">❌ {error}</div>}

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        <button className="btn" style={{ background: '#374151' }} onClick={onBack} disabled={loading}>
          ← Atrás
        </button>
        <button className="btn" onClick={handleSend} disabled={loading}>
          {loading ? 'Firmando transacción...' : 'Enviar remesa partida 🚀'}
        </button>
      </div>
    </div>
  );
}
