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
  AlertCircle,
  ExternalLink,
  Smartphone,
  Laptop,
  Coins
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

function RealisticQRCode({ size = 200 }) {
  const cellSize = 100 / 21;
  return (
    <div className="relative inline-flex items-center justify-center p-4 bg-white rounded-3xl shadow-sm border border-stone-200">
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

  // Saldos interactivos
  const [balanceCasa, setBalanceCasa] = useState(120);
  const [balanceColegio, setBalanceColegio] = useState(60);
  const [balanceSalud, setBalanceSalud] = useState(20);
  const [colegioPagado, setColegioPagado] = useState(false);

  // Estados de Enviar
  const [montoEnviar, setMontoEnviar] = useState(200);
  const [pctCasa, setPctCasa] = useState(60);
  const [pctColegio, setPctColegio] = useState(30);
  const [pctSalud, setPctSalud] = useState(10);
  const [mensajeEnviar, setMensajeEnviar] = useState('Matrícula marzo');
  const [showComprobante, setShowComprobante] = useState(false);
  const [txHash] = useState('0x3a7e91...8c4f2d_stellar_atomic');

  // Estados de Cobrar
  const [montoCobro, setMontoCobro] = useState(60);
  const [conceptoCobro, setConceptoCobro] = useState('Matrícula marzo');
  const [qrGenerado, setQrGenerado] = useState({
    monto: 60,
    concepto: 'Matrícula marzo',
  });

  // Modales
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentSuccessModal, setPaymentSuccessModal] = useState(false);
  const [activeActionModal, setActiveActionModal] = useState(null);

  // Cálculos reactivos
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
    <div className="min-h-screen bg-[#F8F9FA] text-slate-800 flex flex-col w-full selection:bg-emerald-500/20">
      
      {/* =========================================================================
          HEADER PRINCIPAL (FULL-WIDTH EN DESKTOP, STICKY Y ADAPTABLE)
         ========================================================================= */}
      <header className="w-full bg-white/95 backdrop-blur-md border-b border-stone-200 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          
          {/* Marca / Identidad */}
          <div className="flex items-center gap-3">
            <div className="bg-[#0D5C46] text-white font-black rounded-2xl w-10 h-10 flex items-center justify-center text-xl shadow-xs tracking-tighter shrink-0">
              R
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-stone-900 tracking-tight text-lg sm:text-xl">Reparte</span>
                <span className="hidden sm:inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 uppercase tracking-wider">
                  Stellar Ideathon
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Red Stellar Activa</span>
                <span className="hidden md:inline text-stone-300">•</span>
                <span className="hidden md:inline text-stone-400">Testnet USDp</span>
              </div>
            </div>
          </div>

          {/* Navegación Desktop (Pestañas estilo Segmented Control) */}
          <nav className="hidden md:flex items-center gap-1.5 bg-stone-100 p-1.5 rounded-2xl border border-stone-200">
            <button
              type="button"
              onClick={() => {
                setActiveTab('billetera');
                setShowComprobante(false);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'billetera'
                  ? 'bg-white text-[#0D5C46] shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Wallet className="w-4 h-4" />
              <span>Billetera</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('enviar');
                setShowComprobante(false);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'enviar'
                  ? 'bg-white text-[#0D5C46] shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Enviar Remesa</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTab('cobrar');
                setShowComprobante(false);
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === 'cobrar'
                  ? 'bg-white text-[#0D5C46] shadow-sm'
                  : 'text-stone-500 hover:text-stone-900'
              }`}
            >
              <QrCode className="w-4 h-4" />
              <span>Cobrar Comercio</span>
            </button>
          </nav>

          {/* Perfil Usuario y Red */}
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-bold text-stone-900">Mamá en La Paz</div>
              <div className="text-[11px] text-stone-400 font-medium">Cuenta familiar vinculada</div>
            </div>
            <div className="w-10 h-10 rounded-2xl bg-[#0D5C46]/10 text-[#0D5C46] flex items-center justify-center border border-[#0D5C46]/20 font-bold shrink-0 shadow-xs">
              <User className="w-5 h-5 text-[#0D5C46]" />
            </div>
          </div>

        </div>
      </header>

      {/* =========================================================================
          CONTENEDOR PRINCIPAL FLUIDO Y MULTI-COLUMNA (CSS GRID ARCHITECTURE)
         ========================================================================= */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 md:py-8 pb-28 md:pb-12">
        
        {/* =====================================================================
            VISTA 1: BILLETERA (GRID DE 12 COLUMNAS + 3 COLUMNAS DE SOBRES)
           ===================================================================== */}
        {activeTab === 'billetera' && (
          <div className="space-y-6 lg:space-y-8 animate-fadeIn">
            
            {/* Fila 1: Bienvenida y Contexto Geográfico */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
                    Hola, Mamá 👋
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-stone-200/80 text-stone-700">
                    La Paz, Bolivia
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
                  Tus remesas llegan separadas automáticamente en Stellar Testnet.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  3 Sobres Activos
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-100 text-xs font-medium text-stone-600 border border-stone-200">
                  <ShieldCheck className="w-3.5 h-3.5 text-stone-500" />
                  Stellar Vault
                </span>
              </div>
            </div>

            {/* Fila 2 (Grid 12 Columnas en Desktop): Saldo Total Hero + Tarjeta Red Stellar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
              
              {/* Tarjeta de Saldo Principal (8 cols en desktop) */}
              <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs flex flex-col justify-between space-y-6">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      Saldo Total Repartido
                    </span>
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      Disponible
                    </span>
                  </div>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-stone-900 tracking-tight mt-1">
                    {totalBalance.toFixed(2)} <span className="text-2xl sm:text-3xl font-extrabold text-[#0D5C46]">USDp</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-400 mt-1">
                    ≈ {totalBsRef} Bs referencial (Tasa oficial Stellar)
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentModalOpen(true)}
                    className="flex-1 flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-black hover:bg-stone-900 text-white font-bold text-sm transition-transform active:scale-[0.98] shadow-md shadow-stone-900/10"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Escanear QR para pagar</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveActionModal('Detalle de Cuentas Stellar')}
                    className="flex items-center justify-center gap-2 py-4 px-6 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-sm border border-stone-200 transition-colors"
                  >
                    <Coins className="w-4 h-4 text-emerald-700" />
                    <span>Ver Trustlines</span>
                  </button>
                </div>
              </div>

              {/* Tarjeta de Estado Stellar On-Chain (4 cols en desktop) */}
              <div className="lg:col-span-4 bg-gradient-to-br from-[#0D5C46] to-[#083b2d] text-white rounded-3xl p-6 sm:p-7 shadow-xs flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase font-bold tracking-wider text-emerald-200">
                      Red Stellar Atómica
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                  <h3 className="text-xl font-bold leading-snug">
                    Tus metas no se mezclan con el día a día.
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed">
                    La remesa viaja en una sola transacción pero se deposita automáticamente en 3 cuentas independientes.
                  </p>
                </div>

                <div className="p-3 bg-black/20 backdrop-blur-xs rounded-2xl border border-white/10 text-xs space-y-1">
                  <div className="flex justify-between text-emerald-200">
                    <span>Comisión fija:</span>
                    <span className="font-bold text-white">1% (vs 7% WU)</span>
                  </div>
                  <div className="flex justify-between text-emerald-200">
                    <span>Tiempo de liquidación:</span>
                    <span className="font-bold text-white">&lt; 5 segundos</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Fila 3: Sección Tus Sobres Familiares (GRID DE 3 COLUMNAS EN DESKTOP) */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                <div>
                  <h2 className="text-lg sm:text-xl font-bold text-stone-900 tracking-tight">
                    Tus Sobres Familiares
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-500">
                    Fondos particionados criptográficamente para proteger la educación y salud familiar.
                  </p>
                </div>
                <span className="text-xs font-bold text-[#0D5C46] bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full self-start sm:self-auto">
                  100% Asignado
                </span>
              </div>

              {/* Grid Responsivo de 3 Columnas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                
                {/* 1. SOBRE CASA */}
                <div className="bg-[#EAF5F1] border border-[#CBE7DC] rounded-3xl p-5 space-y-4 shadow-xs flex flex-col justify-between hover:border-[#0D5C46]/40 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#0D5C46] text-white flex items-center justify-center shadow-xs">
                          <Home className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-base font-bold text-[#0D5C46]">Casa</div>
                          <div className="text-xs text-[#22725A] font-medium">Luz y mercado</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D3ECE1] text-[#0D5C46]">
                        Al día
                      </span>
                    </div>

                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                        {balanceCasa.toFixed(2)} <span className="text-sm font-bold text-stone-500">USDp</span>
                      </div>
                      <div className="text-xs text-[#288368] font-semibold mt-0.5">
                        ≈ {(balanceCasa * 6.95).toFixed(2)} Bs ref.
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-2.5 flex items-center justify-between border border-stone-100 shadow-xs mt-3">
                    <span className="text-xs font-bold text-[#22725A] pl-1">Luz y mercado</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveActionModal('Mover saldo de Casa')}
                        className="bg-white border border-stone-200 text-stone-800 rounded-lg px-3.5 py-1.5 font-bold text-xs hover:bg-stone-50 shadow-xs transition-colors"
                      >
                        Mover
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveActionModal('Pagar servicios de Casa')}
                        className="bg-[#0D5C46] hover:bg-[#094635] rounded-lg px-4 py-1.5 font-bold text-white text-xs shadow-sm flex items-center gap-1 transition-colors"
                      >
                        <span>Pagar</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 2. SOBRE COLEGIO */}
                <div className="bg-[#FDF1E8] border border-[#F9D9C3] rounded-3xl p-5 space-y-4 shadow-xs flex flex-col justify-between hover:border-[#9A4B1A]/40 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#9A4B1A] text-white flex items-center justify-center shadow-xs">
                          <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-base font-bold text-[#9A4B1A]">Colegio</div>
                          <div className="text-xs text-[#A85B29] font-medium">San Calixto · Mateo</div>
                        </div>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                        colegioPagado ? 'bg-emerald-100 text-emerald-800' : 'bg-[#FAE2D1] text-[#9A4B1A]'
                      }`}>
                        {colegioPagado ? <Check className="w-3 h-3 stroke-[3]" /> : <Lock className="w-3 h-3" />}
                        {colegioPagado ? 'Pagado' : '🔒 Protegido'}
                      </span>
                    </div>

                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                        {balanceColegio.toFixed(2)} <span className="text-sm font-bold text-stone-500">USDp</span>
                      </div>
                      <div className="text-xs text-[#A85B29] font-semibold mt-0.5">
                        ≈ {(balanceColegio * 6.95).toFixed(2)} Bs ref.
                      </div>
                    </div>

                    <div className="px-3 py-1.5 rounded-xl bg-[#FCE8D8] border border-[#F9D5BE] text-xs font-bold text-[#9A4B1A] flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 shrink-0" />
                      <span>🔒 Solo para pagar al colegio</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-2.5 flex items-center justify-between border border-stone-100 shadow-xs mt-3">
                    <span className="text-xs font-bold text-[#A85B29] pl-1">Cuota Octubre</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveActionModal('Mover saldo de Colegio')}
                        className="bg-white border border-stone-200 text-stone-800 rounded-lg px-3.5 py-1.5 font-bold text-xs hover:bg-stone-50 shadow-xs transition-colors"
                      >
                        Mover
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentModalOpen(true)}
                        className="bg-[#9A4B1A] hover:bg-[#7e3d14] rounded-lg px-4 py-1.5 font-bold text-white text-xs shadow-sm flex items-center gap-1.5 transition-colors"
                      >
                        <QrCode className="w-3.5 h-3.5" />
                        <span>QR Pagar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. SOBRE SALUD */}
                <div className="bg-[#EBF2FE] border border-[#C8DCFD] rounded-3xl p-5 space-y-4 shadow-xs flex flex-col justify-between hover:border-[#1D4ED8]/40 transition-colors">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-[#1D4ED8] text-white flex items-center justify-center shadow-xs">
                          <HeartPulse className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-base font-bold text-[#1D4ED8]">Salud</div>
                          <div className="text-xs text-[#2563EB] font-medium">Farmacia y citas</div>
                        </div>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-[#D9E7FD] text-[#1D4ED8]">
                        Seguro
                      </span>
                    </div>

                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                        {balanceSalud.toFixed(2)} <span className="text-sm font-bold text-stone-500">USDp</span>
                      </div>
                      <div className="text-xs text-[#2563EB] font-semibold mt-0.5">
                        ≈ {(balanceSalud * 6.95).toFixed(2)} Bs ref.
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl p-2.5 flex items-center justify-between border border-stone-100 shadow-xs mt-3">
                    <span className="text-xs font-bold text-[#1D4ED8] pl-1">Fondo imprevistos</span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveActionModal('Mover saldo de Salud')}
                        className="bg-white border border-stone-200 text-stone-800 rounded-lg px-3.5 py-1.5 font-bold text-xs hover:bg-stone-50 shadow-xs transition-colors"
                      >
                        Mover
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveActionModal('Pagar farmacia o consulta')}
                        className="bg-[#1D4ED8] hover:bg-[#1e40af] rounded-lg px-4 py-1.5 font-bold text-white text-xs shadow-sm flex items-center gap-1 transition-colors"
                      >
                        <span>Pagar</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* Fila 4: Historial de Envíos y Auditoría Stellar (GRID DE 12 COLS EN DESKTOP) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2 items-stretch">
              
              {/* Envíos Recibidos (7 cols en desktop) */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-xs border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Últimos envíos recibidos
                  </h3>
                  <span className="text-xs text-[#0D5C46] font-bold">Stellar On-Chain</span>
                </div>

                <div className="divide-y divide-stone-100">
                  <div className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                        🇪🇸
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900">María, Madrid</div>
                        <div className="text-xs text-stone-500 font-medium">Repartido en 3 sobres · Hoy</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-700">+200.00 USDp</div>
                      <div className="text-[11px] text-stone-400 font-medium">Ledger Confirmado</div>
                    </div>
                  </div>

                  <div className="py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold text-sm">
                        🇪🇸
                      </div>
                      <div>
                        <div className="text-sm font-bold text-stone-900">María, Madrid</div>
                        <div className="text-xs text-stone-500 font-medium">Repartido en 3 sobres · 15 Sep</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-emerald-700">+200.00 USDp</div>
                      <div className="text-[11px] text-stone-400 font-medium">Ledger Confirmado</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Comparativa y Métricas de Ahorro Familiar (5 cols en desktop) */}
              <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-xs border border-stone-200 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#0D5C46]">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Transparencia de Costos</span>
                  </div>
                  <h4 className="text-base font-bold text-stone-900">Ahorro familiar en cada envío</h4>
                  <p className="text-xs text-stone-500 leading-relaxed">
                    Las remesadoras tradicionales cobran entre el 6% y el 8% y entregan un único giro. Con Reparte, la familia ahorra ~$12.00 USD por cada $200 enviados gracias a las tarifas ultra-bajas de Stellar.
                  </p>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-2xl border border-stone-200 text-xs space-y-1.5">
                  <div className="flex justify-between text-stone-600">
                    <span>Costo tradicional (7%):</span>
                    <span className="line-through text-stone-400 font-medium">$14.00 USD</span>
                  </div>
                  <div className="flex justify-between text-stone-900 font-bold">
                    <span>Costo Reparte (1%):</span>
                    <span className="text-emerald-700">$2.00 USDp</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* =====================================================================
            VISTA 2: ENVIAR (LAYOUT GRID DE 2 COLUMNAS FORM + CHECKOUT STICKY)
           ===================================================================== */}
        {activeTab === 'enviar' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header Enviar */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-200/80 pb-4">
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Desde Madrid 🇪🇸
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 mt-1 tracking-tight">
                  Nuevo Envío Repartido
                </h1>
                <p className="text-xs sm:text-sm text-stone-500">
                  Configura cuánto va al gasto diario y cuánto a las metas protegidas de la familia.
                </p>
              </div>

              <div className="flex items-center gap-2 self-start sm:self-center bg-stone-100 px-3.5 py-2 rounded-2xl text-xs font-bold text-stone-700 border border-stone-200">
                <span>🇪🇸 Madrid</span>
                <ArrowRight className="w-3.5 h-3.5 text-stone-400" />
                <span>🇧🇴 La Paz</span>
              </div>
            </div>

            {/* Grid 12 Columnas en Desktop: Formulario (7) + Checkout Sticky (5) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Columna Izquierda: Configuración del Split (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                {/* A quién */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">A quién</label>
                  <div className="bg-white rounded-3xl p-5 border border-stone-200 shadow-xs flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-full bg-emerald-100 text-[#0D5C46] font-black text-lg flex items-center justify-center border border-emerald-200 shadow-xs">
                        M
                      </div>
                      <div>
                        <div className="text-base font-bold text-stone-900">Mamá · La Paz</div>
                        <div className="text-xs text-stone-500 font-medium">Cuenta familiar vinculada en Bolivia</div>
                      </div>
                    </div>
                    <button 
                      type="button" 
                      className="text-xs font-bold text-stone-700 border border-stone-200 px-4 py-2 rounded-xl bg-stone-50 hover:bg-stone-100 transition-colors shadow-xs"
                    >
                      Cambiar
                    </button>
                  </div>
                </div>

                {/* Monto Total Centrado en Grande (Interactivo) */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-xs text-center space-y-2">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider block">Monto total a enviar</span>
                  <div className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight">
                    {montoEnviar} <span className="text-2xl font-bold text-[#0D5C46]">USDp</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-stone-400">
                    ≈ {bsMontoTotal} Bs ref. (Tasa de cambio Stellar)
                  </div>
                  
                  {/* Slider de ajuste de monto */}
                  <div className="pt-3 max-w-md mx-auto">
                    <input 
                      type="range"
                      min="50"
                      max="1000"
                      step="10"
                      value={montoEnviar}
                      onChange={(e) => setMontoEnviar(Number(e.target.value))}
                      className="w-full accent-[#0D5C46]"
                    />
                    <div className="flex justify-between text-[11px] text-stone-400 mt-1.5 font-medium">
                      <span>Mínimo 50 USDp</span>
                      <span>Desliza para ajustar en tiempo real</span>
                      <span>Máximo 1000 USDp</span>
                    </div>
                  </div>
                </div>

                {/* Sobres con barras y Sliders Interactivos */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-stone-200 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-base font-bold text-stone-900">Distribución en Sobres</h3>
                      <p className="text-xs text-stone-400">Ajusta los porcentajes según las necesidades familiares.</p>
                    </div>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      pctCasa + pctColegio + pctSalud === 100
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      Suma {pctCasa + pctColegio + pctSalud}%
                    </span>
                  </div>

                  <div className="h-4 w-full bg-stone-100 rounded-full overflow-hidden flex shadow-inner">
                    <div style={{ width: `${pctCasa}%` }} className="bg-[#0D5C46] h-full transition-all duration-200" title="Casa" />
                    <div style={{ width: `${pctColegio}%` }} className="bg-[#9A4B1A] h-full transition-all duration-200" title="Colegio" />
                    <div style={{ width: `${pctSalud}%` }} className="bg-[#1D4ED8] h-full transition-all duration-200" title="Salud" />
                  </div>

                  <div className="space-y-3.5 pt-1">
                    {/* Casa */}
                    <div className="space-y-1.5 p-4 rounded-2xl bg-[#EAF5F1]/70 border border-[#CBE7DC]/80">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-bold text-[#0D5C46] flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#0D5C46]"></span>
                          Casa ({pctCasa}%)
                        </span>
                        <div className="text-right">
                          <span className="font-black text-stone-900">{usdCasaCalculado} USDp</span>
                          <span className="text-xs text-stone-500 font-medium block">≈ {(usdCasaCalculado * 6.95).toFixed(2)} Bs</span>
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
                    <div className="space-y-1.5 p-4 rounded-2xl bg-[#FDF1E8]/70 border border-[#F9D9C3]/80">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-bold text-[#9A4B1A] flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#9A4B1A]"></span>
                          Colegio ({pctColegio}%)
                        </span>
                        <div className="text-right">
                          <span className="font-black text-stone-900">{usdColegioCalculado} USDp</span>
                          <span className="text-xs text-stone-500 font-medium block">≈ {(usdColegioCalculado * 6.95).toFixed(2)} Bs</span>
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
                    <div className="space-y-1.5 p-4 rounded-2xl bg-[#EBF2FE]/70 border border-[#C8DCFD]/80">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-bold text-[#1D4ED8] flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#1D4ED8]"></span>
                          Salud ({pctSalud}%)
                        </span>
                        <div className="text-right">
                          <span className="font-black text-stone-900">{usdSaludCalculado} USDp</span>
                          <span className="text-xs text-stone-500 font-medium block">≈ {(usdSaludCalculado * 6.95).toFixed(2)} Bs</span>
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

              </div>

              {/* Columna Derecha: Checkout Sticky (5 cols) */}
              <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24">
                
                {/* Input Mensaje */}
                <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xs border border-stone-200 space-y-2">
                  <label className="text-xs font-bold text-stone-600 block">Mensaje o concepto familiar</label>
                  <input
                    type="text"
                    value={mensajeEnviar}
                    onChange={(e) => setMensajeEnviar(e.target.value)}
                    placeholder="Ej. Matrícula marzo"
                    className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-semibold text-stone-900 focus:outline-none focus:border-stone-800"
                  />
                  <p className="text-[11px] text-stone-400 font-medium">Quedará grabado en el memo de la red Stellar.</p>
                </div>

                {/* Resumen Débito */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-stone-200 space-y-3.5">
                  <div className="font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center justify-between text-sm sm:text-base">
                    <span>Resumen de liquidación</span>
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                      Atómica
                    </span>
                  </div>

                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between text-stone-500">
                      <span>Subtotal remesa</span>
                      <span className="font-bold text-stone-800">{montoEnviar} USDp</span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Comisión Reparte (1%)</span>
                      <span className="font-bold text-stone-800">{comisionRed} USDp</span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Ahorro estimado en comisiones</span>
                      <span className="font-bold text-emerald-700">~${(montoEnviar * 0.06).toFixed(2)} USD</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-100 text-base sm:text-lg font-black text-stone-900">
                      <span>Total a debitar</span>
                      <span className="text-[#0D5C46]">{totalDebitar} USDp</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowComprobante(true)}
                    className="w-full flex items-center justify-center gap-2 py-4 px-4 rounded-2xl bg-black hover:bg-stone-900 text-white font-bold text-sm sm:text-base shadow-md transition-transform active:scale-[0.98] mt-2"
                  >
                    <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Enviar repartido en Stellar 🚀</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* =====================================================================
            VISTA 3: COBRAR (LAYOUT GRID DE 2 COLUMNAS COMERCIO + QR GRANDE)
           ===================================================================== */}
        {activeTab === 'cobrar' && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Header de Comercio */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-stone-200/80 pb-4">
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <BadgeCheck className="w-4 h-4 text-emerald-600" />
                  Comercio Verificado · La Paz, Bolivia
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mt-0.5">
                  Colegio San Andrés
                </h1>
                <p className="text-xs sm:text-sm text-stone-500">
                  Punto de cobro directo mediante Stellar QR sin intermediación bancaria.
                </p>
              </div>

              <div className="px-3.5 py-2 rounded-2xl bg-stone-100 border border-stone-200 text-xs font-bold text-stone-700 self-start sm:self-center">
                Terminal Punto de Cobro
              </div>
            </div>

            {/* Grid 12 Columnas en Desktop: Formulario & Métricas (6) + QR Fotorrealista (6) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              
              {/* Columna Izquierda: Formulario y Métricas (6 cols) */}
              <div className="lg:col-span-6 space-y-5">
                
                {/* Total Cobrado */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-stone-200 space-y-1">
                  <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">Total cobrado este mes</span>
                  <div className="text-4xl sm:text-5xl font-black text-stone-900 tracking-tight mt-0.5">
                    540 <span className="text-2xl font-bold text-[#0D5C46]">USDp</span>
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-stone-400 mt-1">
                    9 cuotas escolares procesadas directamente desde el Sobre Colegio
                  </div>
                </div>

                {/* Formulario Nuevo Cobro */}
                <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xs border border-stone-200 space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-stone-900">Generar nuevo cobro</h3>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Monto del cobro</label>
                    <div className="relative flex items-center">
                      <input
                        type="number"
                        value={montoCobro}
                        onChange={(e) => setMontoCobro(e.target.value)}
                        className="w-full pl-4 pr-16 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-base font-bold text-stone-900 focus:outline-none focus:border-stone-800"
                      />
                      <span className="absolute right-4 text-xs font-bold text-stone-400">USDp</span>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-500 uppercase tracking-wider">Concepto o Cuota</label>
                    <input
                      type="text"
                      value={conceptoCobro}
                      onChange={(e) => setConceptoCobro(e.target.value)}
                      className="w-full px-4 py-3.5 bg-stone-50 border border-stone-200 rounded-2xl text-sm font-semibold text-stone-900 focus:outline-none focus:border-stone-800"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => setQrGenerado({ monto: montoCobro, concepto: conceptoCobro })}
                    className="w-full py-4 px-4 rounded-2xl bg-[#0D5C46] hover:bg-[#094736] text-white font-bold text-sm shadow-xs flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Actualizar QR de cobro</span>
                  </button>
                </div>

                {/* Cobros Recientes */}
                <div className="bg-white rounded-3xl p-6 shadow-xs border border-stone-200 space-y-3">
                  <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Cobros recientes recibidos
                  </h3>

                  <div className="divide-y divide-stone-100">
                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-stone-900">Mamá de Lucía</div>
                        <div className="text-xs text-stone-400 font-medium">Cuota Octubre · Sobre Colegio</div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-emerald-700">+60 USDp</span>
                        <div className="text-[11px] text-stone-400 font-medium">Hace 1h</div>
                      </div>
                    </div>

                    <div className="py-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-bold text-stone-900">Carlos Mendoza</div>
                        <div className="text-xs text-stone-400 font-medium">Cuota Octubre · Sobre Colegio</div>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-bold text-emerald-700">+60 USDp</span>
                        <div className="text-[11px] text-stone-400 font-medium">Ayer</div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Columna Derecha: Tarjeta QR Fotorrealista (6 cols) */}
              <div className="lg:col-span-6 lg:sticky lg:top-24 space-y-4">
                <div className="bg-white rounded-3xl p-8 shadow-xs border border-stone-200 flex flex-col items-center text-center space-y-6">
                  <RealisticQRCode size={230} />

                  <div>
                    <div className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
                      {qrGenerado.monto} <span className="text-xl font-bold text-[#0D5C46]">USDp</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-stone-700 mt-1">
                      {qrGenerado.concepto}
                    </div>
                    <div className="text-xs font-bold text-emerald-700 mt-1">
                      Red Stellar · Liquidación directa e instantánea
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full pt-1">
                    <button
                      type="button"
                      onClick={() => copyToClipboard(`https://reparte.stellar/pay?amt=${qrGenerado.monto}&c=${encodeURIComponent(qrGenerado.concepto)}`)}
                      className="flex-1 py-3.5 px-4 rounded-2xl border border-stone-200 hover:bg-stone-50 text-xs sm:text-sm font-bold text-stone-700 flex items-center justify-center gap-2 transition-colors"
                    >
                      {copiedText ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedText ? 'Copiado' : 'Copiar enlace'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        const text = encodeURIComponent(`Pagar ${qrGenerado.monto} USDp para ${qrGenerado.concepto} en Colegio San Andrés via Stellar: https://reparte.stellar/pay`);
                        window.open(`https://wa.me/?text=${text}`, '_blank');
                      }}
                      className="flex-1 py-3.5 px-4 rounded-2xl bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-xs"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Compartir QR</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

      </main>

      {/* =========================================================================
          BARRA DE NAVEGACIÓN INFERIOR (SÓLO MOBILE < 768px - OCULTA EN COMPUTADOR)
         ========================================================================= */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-stone-200 shadow-lg py-2 px-6">
        <div className="max-w-md mx-auto flex items-center justify-around">
          <button
            type="button"
            onClick={() => {
              setActiveTab('enviar');
              setShowComprobante(false);
            }}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
              activeTab === 'enviar'
                ? 'text-[#0D5C46] font-bold scale-105'
                : 'text-stone-500 font-medium hover:text-stone-800'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeTab === 'enviar' ? 'bg-[#EAF5F1]' : ''}`}>
              <Send className="w-5 h-5" />
            </div>
            <span className="text-xs">Enviar</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('billetera');
              setShowComprobante(false);
            }}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
              activeTab === 'billetera'
                ? 'text-[#0D5C46] font-bold scale-105'
                : 'text-stone-500 font-medium hover:text-stone-800'
            }`}
          >
            <div className={`p-1.5 rounded-xl ${activeTab === 'billetera' ? 'bg-[#EAF5F1]' : ''}`}>
              <Wallet className="w-5 h-5 text-current" />
            </div>
            <span className="text-xs">Billetera</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('cobrar');
              setShowComprobante(false);
            }}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-2xl ${
              activeTab === 'cobrar'
                ? 'text-[#0D5C46] font-bold scale-105'
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

      {/* =========================================================================
          MODALES INTERACTIVOS (RESPONSIVOS Y ACCESIBLES)
         ========================================================================= */}
      {/* Modal de Pago con descuento en vivo */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 space-y-4 shadow-2xl">
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

      {/* Modal Éxito de Pago */}
      {paymentSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 space-y-4 shadow-2xl text-center">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 stroke-[3]" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl font-bold text-stone-900">¡Pago realizado con éxito!</h3>
              <p className="text-xs text-stone-500">
                Se debitaron 60.00 USDp del Sobre Colegio hacia Colegio San Andrés.
              </p>
            </div>

            <div className="p-3.5 bg-stone-50 rounded-2xl text-xs space-y-1.5 border border-stone-200">
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

      {/* Modal Comprobante de Envío */}
      {showComprobante && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-7 space-y-4 max-h-[92vh] overflow-y-auto shadow-2xl">
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

      {/* Modal Acción General */}
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
  );
}

export default App;
