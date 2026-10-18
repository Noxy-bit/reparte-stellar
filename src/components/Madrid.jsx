import React from 'react';
import { splitRemittance } from '../lib/split.js';

export function Madrid({ monto, setMonto, porcentajeCuota, setPorcentajeCuota, destinatario, setDestinatario, onNext }) {
  const split = splitRemittance(monto, porcentajeCuota);

  return (
    <div>
      <span className="badge">Paso 1 de 3 · Madrid / Origen</span>
      <h1>Reparte</h1>
      <p>Configura tu remesa familiar. El dinero se divide automáticamente en el envío.</p>

      <div className="form-group" style={{ marginTop: '20px' }}>
        <label>Nombre de quien recibe (ej. Mamá en La Paz)</label>
        <input 
          type="text" 
          value={destinatario} 
          onChange={(e) => setDestinatario(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Monto total a enviar (USD / USDp)</label>
        <input 
          type="number" 
          value={monto} 
          onChange={(e) => setMonto(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Porcentaje apartado para la Cuota ({porcentajeCuota}%)</label>
        <input 
          type="range" 
          min="10" 
          max="60" 
          step="5"
          value={porcentajeCuota} 
          onChange={(e) => setPorcentajeCuota(e.target.value)} 
          style={{ width: '100%', accentColor: '#60a5fa', cursor: 'pointer' }}
        />
      </div>

      <div className="preview-box">
        <p><strong>Vista previa del Split:</strong></p>
        <p>🟢 Para hoy ({100 - porcentajeCuota}%): <strong>${split.paraHoy}</strong></p>
        <p>🔒 Cuota ({porcentajeCuota}%): <strong>${split.cuota}</strong></p>
        <p style={{ fontSize: '0.8rem', color: '#34d399', marginTop: '6px' }}>
          💡 Comisión Reparte (1%): ${split.comisionReparte} (Ahorras ~${split.ahorroComision} vs remesadoras)
        </p>
      </div>

      <button className="btn" onClick={onNext} style={{ marginTop: '10px' }}>
        Continuar al envío →
      </button>
    </div>
  );
}
