URBANKICKS - CATÁLOGO COMPLETO DESDE PDF

Se procesaron las 46 páginas del PDF.
Productos extraídos:
- DAMA: 142
- CABALLERO: 120
- TOTAL: 262

IMPORTANTE:
El PDF contiene las fotos pero no trae el nombre/referencia escrito debajo de cada producto.
Por eso cada producto tiene un código temporal:
DAMA-001, DAMA-002...
CABALLERO-001, CABALLERO-002...

Cuando tengas los nombres, solo debes editar productos.js.

ESTRUCTURA:
URBANKICKS_CATALOGO_COMPLETO/
├── index.html
├── productos.js
├── css/
│   └── estilos.css
├── js/
│   └── app.js
├── assets/
│   ├── hero.png
│   └── products/
│       ├── dama-001.jpg
│       ├── dama-002.jpg
│       └── ...
└── README.txt

WHATSAPP:
+57 315 743 1679

CÓMO CAMBIAR UNA REFERENCIA:
Busca en productos.js:
{
  "id": "dama-001",
  "marca": "Por identificar",
  "nombre": "Referencia DAMA-001",
  "genero": "dama",
  "precio": "Consultar",
  ...
}

Puedes cambiar:
"marca": "NIKE",
"nombre": "Air Force 1",
"precio": "$180.000"

No cambies "imagen" salvo que quieras reemplazar la foto.

CÓMO AGREGAR UNA NUEVA REFERENCIA:
1. Pon la foto en assets/products/
2. Agrega un nuevo objeto al final de productos.js.
3. Indica genero: "dama" o "caballero".
4. La tarjeta aparecerá automáticamente.

CÓMO PROBAR:
Abre la carpeta en VS Code.
Si tienes Live Server:
clic derecho en index.html -> Open with Live Server.

El catálogo tiene hover interactivo, ventana de detalle al hacer clic, filtros, buscador y botones de WhatsApp.
