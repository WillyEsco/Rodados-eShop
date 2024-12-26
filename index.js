// variable global para almacenar los productos seleccionados
let carrito = [];



// funcion para actualizar el contador del carrito
const actualizarContador = ()=>{
    //cambiamos el contenido del HTML con el ID contador-carrito
    document.getElementById("contador-carrito").textContent = carrito.length

}

// Guarda el contenido del carrito en el almacenamiento local antes de cerrar la pagina

window.addEventListener("beforeunload",()=>{
localStorage.setItem("carrito",JSON.stringify(carrito))
});

// ---MODAL----
// Elementos del modal
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const span = document.getElementsByClassName("close")[0];

// Función para mostrar el modal con animación
function showModal(message) {
    modalMessage.textContent = message;
    modal.style.display = "block";
    modal.classList.add("show");
}

// Función para ocultar el modal con animación
function hideModal() {
    modal.classList.remove("show");
    setTimeout(() => {
        modal.style.display = "none";
    }, 300);
}

// Cerrar modal con el botón X
span.onclick = function() {
    hideModal();
}

// Cerrar modal haciendo clic fuera
window.onclick = function(event) {
    if (event.target == modal) {
        hideModal();
    }
}

// Modificar la función agregarAlcarrito
function agregarAlcarrito(nombre, precio, imagen) {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    const productoExistente = carrito.find(item => item.nombre === nombre);
    
    if (productoExistente) {
        productoExistente.cantidad++;
        // showModal(`¡Se agregó otra unidad de ${nombre}! Ahora tienes ${productoExistente.cantidad} unidades en el carrito.`);
        Swal.fire({
            title: 'Cantidad actualizada',
            icon: 'success',
            text:`¡Se agregó otra unidad de ${nombre}! Ahora tienes ${productoExistente.cantidad} unidades en el carrito.`,
            // imageUrl: './images/success.png',
            // imageWidth: 150,
            // imageHeight: 150,
            // imageAlt: 'Imagen de éxito',
            // confirmButtonColor: '#3085d6',
            confirmButtonText: 'Cerrar',
            background: '#f4f4f4', // Fondo personalizado
            // color: '#333',         // Color del texto
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
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
        // showModal(`¡${nombre} ha sido agregado al carrito!`);
        Swal.fire({
            title: '¡Producto agregado!',
            text:  `¡${nombre} ha sido agregado al carrito!`,
            imageUrl: './images/mascota-modal.png', // Ruta de tu imagen personalizada
            imageWidth: 200,                 // Ancho de la imagen
            imageHeight: 200,                // Altura de la imagen
            imageAlt: 'Raby y Rabito con el carrito de compras', // Texto alternativo para accesibilidad
            confirmButtonText: `Entendido!!!`,
            background: '#f4f4f4', // Fondo personalizado
            // color: '#333',         // Color del texto
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
    
    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
        hideModal();
    }, 3000);
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
}