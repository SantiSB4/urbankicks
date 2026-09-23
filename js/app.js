const WHATSAPP = "573157431679";

// =====================================================
// WHATSAPP
// =====================================================

function wa(message) {
  window.open(
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`,
    "_blank",
    "noopener,noreferrer"
  );
}


// =====================================================
// CARRITO
// =====================================================

let carrito = [];


// Agregar producto al carrito
function agregarAlCarrito(id) {

  const producto = productos.find(p => p.id === id);

  if (!producto) {
    alert("No se encontró este producto.");
    return;
  }

  const tallaSelect = document.getElementById(`talla-${id}`);

  if (!tallaSelect) {
    alert("Selecciona una talla.");
    return;
  }

  const talla = tallaSelect.value;

  if (!talla) {
    alert("Por favor selecciona una talla.");
    return;
  }

  const existente = carrito.find(
    item => item.id === id && item.talla === talla
  );

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      marca: producto.marca,
      precio: producto.precio || "$180.000",
      descuento: producto.descuento || "20% OFF",
      imagen: producto.imagen,
      talla: talla,
      cantidad: 1
    });
  }

  actualizarCarrito();

  mostrarNotificacion(
    `${producto.nombre} agregado al carrito 🛒`
  );
}


// =====================================================
// ELIMINAR DEL CARRITO
// =====================================================

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}


// =====================================================
// CAMBIAR CANTIDAD
// =====================================================

function cambiarCantidad(index, cambio) {

  carrito[index].cantidad += cambio;

  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }

  actualizarCarrito();
}


// =====================================================
// CONVERTIR PRECIO
// =====================================================

function obtenerNumeroPrecio(precio) {

  if (!precio) return 0;

  const numero = String(precio)
    .replace(/\$/g, "")
    .replace(/\./g, "")
    .replace(/,/g, "")
    .replace(/\s/g, "");

  return parseInt(numero) || 0;
}


// =====================================================
// FORMATEAR PRECIO
// =====================================================

function formatearPrecio(numero) {
  return "$" + numero.toLocaleString("es-CO");
}


// =====================================================
// ACTUALIZAR CARRITO
// =====================================================

function actualizarCarrito() {

  const contador = document.getElementById("cartCount");

  if (contador) {
    const cantidadTotal = carrito.reduce(
      (total, producto) => total + producto.cantidad,
      0
    );

    contador.textContent = cantidadTotal;
  }

  const cartItems = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");

  if (!cartItems || !cartTotal) return;

  if (carrito.length === 0) {

    cartItems.innerHTML = `
      <div class="carrito-vacio">
        <div class="carrito-vacio-icon">🛒</div>
        <h3>Tu carrito está vacío</h3>
        <p>Agrega tus tenis favoritos para continuar.</p>
      </div>
    `;

    cartTotal.textContent = "$0";
    return;
  }

  let total = 0;

  cartItems.innerHTML = carrito.map((producto, index) => {

    const precio = obtenerNumeroPrecio(producto.precio);
    const subtotal = precio * producto.cantidad;

    total += subtotal;

    return `
      <div class="cart-item">

        <img
          src="${producto.imagen}"
          alt="${producto.nombre}"
        >

        <div class="cart-item-info">

          <strong>${producto.nombre}</strong>

          <span>${producto.marca}</span>

          <span>Talla: ${producto.talla}</span>

          <strong>
            ${formatearPrecio(precio)}
          </strong>

          <div class="cantidad-control">

            <button onclick="cambiarCantidad(${index}, -1)">
              −
            </button>

            <span>${producto.cantidad}</span>

            <button onclick="cambiarCantidad(${index}, 1)">
              +
            </button>

          </div>

          <button
            class="eliminar-producto"
            onclick="eliminarDelCarrito(${index})"
          >
            Eliminar
          </button>

        </div>

      </div>
    `;

  }).join("");

  cartTotal.textContent = formatearPrecio(total);
}


// =====================================================
// ABRIR / CERRAR CARRITO
// =====================================================

function abrirCarrito() {

  const carritoPanel = document.getElementById("cartPanel");

  if (carritoPanel) {
    carritoPanel.classList.add("active");
  }
}


function cerrarCarrito() {

  const carritoPanel = document.getElementById("cartPanel");

  if (carritoPanel) {
    carritoPanel.classList.remove("active");
  }
}


// =====================================================
// FINALIZAR COMPRA
// =====================================================

function finalizarCompra() {

  if (carrito.length === 0) {

    alert("Tu carrito está vacío.");

    return;
  }

  const nombre = document.getElementById("clienteNombre")?.value.trim();
  const ciudad = document.getElementById("clienteCiudad")?.value.trim();
  const direccion = document.getElementById("clienteDireccion")?.value.trim();

  if (!nombre || !ciudad || !direccion) {

    alert(
      "Por favor completa tu nombre, ciudad y dirección."
    );

    return;
  }

  let total = 0;

  let mensaje = `Hola UrbanKicks 👋🔥

Quiero realizar el siguiente pedido:

`;

  carrito.forEach((producto, index) => {

    const precio = obtenerNumeroPrecio(producto.precio);

    const subtotal = precio * producto.cantidad;

    total += subtotal;

    mensaje += `${index + 1}. ${producto.nombre}
Marca: ${producto.marca}
Talla: ${producto.talla}
Cantidad: ${producto.cantidad}
Precio: ${formatearPrecio(precio)}
Subtotal: ${formatearPrecio(subtotal)}

`;

  });

  mensaje += `TOTAL: ${formatearPrecio(total)}

DATOS DEL CLIENTE

Nombre: ${nombre}
Ciudad: ${ciudad}
Dirección: ${direccion}

Quedo atento para confirmar disponibilidad y realizar el pago.`;

  wa(mensaje);
}


// =====================================================
// NOTIFICACIÓN
// =====================================================

function mostrarNotificacion(mensaje) {

  let notificacion = document.getElementById("cartNotification");

  if (!notificacion) {

    notificacion = document.createElement("div");

    notificacion.id = "cartNotification";

    document.body.appendChild(notificacion);
  }

  notificacion.textContent = mensaje;

  notificacion.classList.add("show");

  setTimeout(() => {
    notificacion.classList.remove("show");
  }, 2500);
}


// =====================================================
// RENDERIZAR PRODUCTOS
// =====================================================

function renderProducts(list = productos) {

  const grid = document.getElementById("productsGrid");

  const count = document.getElementById("count");

  if (!grid) return;

  if (count) {
    count.textContent = `${list.length} referencias`;
  }

  grid.innerHTML = list.map(p => `

    <article class="product-card">

      <div class="product-image-wrap">

        <span class="discount-badge">
          ${p.descuento || "20% OFF"}
        </span>

        <img
          src="${p.imagen}"
          alt="${p.nombre}"
          loading="lazy"
        >

      </div>

      <div class="product-info">

        <span class="category">
          ${p.genero === "dama" ? "DAMA" : "CABALLERO"}
        </span>

        <h3>${p.nombre}</h3>

        <p class="brand">
          ${p.marca}
        </p>

        <div class="product-price">
          <strong>
            ${p.precio || "$180.000"}
          </strong>
        </div>

        <div class="talla-container">

          <label for="talla-${p.id}">
            Selecciona tu talla:
          </label>

          <select id="talla-${p.id}">

            <option value="">
              Elegir talla
            </option>

            <option value="35">35</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>

          </select>

        </div>

        <button
          class="add-cart-button"
          onclick="agregarAlCarrito('${p.id}')"
        >
          🛒 AGREGAR AL CARRITO
        </button>

      </div>

    </article>

  `).join("");
}

// =====================================================
// FILTROS Y BUSCADOR
// =====================================================

let filtroActual = "todos";

function filterProducts(categoria, boton) {

  filtroActual = categoria;

  document.querySelectorAll(".filter").forEach(btn => {
    btn.classList.remove("active");
  });

  if (boton) {
    boton.classList.add("active");
  }

  aplicarFiltros();
}

function searchProducts(texto) {
  aplicarFiltros(texto);
}

function aplicarFiltros(texto = null) {

  const buscador = document.querySelector(".search");

  const textoBusqueda = texto !== null
    ? texto
    : (buscador ? buscador.value : "");

  const busqueda = textoBusqueda.toLowerCase().trim();

  let lista = productos.filter(producto => {

    const coincideGenero =
      filtroActual === "todos" ||
      producto.genero === filtroActual;

    const contenido = `
      ${producto.id}
      ${producto.nombre}
      ${producto.marca}
      ${producto.genero}
    `.toLowerCase();

    const coincideBusqueda =
      busqueda === "" ||
      contenido.includes(busqueda);

    return coincideGenero && coincideBusqueda;
  });

  renderProducts(lista);
}

// =====================================================
// INICIAR
// =====================================================

document.addEventListener("DOMContentLoaded", () => {

  renderProducts();

  actualizarCarrito();

});