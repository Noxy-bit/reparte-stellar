import { CONFIG } from '../config.js';

export function splitRemittance(montoTotal, porcentajeCuota) {
  const monto = Number(montoTotal) || 0;
  const pct = Math.min(Math.max(Number(porcentajeCuota) || 0, 0), 100) / 100;

  const cuota = Number((monto * pct).toFixed(2));
  const paraHoy = Number((monto - cuota).toFixed(2));
  const comisionReparte = Number((monto * CONFIG.feeRate).toFixed(2));
  const comisionTradicional = Number((monto * 0.07).toFixed(2)); // Promedio 7% Western Union
  const ahorroComision = Number((comisionTradicional - comisionReparte).toFixed(2));

  return {
    montoTotal: monto.toFixed(2),
    paraHoy: paraHoy.toFixed(2),
    cuota: cuota.toFixed(2),
    porcentajeHoy: Math.round((1 - pct) * 100),
    porcentajeCuota: Math.round(pct * 100),
    comisionReparte: comisionReparte.toFixed(2),
    comisionTradicional: comisionTradicional.toFixed(2),
    ahorroComision: ahorroComision.toFixed(2),
  };
}
