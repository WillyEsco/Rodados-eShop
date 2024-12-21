// Función para renderizar el carrito
function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<div class="carrito-vacio">Tu carrito está vacío</div>';
        return;
    }

    let total = 0;

    // Renderizar items
    carrito.forEach((producto, index) => {
        total += producto.precio * producto.cantidad;
        const itemHTML = `
            <div class="item-carrito">
                <img src="${producto.imagen || '/images/placeholder.png'}" alt="${producto.nombre}">
                <div class="item-info">
                    <h3>${producto.nombre}</h3>
                    <span class="precio">$${producto.precio}</span>
                </div>
                <div class="cantidad-control">
                    <button onclick="actualizarCantidad(${index}, -1)">-</button>
                    <span>${producto.cantidad}</span>
                    <button onclick="actualizarCantidad(${index}, 1)">+</button>
                </div>
                <button class="btn-eliminar" onclick="eliminarDelCarrito(${index})">
                    <i class="material-icons">delete</i>
                </button>
            </div>
        `;
        listaCarrito.innerHTML += itemHTML;
    });

    // Agregar resumen del carrito
    listaCarrito.innerHTML += `
        <div class="cart-summary">
            <div class="total">
                <span>Total</span>
                <span>$${total.toFixed(2)}</span>
            </div>
        </div>
    `;
}

// Función para actualizar cantidad
function actualizarCantidad(index, cambio) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito[index].cantidad = Math.max(1, carrito[index].cantidad + cambio);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

// Función para eliminar del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContadorCarrito();
}

// Función para actualizar el contador del carrito en el header
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contador = document.getElementById('contador-carrito');
    if (contador) {
        contador.textContent = carrito.reduce((total, item) => total + item.cantidad, 0);
    }
}

// Función para realizar la compra
function realizarCompra() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    if (carrito.length === 0) {
        alert('Tu carrito está vacío');
        return;
    }
    
    // Aquí irían las validaciones y el proceso de compra
    alert('¡Gracias por tu compra!');
    localStorage.setItem('carrito', '[]');
    renderizarCarrito();
    actualizarContadorCarrito();
}

// Ejecutar cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    renderizarCarrito();
    actualizarContadorCarrito();
});