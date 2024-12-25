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
        showModal(`¡Se agregó otra unidad de ${nombre}! Ahora tienes ${productoExistente.cantidad} unidades en el carrito.`);
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            imagen: imagen,
            cantidad: 1
        });
        showModal(`¡${nombre} ha sido agregado al carrito!`);
    }
    
    // Cerrar automáticamente después de 3 segundos
    setTimeout(() => {
        hideModal();
    }, 3000);
    
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
}