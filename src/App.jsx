import React, { useState } from 'react';
import { 
  Wallet, 
  Send, 
  QrCode, 
  Home, 
  GraduationCap, 
  HeartPulse, 
  ShieldCheck, 
  Check, 
  Copy, 
  Share2, 
  ArrowRight, 
  Clock, 
  Sparkles, 
  Lock, 
  Building2, 
  BadgeCheck, 
  X, 
  User,
  ChevronRight,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

// Matriz realista y densa de código QR estándar (Versión 1 - 21x21 módulos)
const QR_MATRIX_21 = [
  [1,1,1,1,1,1,1, 0, 1,0,1,1,0, 0, 1,1,1,1,1,1,1],
  [1,0,0,0,0,0,1, 0, 0,1,0,1,1, 0, 1,0,0,0,0,0,1],
  [1,0,1,1,1,0,1, 0, 1,1,0,0,1, 0, 1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1, 0, 0,0,1,0,0, 0, 1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1, 0, 1,0,1,1,1, 0, 1,0,1,1,1,0,1],
  [1,0,0,0,0,0,1, 0, 0,1,0,0,1, 0, 1,0,0,0,0,0,1],
  [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0, 0, 0,1,1,0,0, 0, 0,0,0,0,0,0,0],
  [1,1,0,1,0,0,1, 1, 0,1,0,1,1, 1, 0,1,0,1,1,0,1],
  [0,1,0,0,1,1,0, 1, 1,0,1,0,0, 0, 1,0,1,1,0,1,0],
  [1,0,1,1,0,0,1, 0, 1,1,0,1,1, 1, 0,1,0,0,1,1,1],
  [0,1,0,1,1,1,0, 1, 0,0,1,0,0, 0, 1,1,0,1,0,0,1],
  [1,0,1,0,0,1,1, 1, 1,0,1,1,0, 1, 0,0,1,0,1,1,0],
  [0,0,0,0,0,0,0, 0, 0,1,0,1,1, 0, 1,0,1,1,0,1,1],
  [1,1,1,1,1,1,1, 0, 1,0,1,0,0, 1, 0,1,0,0,1,0,1],
  [1,0,0,0,0,0,1, 0, 0,1,1,1,0, 1, 1,0,1,1,0,1,0],
  [1,0,1,1,1,0,1, 0, 1,0,0,1,1, 0, 0,1,0,1,1,0,1],
  [1,0,1,1,1,0,1, 0, 0,1,1,0,1, 1, 1,0,1,0,0,1,1],
  [1,0,1,1,1,0,1, 0, 1,1,0,1,0, 0, 0,1,1,1,0,1,0],
  [1,0,0,0,0,0,1, 0, 0,0,1,1,1, 1, 1,0,0,1,1,0,1],
  [1,1,1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,0,1,0,1,1]
];

// Componente de Código QR Realista denso
function RealisticQRCode({ size = 200 }) {
  const cellSize = 100 / 21;
  return (
    <div className="relative inline-flex items-center justify-center p-3.5 bg-white rounded-3xl shadow-sm border border-stone-200">
      <svg width={size} height={size} viewBox="0 0 100 100" className="w-full h-full">
        {QR_MATRIX_21.map((row, rIdx) =>
          row.map((val, cIdx) => {
            if (val === 1) {
              return (
                <rect
                  key={`${rIdx}-${cIdx}`}
                  x={cIdx * cellSize}
                  y={rIdx * cellSize}
                  width={cellSize + 0.15}
                  height={cellSize + 0.15}
                  rx={0.6}
                  fill="#0f172a"
                />
              );
            }
            return null;
          })
        )}
      </svg>
      {/* Isotipo central decorativo Stellar */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-8 h-8 rounded-full bg-slate-950 border-2 border-white flex items-center justify-center shadow-md">
          <Sparkles className="w-4 h-4 text-sky-400" />
        </div>
      </div>
    </div>
  );
}

export function App() {
  const [activeTab, setActiveTab] = useState('billetera'); // 'billetera' | 'enviar' | 'cobrar'
  const [copiedText, setCopiedText] = useState(false);

  // Estados reactivos de saldo para permitir el descuento en vivo
  const [balanceCasa, setBalanceCasa] = useState(120);
  const [balanceColegio, setBalanceColegio] = useState(60);
  const [balanceSalud, setBalanceSalud] = useState(20);
  const [colegioPagado, setColegioPagado] = useState(false);

  // Estados de la vista Enviar (Interactivos en tiempo real)
  const [montoEnviar, setMontoEnviar] = useState(200);
  const [pctCasa, setPctCasa] = useState(60);
  const [pctColegio, setPctColegio] = useState(30);
  const [pctSalud, setPctSalud] = useState(10);
  const [mensajeEnviar, setMensajeEnviar] = useState('Matrícula marzo');
  const [showComprobante, setShowComprobante] = useState(false);
  const [txHash] = useState('0x3a7e91...8c4f2d_stellar_atomic');

  // Estados de la vista Cobrar
  const [montoCobro, setMontoCobro] = useState(60);
  const [conceptoCobro, setConceptoCobro] = useState('Matrícula marzo');
  const [qrGenerado, setQrGenerado] = useState({
    monto: 60,
    concepto: 'Matrícula marzo',
  });

  // Modal interactivo de pago / escáner de QR
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const [activeActionModal, setActiveActionModal] = useState(null);

  // Cálculos en tiempo real
  const totalBalance = balanceCasa + balanceColegio + balanceSalud;
  const totalBsRef = (totalBalance * 6.95).toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const usdCasaCalculado = ((montoEnviar * pctCasa) / 100).toFixed(2);
  const usdColegioCalculado = ((montoEnviar * pctColegio) / 100).toFixed(2);
  const usdSaludCalculado = ((montoEnviar * pctSalud) / 100).toFixed(2);
  const bsMontoTotal = (montoEnviar * 6.95).toLocaleString('es-BO', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const comisionRed = (montoEnviar * 0.01).toFixed(2);
  const totalDebitar = (Number(montoEnviar) + Number(comisionRed)).toFixed(2);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleConfirmPayment = () => {
    if (balanceColegio >= 60) {
      setBalanceColegio((prev) => prev - 60);
      setColegioPagado(true);
      setPaymentModalOpen(false);
      setPaymentSuccessModal(true);
    } else {
      alert('Saldo insuficiente en el Sobre Colegio.');
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Comprobante de envío Reparte (Stellar)! 🚀\n` +
      `¡DINERO RECIBIDO! Envío realizado: ${montoEnviar}.00 USDp\n\n` +
      `Distribución:\n` +
      `• Casa (${pctCasa}%): ${usdCasaCalculado} USDp\n` +
      `• Colegio San Calixto (${pctColegio}%): ${usdColegioCalculado} USDp\n` +
      `• Salud (${pctSalud}%): ${usdSaludCalculado} USDp\n\n` +
      `Mensaje: "${mensajeEnviar}"\n` +
      `ID Transacción: ${txHash}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 flex justify-center selection:bg-emerald-500/20">
      {/* Contenedor Mobile-First centrado */}
      <div className="w-full max-w-md min-h-screen bg-[#F8F9FA] flex flex-col relative pb-28 shadow-xl border-x border-stone-200/70">

        {/* ---------------- 1. HEADER SUPERIOR FIJO (EN TODAS LAS VISTAS) ---------------- */}
        <header className="sticky top-0 z-30 bg-white border-b border-stone-200 px-5 py-3 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-3">
            <div className="bg-[#0D5C46] text-white font-bold rounded-xl w-9 h-9 flex items-center justify-center text-lg shadow-xs tracking-tighter">
              R
            </div>
            <div>
              <div className="font-bold text-stone-900 leading-tight text-base">Reparte</div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                Red Stellar Activa
              </div>
            </div>
          </div>

          <div className="w-9 h-9 rounded-full bg-[#0D5C46]/10 text-[#0D5C46] flex items-center justify-center border border-[#0D5C46]/20 font-bold">
            <User className="w-5 h-5 text-[#0D5C46]" />
          </div>
        </header>

        {/* ---------------- VISTA 1: BILLETERA (Por Defecto) ---------------- */}
        {activeTab === 'billetera' && (
          <div className="flex-1 px-4 pt-4 pb-6 space-y-4">
            {/* Saludo */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-stone-900 tracking-tight">Hola, Mamá 👋</h1>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-stone-200/80 text-stone-700">
                  La Paz, BO
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                En línea
              </span>
            </div>

            {/* Tarjeta Blanca Principal: Saldo Total */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-stone-200 space-y-4">
              <div>
                <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Saldo total repartido</span>
                <div className="text-3xl font-extrabold text-stone-900 tracking-tight mt-0.5">
                  {totalBalance.toFixed(2)} <span className="text-lg font-bold text-emerald-700">USDp</span>
                </div>
                <div className="text-xs font-medium text-stone-400 mt-1">
                  ≈ {totalBsRef} Bs referencial
                </div>
              </div>

              {/* Botón negro ancho para escanear QR */}
              <button
                type="button"
                onClick={() => setPaymentModalOpen(true)}
                className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-black hover:bg-stone-900 text-white font-semibold text-sm transition-transform active:scale-[0.98] shadow-md shadow-stone-900/10"
              >
                <QrCode className="w-4 h-4" />
                <span>Escanear QR para pagar</span>
              </button>
            </div>

            {/* Sección: Tus Sobres Familiares (3 activos) */}
            <div className="space-y-3.5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-stone-900 tracking-tight">
                  Tus Sobres Familiares <span className="text-stone-400 font-normal">(3 activos)</span>
                </h2>
                <span className="text-xs font-semibold text-[#0D5C46]">3 sobres activos</span>
              </div>

              {/* 3.1 SOBRE CASA (#EAF5F1) */}
              <div className="bg-[#EAF5F1] border border-[#CBE7DC] rounded-3xl p-4 space-y-3 transition-transform active:scale-[0.99] shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#0D5C46] text-white flex items-center justify-center shadow-xs">
                      <Home className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0D5C46]">Casa</div>
                      <div className="text-[11px] text-[#22725A] font-medium">Luz y mercado</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D3ECE1] text-[#0D5C46]">
                    Al día
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-stone-900 tracking-tight">
                    {balanceCasa.toFixed(2)} <span className="text-sm font-bold text-stone-500">USDp</span>
                  </div>
                  <div className="text-xs text-[#288368] font-medium mt-0.5">
                    ≈ {(balanceCasa * 6.95).toFixed(2)} Bs ref.
                  </div>
                </div>

                {/* Franja blanca limpia con botones */}
                <div className="bg-white rounded-2xl p-2.5 flex items-center justify-between border border-stone-100 shadow-xs">
                  <span className="text-xs font-semibold text-[#22725A] pl-1">Luz y mercado</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveActionModal('Mover saldo de Casa')}
                      className="bg-white border border-stone-200 text-stone-800 rounded-lg px-3.5 py-1.5 font-semibold text-xs hover:bg-stone-50 shadow-xs transition-colors"
                    >
                      Mover
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveActionModal('Pagar servicios de Casa')}
                      className="bg-[#0D5C46] hover:bg-[#094635] rounded-lg px-4 py-1.5 font-semibold text-white text-xs shadow-sm flex items-center gap-1 transition-colors"
                    >
                      <span>Pagar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* 3.2 SOBRE COLEGIO (#FDF1E8) */}
              <div className="bg-[#FDF1E8] border border-[#F9D9C3] rounded-3xl p-4 space-y-3 transition-transform active:scale-[0.99] shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#9A4B1A] text-white flex items-center justify-center shadow-xs">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#9A4B1A]">Colegio</div>
                      <div className="text-[11px] text-[#A85B29] font-medium">San Calixto · Mateo</div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                    colegioPagado ? 'bg-emerald-100 text-emerald-800' : 'bg-[#FAE2D1] text-[#9A4B1A]'
                  }`}>
                    {colegioPagado ? <Check className="w-3 h-3 stroke-[3]" /> : <Lock className="w-3 h-3" />}
                    {colegioPagado ? 'Pagado' : '🔒 Protegido'}
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-stone-900 tracking-tight">
                    {balanceColegio.toFixed(2)} <span className="text-sm font-bold text-stone-500">USDp</span>
                  </div>
                  <div className="text-xs text-[#A85B29] font-medium mt-0.5">
                    ≈ {(balanceColegio * 6.95).toFixed(2)} Bs ref.
                  </div>
                </div>

                {/* Aviso en marrón */}
                <div className="px-3 py-1.5 rounded-xl bg-[#FCE8D8] border border-[#F9D5BE] text-xs font-semibold text-[#9A4B1A] flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>🔒 Solo para pagar al colegio</span>
                </div>

                {/* Franja blanca limpia con botones */}
                <div className="bg-white rounded-2xl p-2.5 flex items-center justify-between border border-stone-100 shadow-xs">
                  <span className="text-xs font-semibold text-[#A85B29] pl-1">Cuota Octubre</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveActionModal('Mover saldo de Colegio')}
                      className="bg-white border border-stone-200 text-stone-800 rounded-lg px-3.5 py-1.5 font-semibold text-xs hover:bg-stone-50 shadow-xs transition-colors"
                    >
                      Mover
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentModalOpen(true)}
                      className="bg-[#9A4B1A] hover:bg-[#7e3d14] rounded-lg px-4 py-1.5 font-semibold text-white text-xs shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <QrCode className="w-3.5 h-3.5" />
                      <span>QR Pagar</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3.3 SOBRE SALUD (#EBF2FE) */}
              <div className="bg-[#EBF2FE] border border-[#C8DCFD] rounded-3xl p-4 space-y-3 transition-transform active:scale-[0.99] shadow-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-xs">
                      <HeartPulse className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#1D4ED8]">Salud</div>
                      <div className="text-[11px] text-[#2563EB] font-medium">Farmacia y citas</div>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#D9E7FD] text-[#1D4ED8]">
                    Seguro
                  </span>
                </div>

                <div>
                  <div className="text-3xl font-extrabold text-stone-900 tracking-tight">
                    {balanceSalud.toFixed(2)} <span className="text-sm font-bold text-stone-500">USDp</span>
                  </div>
                  <div className="text-xs text-[#2563EB] font-medium mt-0.5">
                    ≈ {(balanceSalud * 6.95).toFixed(2)} Bs ref.
                  </div>
                </div>

                {/* Franja blanca limpia con botones */}
                <div className="bg-white rounded-2xl p-2.5 flex items-center justify-between border border-stone-100 shadow-xs">
                  <span className="text-xs font-semibold text-[#1D4ED8] pl-1">Fondo imprevistos</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setActiveActionModal('Mover saldo de Salud')}
                      className="bg-white border border-stone-200 text-stone-800 rounded-lg px-3.5 py-1.5 font-semibold text-xs hover:bg-stone-50 shadow-xs transition-colors"
                    >
                      Mover
                    </button>
                    <button
                      type="button"
                      onClick={() => setActiveActionModal('Pagar farmacia o consulta')}
                      className="bg-[#1D4ED8] hover:bg-[#1e40af] rounded-lg px-4 py-1.5 font-semibold text-white text-xs shadow-sm flex items-center gap-1 transition-colors"
                    >
                      <span>Pagar</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Lista: Últimos envíos */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-stone-200 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Últimos envíos
                </h3>
                <span className="text-[11px] text-[#0D5C46] font-semibold">Stellar On-Chain</span>
              </div>

              <div className="divide-y divide-stone-100">
                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      🇪🇸
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">María, Madrid</div>
                      <div className="text-[11px] text-stone-500">Repartido en 3 sobres · Hoy</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-700">+200.00 USDp</div>
                    <div className="text-[10px] text-stone-400">Completado</div>
                  </div>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-xs">
                      🇪🇸
                    </div>
                    <div>
                      <div className="text-xs font-bold text-stone-900">María, Madrid</div>
                      <div className="text-[11px] text-stone-500">Repartido en 3 sobres · 15 Sep</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-bold text-emerald-700">+200.00 USDp</div>
                    <div className="text-[10px] text-stone-400">Completado</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- VISTA 2: ENVIAR (PULIDA CON AJUSTES SOLICITADOS) ---------------- */}
        {activeTab === 'enviar' && (
          <div className="flex-1 px-4 pt-4 pb-6 space-y-4">
            {/* Header Enviar */}
            <div className="flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Desde Madrid
                </span>
                <h1 className="text-xl font-bold text-stone-900 mt-1 tracking-tight">Nuevo envío</h1>
              </div>
              <div className="text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                Stellar Split
              </div>
            </div>

            {/* 4.1 Sección 'A quién' con tarjeta blanca completa */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">A quién</label>
              <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-xs flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-emerald-100 text-[#0D5C46] font-extrabold text-base flex items-center justify-center border border-emerald-200">
                    M
                  </div>
                  <div>
                    <div className="text-sm font-bold text-stone-900">Mamá · La Paz</div>
                    <div className="text-xs text-stone-500 font-medium">Cuenta familiar vinculada</div>
                  </div>
                </div>
                <button 
                  type="button" 
                  className="text-xs font-semibold text-stone-700 border border-stone-200 px-3 py-1.5 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors shadow-xs"
                >
                  Cambiar
                </button>
              </div>
            </div>

            {/* 4.2 Monto Total Centrado en Grande (Interactivo) */}
            <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs text-center space-y-2">
              <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Monto total a enviar</span>
              <div className="text-4xl font-extrabold text-stone-900 tracking-tight">
                {montoEnviar} <span className="text-2xl text-emerald-700 font-bold">USDp</span>
              </div>
              <div className="text-xs font-semibold text-stone-400">
                ≈ {bsMontoTotal} Bs ref. (Tasa de cambio Stellar)
              </div>
              
              {/* Slider de ajuste de monto */}
              <div className="pt-2">
                <input 
                  type="range"
                  min="50"
                  max="1000"
                  step="10"
                  value={montoEnviar}
                  onChange={(e) => setMontoEnviar(Number(e.target.value))}
                  className="w-full accent-[#0D5C46]"
                />
                <div className="flex justify-between text-[10px] text-stone-400 mt-1 font-medium">
                  <span>Mínimo 50 USDp</span>
                  <span>Desliza para ajustar</span>
                  <span>Máximo 1000 USDp</span>
                </div>
              </div>
            </div>

            {/* 4.3 Sección Sobres con barras y Sliders Interactivos */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-stone-200 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-stone-900">Sobres interactivos</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                  pctCasa + pctColegio + pctSalud === 100
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  Suma {pctCasa + pctColegio + pctSalud}%
                </span>
              </div>

              {/* Barra multicromática de progreso total */}
              <div className="h-3.5 w-full bg-stone-100 rounded-full overflow-hidden flex shadow-inner">
                <div style={{ width: `${pctCasa}%` }} className="bg-[#0D5C46] h-full transition-all duration-200" title="Casa" />
                <div style={{ width: `${pctColegio}%` }} className="bg-[#9A4B1A] h-full transition-all duration-200" title="Colegio" />
                <div style={{ width: `${pctSalud}%` }} className="bg-[#1D4ED8] h-full transition-all duration-200" title="Salud" />
              </div>

              {/* Lista editable de sobres */}
              <div className="space-y-3.5 pt-1">
                {/* Casa */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-[#EAF5F1]/60 border border-[#CBE7DC]/70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#0D5C46] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C46]"></span>
                      Casa ({pctCasa}%)
                    </span>
                    <div className="text-right">
                      <span className="font-extrabold text-stone-900">{usdCasaCalculado} USDp</span>
                      <span className="text-[10px] text-stone-500 block">≈ {(usdCasaCalculado * 6.95).toFixed(2)} Bs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={pctCasa}
                    onChange={(e) => setPctCasa(Number(e.target.value))}
                    className="w-full accent-[#0D5C46]"
                  />
                </div>

                {/* Colegio */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-[#FDF1E8]/60 border border-[#F9D9C3]/70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#9A4B1A] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#9A4B1A]"></span>
                      Colegio ({pctColegio}%)
                    </span>
                    <div className="text-right">
                      <span className="font-extrabold text-stone-900">{usdColegioCalculado} USDp</span>
                      <span className="text-[10px] text-stone-500 block">≈ {(usdColegioCalculado * 6.95).toFixed(2)} Bs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    step="5"
                    value={pctColegio}
                    onChange={(e) => setPctColegio(Number(e.target.value))}
                    className="w-full accent-[#9A4B1A]"
                  />
                </div>

                {/* Salud */}
                <div className="space-y-1.5 p-3 rounded-2xl bg-[#EBF2FE]/60 border border-[#C8DCFD]/70">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#1D4ED8] flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
                      Salud ({pctSalud}%)
                    </span>
                    <div className="text-right">
                      <span className="font-extrabold text-stone-900">{usdSaludCalculado} USDp</span>
                      <span className="text-[10px] text-stone-500 block">≈ {(usdSaludCalculado * 6.95).toFixed(2)} Bs</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="40"
                    step="5"
                    value={pctSalud}
                    onChange={(e) => setPctSalud(Number(e.target.value))}
                    className="w-full accent-[#1D4ED8]"
                  />
                </div>
              </div>
            </div>

            {/* Input de Mensaje */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-stone-200 space-y-1.5">
              <label className="text-xs font-semibold text-stone-600">Mensaje familiar o concepto</label>
              <input
                type="text"
                value={mensajeEnviar}
                onChange={(e) => setMensajeEnviar(e.target.value)}
                placeholder="Ej. Matrícula marzo"
                className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-800"
              />
            </div>

            {/* Tarjeta: Resumen de asignación */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-stone-200 space-y-2 text-xs">
              <div className="font-bold text-stone-800 pb-1 border-b border-stone-100">
                Resumen de asignación
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Subtotal remesa repartida</span>
                <span className="font-semibold text-stone-800">{montoEnviar} USDp</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Comisión de red (1%)</span>
                <span className="font-semibold text-stone-800">{comisionRed} USDp</span>
              </div>
              <div className="flex justify-between pt-1 border-t border-stone-100 text-sm font-extrabold text-stone-900">
                <span>Total a debitar</span>
                <span className="text-emerald-700">{totalDebitar} USDp</span>
              </div>
            </div>

            {/* Botón Negro: Enviar Repartido */}
            <button
              type="button"
              onClick={() => setShowComprobante(true)}
              className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-black hover:bg-stone-900 text-white font-bold text-sm shadow-md transition-transform active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              <span>Enviar repartido</span>
            </button>
          </div>
        )}

        {/* ---------------- VISTA 3: COBRAR (QR REALISTA 21x21) ---------------- */}
        {activeTab === 'cobrar' && (
          <div className="flex-1 px-4 pt-4 pb-6 space-y-4">
            {/* Header de Comercio */}
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <BadgeCheck className="w-4 h-4 text-emerald-600" />
                Comercio verificado · La Paz
              </div>
              <h1 className="text-xl font-bold text-stone-900 tracking-tight">
                Colegio San Andrés
              </h1>
            </div>

            {/* Tarjeta Total Cobrado Este Mes */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-stone-200">
              <span className="text-xs font-medium text-stone-500">Total cobrado este mes</span>
              <div className="text-3xl font-extrabold text-stone-900 tracking-tight mt-0.5">
                540 <span className="text-lg font-bold text-emerald-700">USDp</span>
              </div>
              <div className="text-xs font-medium text-stone-400 mt-1">
                9 cuotas escolares procesadas directamente
              </div>
            </div>

            {/* Formulario Nuevo Cobro */}
            <div className="bg-white rounded-3xl p-5 shadow-xs border border-stone-200 space-y-3">
              <h3 className="text-sm font-bold text-stone-900">Nuevo cobro</h3>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-500">Monto</label>
                <div className="relative flex items-center">
                  <input
                    type="number"
                    value={montoCobro}
                    onChange={(e) => setMontoCobro(e.target.value)}
                    className="w-full pl-3 pr-16 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-sm font-bold text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                  <span className="absolute right-3 text-xs font-bold text-stone-400">USDp</span>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-stone-500">Concepto</label>
                <input
                  type="text"
                  value={conceptoCobro}
                  onChange={(e) => setConceptoCobro(e.target.value)}
                  className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl text-xs font-medium text-stone-900 focus:outline-none focus:border-stone-800"
                />
              </div>

              <button
                type="button"
                onClick={() => setQrGenerado({ monto: montoCobro, concepto: conceptoCobro })}
                className="w-full py-3 px-4 rounded-xl bg-[#0D5C46] hover:bg-[#094736] text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-transform active:scale-[0.98]"
              >
                <QrCode className="w-4 h-4" />
                <span>Generar QR de cobro</span>
              </button>
            </div>

            {/* 5.1 Tarjeta blanca con Código QR Denso y Realista (21x21) */}
            <div className="bg-white rounded-3xl p-6 shadow-xs border border-stone-200 flex flex-col items-center text-center space-y-4">
              <RealisticQRCode size={190} />

              <div>
                <div className="text-xl font-extrabold text-stone-900">
                  {qrGenerado.monto} USDp
                </div>
                <div className="text-xs font-semibold text-stone-600 mt-0.5">
                  {qrGenerado.concepto}
                </div>
                <div className="text-[11px] text-emerald-700 font-semibold mt-1">
                  Red Stellar · Liquidación instantánea
                </div>
              </div>

              {/* Botones Compartir y Copiar */}
              <div className="flex items-center gap-2 w-full pt-1">
                <button
                  type="button"
                  onClick={() => copyToClipboard(`https://reparte.stellar/pay?amt=${qrGenerado.monto}&c=${encodeURIComponent(qrGenerado.concepto)}`)}
                  className="flex-1 py-2.5 px-3 rounded-xl border border-stone-200 hover:bg-stone-50 text-xs font-semibold text-stone-700 flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedText ? 'Copiado' : 'Copiar'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const text = encodeURIComponent(`Pagar ${qrGenerado.monto} USDp para ${qrGenerado.concepto} en Colegio San Andrés via Stellar: https://reparte.stellar/pay`);
                    window.open(`https://wa.me/?text=${text}`, '_blank');
                  }}
                  className="flex-1 py-2.5 px-3 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors shadow-xs"
                >
                  <Share2 className="w-4 h-4" />
                  <span>Compartir</span>
                </button>
              </div>
            </div>

            {/* Lista: Cobros recibidos */}
            <div className="bg-white rounded-3xl p-4 shadow-xs border border-stone-200 space-y-3">
              <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                Cobros recibidos
              </h3>

              <div className="divide-y divide-stone-100">
                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">Mamá de Lucía</div>
                    <div className="text-[11px] text-stone-400">Cuota Octubre · Sobre Colegio</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700">+60 USDp</span>
                    <div className="text-[10px] text-stone-400">Hace 1h</div>
                  </div>
                </div>

                <div className="py-2.5 flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-stone-900">Carlos Mendoza</div>
                    <div className="text-[11px] text-stone-400">Cuota Octubre · Sobre Colegio</div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-emerald-700">+60 USDp</span>
                    <div className="text-[10px] text-stone-400">Ayer</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 2. BARRA DE NAVEGACIÓN INFERIOR BLANCA SÓLIDA ---------------- */}
        <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-stone-200 shadow-lg py-2 px-6">
          <div className="max-w-md mx-auto flex items-center justify-around">
            {/* Pestaña: Enviar */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('enviar');
                setShowComprobante(false);
              }}
              className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
                activeTab === 'enviar'
                  ? 'text-[#0D5C46] font-semibold scale-105'
                  : 'text-stone-500 font-medium hover:text-stone-800'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${activeTab === 'enviar' ? 'bg-[#EAF5F1]' : ''}`}>
                <Send className="w-5 h-5" />
              </div>
              <span className="text-xs">Enviar</span>
            </button>

            {/* Pestaña: Billetera (Default) */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('billetera');
                setShowComprobante(false);
              }}
              className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
                activeTab === 'billetera'
                  ? 'text-[#0D5C46] font-semibold scale-105'
                  : 'text-stone-500 font-medium hover:text-stone-800'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${activeTab === 'billetera' ? 'bg-[#EAF5F1]' : ''}`}>
                <Wallet className="w-5 h-5 text-current" />
              </div>
              <span className="text-xs">Billetera</span>
            </button>

            {/* Pestaña: Cobrar */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('cobrar');
                setShowComprobante(false);
              }}
              className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
                activeTab === 'cobrar'
                  ? 'text-[#0D5C46] font-semibold scale-105'
                  : 'text-stone-500 font-medium hover:text-stone-800'
              }`}
            >
              <div className={`p-1.5 rounded-xl ${activeTab === 'cobrar' ? 'bg-[#EAF5F1]' : ''}`}>
                <QrCode className="w-5 h-5" />
              </div>
              <span className="text-xs">Cobrar</span>
            </button>
          </div>
        </nav>

        {/* ---------------- 5.2 MODAL INTERACTIVO DE PAGO CON DESCUENTO EN VIVO ---------------- */}
        {paymentModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-stone-600 flex items-center gap-1.5">
                  <QrCode className="w-4 h-4 text-emerald-700" />
                  QR Detectado · Pago Directo
                </span>
                <button
                  type="button"
                  onClick={() => setPaymentModalOpen(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Detalle del Comercio y Monto */}
              <div className="text-center py-2 space-y-1">
                <div className="w-12 h-12 bg-[#FDF1E8] text-[#9A4B1A] rounded-2xl flex items-center justify-center mx-auto mb-2 border border-[#F9D9C3]">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="text-xs font-bold text-stone-500">Comercio destino</div>
                <h3 className="text-lg font-bold text-stone-900">Colegio San Andrés</h3>
                <div className="text-3xl font-extrabold text-stone-900 mt-1">
                  60.00 <span className="text-lg font-bold text-emerald-700">USDp</span>
                </div>
                <div className="text-xs text-stone-400">≈ 417.00 Bs referencial</div>
              </div>

              {/* Origen de los fondos (Sobre Protegido) */}
              <div className="bg-[#FDF1E8] border border-[#F9D9C3] rounded-2xl p-4 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#9A4B1A]">Origen: Sobre Colegio (Protegido)</span>
                  <span className="font-semibold text-stone-700">Saldo: {balanceColegio}.00 USDp</span>
                </div>
                <p className="text-[11px] text-[#A85B29]">
                  Concepto: Matrícula marzo · Alumno: Mateo
                </p>
                <div className="text-[10px] text-emerald-800 font-semibold pt-1">
                  ✅ Autorizado exclusivamente para gastos educativos
                </div>
              </div>

              {/* Botón de confirmación con descuento en vivo */}
              <button
                type="button"
                onClick={handleConfirmPayment}
                className="w-full py-4 px-4 rounded-2xl bg-[#0D5C46] hover:bg-[#094635] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Confirmar y pagar 60.00 USDp</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentModalOpen(false)}
                className="w-full py-2.5 text-xs font-semibold text-stone-500 hover:text-stone-800"
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        {/* ---------------- MODAL ÉXITO DE PAGO ---------------- */}
        {paymentSuccessModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl text-center">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 stroke-[3]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-stone-900">¡Pago realizado con éxito!</h3>
                <p className="text-xs text-stone-500">
                  Se debitaron 60.00 USDp del Sobre Colegio hacia Colegio San Andrés.
                </p>
              </div>

              <div className="p-3 bg-stone-50 rounded-2xl text-xs space-y-1 border border-stone-200">
                <div className="flex justify-between text-stone-500">
                  <span>Nuevo saldo Sobre Colegio:</span>
                  <span className="font-bold text-stone-900">{balanceColegio}.00 USDp</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Saldo total en billetera:</span>
                  <span className="font-bold text-emerald-700">{totalBalance}.00 USDp</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setPaymentSuccessModal(false)}
                className="w-full py-3.5 bg-black text-white font-bold text-xs rounded-2xl"
              >
                Volver a la Billetera
              </button>
            </div>
          </div>
        )}

        {/* ---------------- MODAL: COMPROBANTE DE ENVÍO (STELLAR ATOMIC) ---------------- */}
        {showComprobante && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-4 max-h-[92vh] overflow-y-auto shadow-2xl">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-semibold text-emerald-800 flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Completado en Stellar
                </span>
                <button
                  type="button"
                  onClick={() => setShowComprobante(false)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Titular */}
              <div className="text-center py-2 space-y-1">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div className="text-xs font-black tracking-wider text-emerald-700 uppercase">
                  ¡Dinero Recibido!
                </div>
                <h2 className="text-2xl font-extrabold text-stone-900">
                  Envío realizado {montoEnviar}.00 USDp
                </h2>
                <p className="text-xs text-stone-500">
                  Destino: Mamá en La Paz, BO
                </p>
              </div>

              {/* Distribución en los 3 sobres */}
              <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 space-y-2.5">
                <div className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                  Distribución en 3 sobres:
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-stone-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C46]"></span>
                    Casa ({pctCasa}%)
                  </span>
                  <span className="font-bold text-[#0D5C46]">{usdCasaCalculado} USDp</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-stone-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#9A4B1A]"></span>
                    Colegio San Calixto ({pctColegio}%)
                  </span>
                  <span className="font-bold text-[#9A4B1A]">{usdColegioCalculado} USDp</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="flex items-center gap-2 font-medium text-stone-800">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
                    Salud ({pctSalud}%)
                  </span>
                  <span className="font-bold text-[#1D4ED8]">{usdSaludCalculado} USDp</span>
                </div>

                <div className="pt-2 border-t border-stone-200 text-xs text-stone-500">
                  Mensaje: <span className="font-semibold text-stone-800">"{mensajeEnviar}"</span>
                </div>
              </div>

              {/* ID de transacción inmutable */}
              <div className="p-3 bg-stone-100 rounded-xl space-y-1">
                <div className="flex items-center justify-between text-[11px] text-stone-500">
                  <span>ID Transacción Inmutable:</span>
                  <button
                    type="button"
                    onClick={() => copyToClipboard(txHash)}
                    className="text-[#0D5C46] font-bold flex items-center gap-1 hover:underline"
                  >
                    {copiedText ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedText ? 'Copiado' : 'Copiar'}</span>
                  </button>
                </div>
                <div className="font-mono text-xs text-stone-800 truncate select-all">
                  {txHash}
                </div>
              </div>

              {/* Botón Verde: Compartir constancia por WhatsApp */}
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="w-full py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <Share2 className="w-4 h-4" />
                <span>Compartir constancia por WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowComprobante(false);
                  setActiveTab('billetera');
                }}
                className="w-full py-3 text-xs font-semibold text-stone-500 hover:text-stone-800"
              >
                Ir a mi Billetera
              </button>
            </div>
          </div>
        )}

        {/* ---------------- MODAL ACCIÓN GENERAL ---------------- */}
        {activeActionModal && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-bold text-stone-900">{activeActionModal}</h3>
                <button
                  type="button"
                  onClick={() => setActiveActionModal(null)}
                  className="p-1 rounded-full text-stone-400 hover:text-stone-700 bg-stone-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-stone-500">
                Esta acción se registra en la red Stellar con comprobante atómico para la familia.
              </p>
              <button
                type="button"
                onClick={() => {
                  alert('Operación procesada en Stellar Testnet.');
                  setActiveActionModal(null);
                }}
                className="w-full py-3.5 bg-stone-900 hover:bg-black text-white font-bold rounded-2xl text-xs"
              >
                Confirmar operación
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;
