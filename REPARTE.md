# Reparte

Track: **Pagos y remesas** · Ideatón Stellar Bolivia · 17 y 18 de octubre

Una remesa sale en una sola transacción de Stellar y llega partida: una parte a la cuenta del gasto del día y otra a la cuenta cuota, que la familia no usa para el día a día.

## La escena

La hermana en Madrid manda 200 dólares. En La Paz, 140 llegan para la casa y 60 se van directo a la matrícula. El giro tradicional entrega un solo monto. A las 48 horas la plata ya se gastó y la cuota sigue debiendo.

Frase de pitch:

> El martes llegaron 200 dólares de Madrid. El jueves no quedaba nada, y la matrícula de marzo sigue sin pagar. Reparte manda las dos cosas en el mismo envío.

## Problema

Quien recibe una remesa en Bolivia la usa para lo urgente: comida, pasaje, una deuda chica. La meta que justificó el envío (matrícula, alquiler, medicina) se queda para después, y después el boliviano ya no alcanza.

El que envía no puede partir el giro. Western Union, MoneyGram o un conocido entregan un solo monto, cobran entre 6% y 8%, y no dejan un comprobante que separe las dos partes.

## Usuario

Persona boliviana que vive en España, Argentina, Chile o Brasil y manda plata cada mes a su familia. Del otro lado, la mamá, el papá o la pareja que recibe en La Paz, El Alto, Santa Cruz o Cochabamba.

No es «el mercado de remesas». Es una familia y un número.

## Solución

1. Quien envía elige el monto, el nombre de quien recibe y el porcentaje que se aparta para la cuota. Ejemplo: 200 dólares, mamá, 30%.
2. Reparte arma **una** transacción con dos pagos a dos cuentas distintas y un memo `REPARTE`.
3. Quien recibe ve dos tarjetas: «Para hoy, 140» y «Cuota, 60». La cuota cae en su propia cuenta: no entra al gasto del día.

Comprar los dólares queda fuera del producto. Reparte solo parte un envío que ya está en USDC. En la demo de testnet se paga con `USDp`, un asset de prueba emitido por la propia cuenta emisora.

## Por qué Stellar

- Las dos partes viajan en la misma transacción y caen en cuentas distintas. El jurado abre un hash y ve dos operaciones con dos destinos.
- El pago sale en `USDp`, un asset emitido por la demo: emisión, trustlines y split en la misma red. Es Stellar de verdad, no una etiqueta en pantalla.
- La comisión no mueve la aguja en un envío de 200 dólares.
- El memo `REPARTE` queda como comprobante del pedido: quién, cuánto y para qué.
- Las cuentas de prueba en testnet bastan para mostrar el flujo. Friendbot las fondea. No hace falta un banco en el medio para la demo.

URL del comprobante:

`https://stellar.expert/explorer/testnet/tx/HASH`

## Producto

Una sola página. Tres momentos.

### 1. Madrid

- Monto total
- Nombre de quien recibe
- Porcentaje para la cuota (default 30%)
- Vista previa: «140 para hoy · 60 para la cuota»

### 2. Enviar

Un botón construye y firma la transacción de testnet. Para el video, la firma la hace una cuenta de prueba ya fondeada, así la grabación no depende de una extensión.

### 3. La Paz

Dos tarjetas con los montos —una por cuenta— y el enlace a Stellar Expert. El hash es la prueba: dos operaciones, dos destinos.

## Modelo

1% al enviar.

Quien manda hoy pierde entre 6% y 8% en el giro, y además no puede separar la cuota. Reparte cobra menos y entrega el comprobante partido.

La familia no paga por recibir.

## Entrevistas

Meta: 5 conversaciones antes del domingo 12:00. Misma pregunta en todas:

> La última vez que llegó plata de afuera, ¿cuánto duró y qué se quedó sin pagar?

A quién escribir hoy:

1. Una familia con alguien en España.
2. Una familia con alguien en Argentina, Chile o Brasil.
3. Quien haya cobrado por Western Union o MoneyGram en el último año.
4. Un padre o una madre que iba a usar esa plata para el colegio.
5. Quien envía, aunque sea por audio de WhatsApp: ¿mandarías una parte directo a la cuota si pudieras?

En la slide van citas textuales, con nombre de pila y ciudad. Un número concreto vale más que una estadística.

## Deck de 8 slides

1. **Reparte.** La remesa llega partida. Track Pagos y remesas.
2. **Problema.** 200 dólares, 48 horas, la cuota sigue igual. Una familia, un giro, un resto que no alcanzó.
3. **Evidencia.** Cinco citas de las entrevistas.
4. **Solución.** Un envío, dos destinos: hoy y la cuota.
5. **Por qué Stellar.** Captura del hash con las dos operaciones.
6. **Producto.** Las tres pantallas, grabadas.
7. **Modelo.** 1% al enviar. El giro de hoy cobra 6% a 8% y no parte el monto.
8. **Plan de 30 días.** Diez familias con alguien afuera, el mismo flujo, hash de testnet ya visible.

