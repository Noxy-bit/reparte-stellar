import React, { useState, useEffect } from 'react';
import { splitRemittance } from '../lib/split.js';
import { sendSplit } from '../lib/stellar.js';
import { 
  ArrowLeft, 
  Send, 
  ShieldCheck, 
  Wallet, 
  Lock, 
  Layers, 
  Clock, 
  AlertCircle, 
  Zap, 
  Loader2 
} from 'lucide-react';

const LOADING_STEPS = [
  '1/3 Construyendo transacción atómica dual...',
  '2/3 Firmando criptográficamente...',
  '3/3 Transmitiendo a la red Stellar...',
];

export function Enviar({ monto, porcentajeCuota, destinatario, onBack, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  const split = splitRemittance(monto, porcentajeCuota);

  useEffect(() => {
    let interval;
    if (loading) {
      interval = setInterval(() => {
        setLoadingStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
      }, 1400);
    } else {
      setLoadingStepIndex(0);
    }
    return () => clearInterval(interval);
  }, [loading]);

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
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-slate-800/80 pb-4">
        <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-950/60 text-amber-300 border border-amber-800/50 mb-2">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          Paso 2 de 3 · Confirmación y Ejecución
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Confirmar Envío Atómico</h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Verifica el split. Ambas transferencias se ejecutarán juntas en el mismo bloque.
        </p>
      </div>

      {/* Ticket / Voucher Card */}
      <div className="bg-slate-950/70 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-inner">
        {/* Total Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
          <div>
            <div className="text-xs text-slate-400 font-medium">Monto a procesar</div>
            <div className="text-3xl font-extrabold text-white tracking-tight mt-0.5 tabular-nums">
              ${split.montoTotal} <span className="text-sm font-normal text-slate-400 font-mono">USDp</span>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              1 Transacción Atómica
            </span>
            <div className="text-[11px] text-slate-500 mt-1">Garantía Stellar</div>
          </div>
        </div>

        {/* Dual Destination Visual Breakdown */}
        <div className="space-y-3 pt-1">
          <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            Distribución automática del dinero:
          </div>

          <div className="space-y-2.5">
            {/* Destino 1: Gasto Diario */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-emerald-900/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <Wallet className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Gasto del día · {destinatario}
                  </div>
                  <div className="text-[11px] text-emerald-400">
                    Disponible de inmediato para gastos urgentes
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-emerald-300 tabular-nums">
                  ${split.paraHoy}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {split.porcentajeHoy}%
                </div>
              </div>
            </div>

            {/* Destino 2: Cuenta Cuota */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/90 border border-indigo-900/40">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-200">
                    Cuenta Cuota Protegida
                  </div>
                  <div className="text-[11px] text-indigo-400">
                    Apartado directo en cuenta secundaria
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-base font-bold text-indigo-300 tabular-nums">
                  ${split.cuota}
                </div>
                <div className="text-[10px] text-slate-500 font-mono">
                  {split.porcentajeCuota}%
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Technical Ledger Details */}
        <div className="pt-3 border-t border-slate-800/80 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Memo On-Chain:</span>
            <span className="font-mono text-slate-200 font-medium bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              REPARTE
            </span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Red de validación:</span>
            <span className="text-slate-300 font-medium">Stellar Testnet</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Comisión de red (Gas):</span>
            <span className="text-emerald-400 font-mono font-medium">~0.00001 XLM (Gratuito)</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Tiempo de liquidación:</span>
            <span className="text-slate-300 flex items-center gap-1 font-medium">
              <Clock className="w-3 h-3 text-slate-400" /> ~3 a 5 segundos
            </span>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/60 text-xs text-rose-200 flex items-start gap-2.5 animate-fadeIn">
          <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <div className="font-semibold text-rose-300">Error en la transacción</div>
            <div className="text-[11px] text-rose-300/80 leading-relaxed">{error}</div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3 pt-2">
        <button 
          type="button"
          onClick={onBack} 
          disabled={loading}
          className="flex-1 sm:flex-none flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium text-xs text-slate-300 bg-slate-800 hover:bg-slate-700/80 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700/60 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Atrás</span>
        </button>

        <button 
          type="button"
          onClick={handleSend} 
          disabled={loading}
          className="flex-2 w-full flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:via-teal-500 hover:to-indigo-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed shadow-lg shadow-emerald-950/50 transition-all duration-200 active:scale-[0.99]"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin text-white" />
              <span>{LOADING_STEPS[loadingStepIndex]}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Send className="w-4 h-4" />
              <span>Firmar y Enviar Remesa Dual 🚀</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
