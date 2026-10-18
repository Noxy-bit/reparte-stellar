import React from 'react';
import { splitRemittance } from '../lib/split.js';
import { 
  User, 
  DollarSign, 
  Lock, 
  Wallet, 
  ArrowRight, 
  Sparkles, 
  ShieldCheck, 
  GraduationCap, 
  Home, 
  HeartPulse, 
  PiggyBank 
} from 'lucide-react';

const CATEGORIAS_CUOTA = [
  { id: 'matricula', label: 'Matrícula', icon: GraduationCap },
  { id: 'alquiler', label: 'Alquiler', icon: Home },
  { id: 'salud', label: 'Salud', icon: HeartPulse },
  { id: 'ahorro', label: 'Ahorro', icon: PiggyBank },
];

const PRESET_AMOUNTS = [100, 200, 300, 500];

const PRESET_RECIPIENTS = [
  'Mamá (La Paz)',
  'Papá (Cochabamba)',
  'Hna. Sofía (El Alto)',
];

export function Madrid({ 
  monto, 
  setMonto, 
  porcentajeCuota, 
  setPorcentajeCuota, 
  destinatario, 
  setDestinatario, 
  categoriaCuota = 'matricula',
  setCategoriaCuota = () => {},
  onNext 
}) {
  const split = splitRemittance(monto, porcentajeCuota);

  return (
    <div className="space-y-6">
      {/* Route Badge & Subtitle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-950/70 text-indigo-300 border border-indigo-800/50 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
            Paso 1 de 3 · Configuración
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Configura tu Remesa</h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            El dinero se divide en dos destinos automáticamente al enviarse.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/60 border border-slate-700/50 text-xs font-medium text-slate-300 self-start sm:self-center">
          <span>🇪🇸 Madrid</span>
          <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
          <span>🇧🇴 La Paz</span>
        </div>
      </div>

      {/* Recipient Input */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-indigo-400" />
            ¿A quién envías la remesa?
          </span>
          <span className="text-[11px] text-slate-500 font-normal">Destinatario familiar</span>
        </label>
        
        <div className="relative">
          <input 
            type="text" 
            value={destinatario} 
            onChange={(e) => setDestinatario(e.target.value)} 
            placeholder="Ej. Mamá (La Paz)"
            className="w-full pl-3.5 pr-4 py-2.5 bg-slate-900/90 border border-slate-800 rounded-xl text-slate-100 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
          />
        </div>

        {/* Quick Recipients */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {PRESET_RECIPIENTS.map((rec) => (
            <button
              key={rec}
              type="button"
              onClick={() => setDestinatario(rec)}
              className={`text-[11px] px-2.5 py-1 rounded-lg transition-all ${
                destinatario === rec
                  ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/50'
                  : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800 border border-transparent'
              }`}
            >
              {rec}
            </button>
          ))}
        </div>
      </div>

      {/* Amount Input */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            Monto total a enviar
          </span>
          <span className="text-[11px] text-slate-400 font-mono">Moneda: USDp (Stellar)</span>
        </label>

        <div className="relative flex items-center">
          <span className="absolute left-3.5 text-slate-400 font-semibold text-lg">$</span>
          <input 
            type="number" 
            min="1"
            value={monto} 
            onChange={(e) => setMonto(e.target.value)} 
            className="w-full pl-8 pr-20 py-3 bg-slate-900/90 border border-slate-800 rounded-xl text-white font-semibold text-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors tabular-nums"
          />
          <div className="absolute right-3 px-2 py-1 rounded-md bg-slate-800 border border-slate-700 text-xs font-mono font-medium text-slate-300">
            USDp
          </div>
        </div>

        {/* Quick Amounts */}
        <div className="grid grid-cols-4 gap-2 pt-1">
          {PRESET_AMOUNTS.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => setMonto(amt)}
              className={`py-1.5 text-xs font-medium rounded-lg transition-all border ${
                Number(monto) === amt
                  ? 'bg-indigo-600/20 border-indigo-500 text-indigo-300 font-bold'
                  : 'bg-slate-800/50 border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>
      </div>

      {/* Cuota Category Selector */}
      <div className="space-y-2">
        <label className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
            ¿Qué cuota estás protegiendo?
          </span>
          <span className="text-[11px] text-slate-500">Etiqueta de la cuenta</span>
        </label>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CATEGORIAS_CUOTA.map((cat) => {
            const Icon = cat.icon;
            const isSelected = categoriaCuota === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setCategoriaCuota(cat.id)}
                className={`flex items-center justify-center gap-1.5 p-2 rounded-xl text-xs font-medium border transition-all ${
                  isSelected
                    ? 'bg-indigo-600/20 border-indigo-500/80 text-indigo-300 shadow-sm'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800/80 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The Split Slider & Interactive Visualizer */}
      <div className="space-y-3 bg-slate-950/60 p-4 rounded-2xl border border-slate-800/80">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-indigo-400" />
            Porcentaje apartado para la Cuota
          </span>
          <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold border border-indigo-500/30">
            {porcentajeCuota}%
          </span>
        </div>

        {/* Range Slider */}
        <input 
          type="range" 
          min="10" 
          max="60" 
          step="5"
          value={porcentajeCuota} 
          onChange={(e) => setPorcentajeCuota(Number(e.target.value))} 
          className="w-full"
        />

        <div className="flex justify-between text-[11px] text-slate-500 px-0.5">
          <span>Mínimo 10%</span>
          <span>Sugerido 30%</span>
          <span>Máximo 60%</span>
        </div>

        {/* Visual Split Segmented Bar */}
        <div className="space-y-2 pt-2">
          <div className="h-4 w-full bg-slate-900 rounded-full overflow-hidden flex p-0.5 border border-slate-800">
            <div 
              style={{ width: `${100 - porcentajeCuota}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-l-full transition-all duration-300"
            />
            <div 
              style={{ width: `${porcentajeCuota}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-r-full transition-all duration-300"
            />
          </div>

          {/* Cards for Split Summary */}
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {/* Para hoy */}
            <div className="bg-emerald-950/30 border border-emerald-900/40 rounded-xl p-3">
              <div className="flex items-center justify-between text-emerald-400 text-xs font-medium">
                <span className="flex items-center gap-1">
                  <Wallet className="w-3.5 h-3.5" />
                  Para hoy
                </span>
                <span className="text-[10px] font-bold bg-emerald-950 px-1.5 py-0.5 rounded text-emerald-300">
                  {100 - porcentajeCuota}%
                </span>
              </div>
              <div className="text-xl font-bold text-emerald-300 mt-1 tabular-nums">
                ${split.paraHoy}
              </div>
              <p className="text-[10px] text-emerald-400/80 mt-0.5">
                Gastos diarios / comida
              </p>
            </div>

            {/* Cuota */}
            <div className="bg-indigo-950/30 border border-indigo-900/40 rounded-xl p-3">
              <div className="flex items-center justify-between text-indigo-400 text-xs font-medium">
                <span className="flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" />
                  Cuenta Cuota
                </span>
                <span className="text-[10px] font-bold bg-indigo-950 px-1.5 py-0.5 rounded text-indigo-300">
                  {porcentajeCuota}%
                </span>
              </div>
              <div className="text-xl font-bold text-indigo-300 mt-1 tabular-nums">
                ${split.cuota}
              </div>
              <p className="text-[10px] text-indigo-400/80 mt-0.5">
                Apartado intocable
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Savings & Fees Comparison Callout */}
      <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-slate-900/60 border border-emerald-800/30">
        <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="text-xs space-y-0.5">
          <div className="font-semibold text-emerald-300 flex items-center gap-1.5">
            Ahorro estimado en comisión: ~${split.ahorroComision} USD
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            Comisión Reparte (1%): <strong className="text-slate-200">${split.comisionReparte}</strong> vs. remesadoras tradicionales (6% a 8%): <span className="line-through text-slate-500">${split.comisionTradicional}</span>.
          </p>
        </div>
      </div>

      {/* CTA Button */}
      <button 
        type="button"
        onClick={onNext} 
        disabled={!monto || Number(monto) <= 0}
        className="w-full group relative flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 disabled:from-slate-800 disabled:to-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed shadow-lg shadow-indigo-950/50 transition-all duration-200 active:scale-[0.99]"
      >
        <span>Continuar al Resumen de Envío</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </div>
  );
}
