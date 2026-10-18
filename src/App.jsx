import React, { useState } from 'react';
import { CONFIG } from './config.js';
import { Madrid } from './components/Madrid.jsx';
import { Enviar } from './components/Enviar.jsx';
import { LaPaz } from './components/LaPaz.jsx';

export function App() {
  const [step, setStep] = useState(1);
  const [monto, setMonto] = useState(CONFIG.defaults.monto);
  const [porcentajeCuota, setPorcentajeCuota] = useState(CONFIG.defaults.porcentajeCuota);
  const [destinatario, setDestinatario] = useState(CONFIG.defaults.destinatario);
  const [txResult, setTxResult] = useState(null);

  return (
    <div className="container">
      {step === 1 && (
        <Madrid 
          monto={monto} 
          setMonto={setMonto} 
          porcentajeCuota={porcentajeCuota} 
          setPorcentajeCuota={setPorcentajeCuota} 
          destinatario={destinatario} 
          setDestinatario={setDestinatario} 
          onNext={() => setStep(2)} 
        />
      )}
      {step === 2 && (
        <Enviar 
          monto={monto} 
          porcentajeCuota={porcentajeCuota} 
          destinatario={destinatario} 
          onBack={() => setStep(1)} 
          onSuccess={(res) => {
            setTxResult(res);
            setStep(3);
          }} 
        />
      )}
      {step === 3 && (
        <LaPaz 
          result={txResult} 
          onReset={() => {
            setTxResult(null);
            setStep(1);
          }} 
        />
      )}
    </div>
  );
}

export default App;
