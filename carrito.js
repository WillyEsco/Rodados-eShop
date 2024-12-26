// Función para renderizar el carrito
function renderizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    if (!listaCarrito) {
        console.error('Elemento lista-carrito no encontrado');
        return;
    }
    
    listaCarrito.innerHTML = '';
    let carrito = [];
    
    try {
        carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    } catch (e) {
        console.error('Error al parsear el carrito:', e);
        carrito = [];
    }
    
    if (carrito.length === 0) {
        listaCarrito.innerHTML = 
        '<div class="carrito-vacio"><img class="raby-cart" src="./images/mascota.png" alt="Mascota"> Tu carrito está vacío</div>';
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
    actualizarContador();
}

// Función para eliminar del carrito
function eliminarDelCarrito(index) {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    renderizarCarrito();
    actualizarContador();
}

// Función para actualizar el contador del carrito en el header
function actualizarContador() {
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
        Swal.fire({
            title: 'Carrito vacío',
            text: 'Agrega productos a tu carrito para realizar la compra',
            icon: 'info',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#ff6f00',
            customClass: {
                popup: 'swal-md3-popup',
                confirmButton: 'swal-md3-button',
                cancelButton: 'swal-md3-button'
            },
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        });
        return;
    }

    // Calcular el total
    const total = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

    // Confirmar compra
    Swal.fire({
        title: '¿Confirmar compra?',
        html: `
            <div style="font-family: 'Roboto', sans-serif;">
                <p style="font-size: 1.1em; margin: 15px 0;">Total a pagar: <strong>$${total.toFixed(2)}</strong></p>
                <p style="font-size: 1.1em; margin: 15px 0;">Cantidad de productos: <strong>${carrito.length}</strong></p>
            </div>
        `,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#ff6f00',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, comprar',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'swal-md3-popup',
            confirmButton: 'swal-md3-button',
            cancelButton: 'swal-md3-button'
        },
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Procesar la compra
            localStorage.setItem('carrito', '[]');
            renderizarCarrito();
            actualizarContador();

            Swal.fire({
                title: '¡Compra exitosa!',
                text: '¡Gracias por tu compra!',
                icon: 'success',
                confirmButtonColor: '#ff6f00',
                confirmButtonText: 'OK',
                customClass: {
                    popup: 'swal-md3-popup',
                    confirmButton: 'swal-md3-button'
                },
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        }
    });
}

// Asegurarse de que el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM cargado');
    renderizarCarrito();
    actualizarContador();
});