## Pitch de 3 minutos

**0:00** María manda 200 dólares desde Madrid todos los meses. Su mamá en La Paz los recibe para la casa y para la matrícula.

**0:25** El jueves la plata de la casa ya se usó. La matrícula sigue igual. El giro no deja separar las dos cosas, y encima se queda entre 6% y 8%.

**0:50** Leímos esto en cinco familias. Cita textual. Cita textual.

**1:20** Reparte parte el envío antes de que llegue. 140 a la cuenta de hoy, 60 directo a la cuenta de la cuota. Una sola transacción.

**1:50** Demo: formulario, botón, Stellar Expert, dos operaciones en el mismo hash.

**2:20** Cobramos 1% a quien envía. Recibir es gratis. En 30 días lo probamos con diez familias que ya mandan plata cada mes.

**2:45** Cierre: la remesa deja de ser un solo fajo. Llega con la cuota ya apartada en su propia cuenta.

## Cómo construirlo

Alcance de un día. Si no está en esta lista, no se construye hoy.

Stack: Vite + React + `@stellar/stellar-sdk`. Sin backend, sin Soroban, sin anchor, sin login.

Red: testnet.

- Horizon: `https://horizon-testnet.stellar.org`
- Passphrase: `Test SDF Network ; September 2015`
- Fondeo: `https://friendbot.stellar.org?addr=G...`

Flujo técnico:

1. Crear tres cuentas de testnet —emisor, familia (hoy) y cuenta cuota— y fondearlas con Friendbot.
2. El emisor emite `USDp` (dólares de prueba). Familia y cuenta cuota abren trustline. Esto lo hace `scripts/cuentas.mjs` una sola vez.
3. La página calcula `paraHoy = monto * (1 - porcentaje)` y `cuota = monto * porcentaje`.
4. Una transacción con dos `Operation.payment` en `USDp` —uno a la cuenta familia, otro a la cuenta cuota— y `Memo.text("REPARTE")`.
5. Firmar con la clave de prueba guardada solo para la demo.
6. Enviar a Horizon y pintar las dos tarjetas con el hash.

La separación es real: la cuota vive en otra cuenta, no es solo una etiqueta en pantalla.

Plan B: si emitir el asset cuesta más de lo esperado, los mismos dos pagos salen en XLM y en pantalla se leen como dólares de prueba. El split en dos cuentas se mantiene igual.

Demo para el bonus: el video muestra el pago y el jurado puede abrir el hash. Esa transacción es el +10%.

## Estructura de carpetas

```text
reparte/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore              # node_modules, dist, .env
├── .env.example            # plantilla; se copia a .env y se completa
├── scripts/
│   └── cuentas.mjs         # crea emisor, familia y cuenta cuota; las fondea
│                           # con Friendbot, emite USDp, abre trustlines
│                           # e imprime el .env listo
└── src/
    ├── main.jsx            # monta <App />
    ├── App.jsx             # estado del borrador, llama a sendSplit,
    │                       # junta los tres momentos
    ├── index.css           # estilos de la página única
    ├── config.js           # Horizon testnet, passphrase, MEMO, FEE_RATE,
    │                       # código e issuer de USDp, defaults
    ├── lib/
    │   ├── split.js        # splitRemittance: paraHoy, cuota, comisión
    │   ├── stellar.js      # sendSplit: una tx, dos payment en USDp a dos
    │   │                   # cuentas distintas, memo REPARTE
    │   └── expert.js       # expertUrl(hash)
    └── components/
        ├── Madrid.jsx      # formulario: monto, nombre, porcentaje, vista previa
        ├── Enviar.jsx      # botón enviar + errores
        └── LaPaz.jsx       # dos tarjetas + enlace a Stellar Expert
```

Orden para trabajarlo:

1. `package.json`, `vite.config.js`, `index.html`, `.gitignore`, `.env.example`.
2. `scripts/cuentas.mjs` y `npm run cuentas`: tres cuentas, `USDp` emitido, trustlines abiertas y el `.env` generado.
3. `src/config.js` y `src/lib/split.js` (puro, sin red).
4. `src/lib/stellar.js` y `src/lib/expert.js`.
5. Los tres componentes, `App.jsx`, `main.jsx`, `index.css`.
6. `npm run dev`: enviar, abrir el hash en Stellar Expert, ver las dos operaciones.

## Qué dejar escrito en el video

- El problema en una familia, no en «Bolivia».
- Las citas, aunque sean cortas.
- El hash abierto en Stellar Expert, con las dos operaciones a la vista.
- El 1% contra el 6% a 8% del giro actual.

## Después del domingo

- Diez familias reales que ya reciben remesas.
- Un proveedor de on-ramp regulado para entrar y salir de USDC. Reparte no compra ni vende dólares.
- La cuenta cuota gana un candado real: multisig con un tercero de confianza o liberación por fecha (`timebounds`), para que no pueda tocarse antes de tiempo.
