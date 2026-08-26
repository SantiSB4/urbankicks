const WHATSAPP = "573157431679";

function wa(message){
  window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}

function buyProduct(p){
  wa(`Hola UrbanKicks 👋🔥

Estoy interesado en:
👟 ${p.nombre}
🏷️ ${p.genero.toUpperCase()}
📦 Código: ${p.id}

Quiero consultar disponibilidad, tallas y precio.`);
}

function renderProducts(list = productos){
  const grid = document.getElementById("productsGrid");
  const count = document.getElementById("count");
  count.textContent = `${list.length} referencias`;

  grid.innerHTML = list.map(p => `
    <article class="product-card" onclick="openProduct('${p.id}')">
      <div class="product-image-wrap">
        <span class="ref-badge">${p.id}</span>
        <img src="${p.imagen}" alt="${p.nombre}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="category">${p.genero === "dama" ? "DAMA" : "CABALLERO"}</span>
        <h3>${p.nombre}</h3>
        <p class="brand">Marca: ${p.marca}</p>
        <div class="product-bottom">
          <strong>${p.precio}</strong>
          <button class="buy" onclick="event.stopPropagation();buyProduct(${JSON.stringify(p).replace(/"/g,'&quot;')})">
            <span>◉</span> WHATSAPP
          </button>
        </div>
      </div>
    </article>
  `).join("");
}

function openProduct(id){
  const p = productos.find(x => x.id === id);
  if(!p) return;
  document.getElementById("modalImage").src = p.imagen;
  document.getElementById("modalImage").alt = p.nombre;
  document.getElementById("modalRef").textContent = p.id;
  document.getElementById("modalCategory").textContent = p.genero.toUpperCase();
  document.getElementById("modalName").textContent = p.nombre;
  document.getElementById("modalBrand").textContent = `Marca: ${p.marca}`;
  document.getElementById("modalPrice").textContent = p.precio;
  document.getElementById("modalBuy").onclick = () => buyProduct(p);
  document.getElementById("modal").classList.add("show");
  document.body.classList.add("no-scroll");
}

function closeModal(){
  document.getElementById("modal").classList.remove("show");
  document.body.classList.remove("no-scroll");
}

function filterProducts(gender, btn){
  document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  const list = gender === "todos" ? productos : productos.filter(p=>p.genero===gender);
  renderProducts(list);
  document.getElementById("catalogo").scrollIntoView({behavior:"smooth", block:"start"});
}

function searchProducts(value){
  const q=value.trim().toLowerCase();
  const list=!q ? productos : productos.filter(p =>
    `${p.id} ${p.nombre} ${p.marca} ${p.genero}`.toLowerCase().includes(q)
  );
  renderProducts(list);
}

function goCatalog(){
  document.getElementById("catalogo").scrollIntoView({behavior:"smooth"});
}

document.addEventListener("keydown", e=>{
  if(e.key==="Escape") closeModal();
});

document.addEventListener("DOMContentLoaded", ()=>{
  renderProducts();
  document.getElementById("modal").addEventListener("click", e=>{
    if(e.target.id==="modal") closeModal();
  });
});
