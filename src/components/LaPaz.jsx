import React, { useState } from 'react';
import { expertUrl } from '../lib/expert.js';
import { 
  CheckCircle2, 
  ExternalLink, 
  Copy, 
  Check, 
  Wallet, 
  Lock, 
  Share2, 
  RefreshCw, 
  ShieldCheck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export function LaPaz({ result, onReset }) {
  const [copiedHash, setCopiedHash] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  if (!result) return null;
  const { hash, split, assetCode, familyAccount, cuotaAccount, ledger } = result;
  const url = expertUrl(hash);

  const copyToClipboard = (text, setCopied) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola! Ya llegó la remesa con Reparte:\n` +
      `🟢 Para el día a día: $${split.paraHoy} ${assetCode}\n` +
      `🔒 Cuenta Cuota: $${split.cuota} ${assetCode}\n\n` +
      `Comprobante verificado en Stellar: ${url}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Success Celebration Hero */}
      <div className="text-center pt-2 pb-4 border-b border-slate-800/80">
        <div className="inline-flex p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 shadow-lg shadow-emerald-950/40 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-950/70 text-emerald-300 border border-emerald-800/50 mb-2">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Paso 3 de 3 · Destino / La Paz
        </div>

        <h2 className="text-2xl font-bold text-white tracking-tight">
          ¡Remesa Entregada y Separada!
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto mt-1">
          La transacción atómica se completó en Stellar Testnet. Ambos fondos llegaron a sus cuentas.
        </p>
      </div>

      {/* Dual Account Balances in La Paz */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Cuenta 1: Gasto Diario */}
        <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-slate-900 border border-emerald-700/40 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
              <Wallet className="w-3.5 h-3.5 text-emerald-400" />
              Gasto del Día
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-emerald-900/60 text-emerald-200">
              Disponible
            </span>
          </div>

          <div>
            <div className="text-2xl font-black text-white tabular-nums tracking-tight">
              ${split.paraHoy} <span className="text-xs font-mono font-normal text-emerald-300">{assetCode}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Listo para comida, pasajes y servicios familiares.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 truncate font-mono">
            Cuenta: {familyAccount ? `${familyAccount.slice(0, 8)}...${familyAccount.slice(-8)}` : 'G...FAMILY'}
          </div>
        </div>

        {/* Cuenta 2: Cuota Blindada */}
        <div className="relative overflow-hidden p-4 rounded-2xl bg-gradient-to-b from-indigo-950/30 to-slate-900 border border-indigo-700/40 shadow-sm space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-indigo-300">
              <Lock className="w-3.5 h-3.5 text-indigo-400" />
              Cuenta Cuota
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-md bg-indigo-900/60 text-indigo-200">
              Apartado
            </span>
          </div>

          <div>
            <div className="text-2xl font-black text-white tabular-nums tracking-tight">
              ${split.cuota} <span className="text-xs font-mono font-normal text-indigo-300">{assetCode}</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Protegido para matrícula o alquiler. No entra al gasto común.
            </p>
          </div>

          <div className="pt-2 border-t border-slate-800/60 text-[10px] text-slate-500 truncate font-mono">
            Cuenta: {cuotaAccount ? `${cuotaAccount.slice(0, 8)}...${cuotaAccount.slice(-8)}` : 'G...CUOTA'}
          </div>
        </div>
      </div>

      {/* Stellar Proof Explorer Box */}
      <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            Comprobante Criptográfico (Stellar Expert)
          </span>
          {ledger && (
            <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              Ledger #{ledger}
            </span>
          )}
        </div>

        {/* Hash display with copy button */}
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800/80">
          <span className="font-mono text-xs text-indigo-300 truncate flex-1 select-all">
            {hash}
          </span>
          <button
            type="button"
            onClick={() => copyToClipboard(hash, setCopiedHash)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
            title="Copiar Hash"
          >
            {copiedHash ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1">
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium bg-indigo-600/20 text-indigo-300 border border-indigo-500/40 hover:bg-indigo-600/30 transition-colors"
          >
            <span>Ver 2 operaciones en Stellar Expert</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-xs font-medium bg-emerald-600/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-600/30 transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Compartir por WhatsApp</span>
          </button>
        </div>
      </div>

      {/* Action / Reset */}
      <button 
        type="button"
        onClick={onReset} 
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-xs text-slate-300 bg-slate-800 hover:bg-slate-700/80 hover:text-white border border-slate-700/60 transition-colors"
      >
        <RefreshCw className="w-3.5 h-3.5" />
        <span>Hacer otro envío de remesa</span>
      </button>
    </div>
  );
}
