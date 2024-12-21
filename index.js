// variable global para almacenar los productos seleccionados
let carrito = [];

// const agregarAlcarrito = (nombre,precio) =>{
//     carrito.push({nombre,precio})
//     actualizarContador()
//     alert(`Agregaste : ${nombre} al carrito`)
// }

function agregarAlcarrito(nombre, precio, imagen) {
    carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const productoExistente = carrito.findIndex(item => item.nombre === nombre);
    if (productoExistente !== -1) {
        carrito[productoExistente].cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1, // Inicializamos la cantidad en 1
            imagen: imagen || '/images/placeholder.jpg' // Usamos la imagen proporcionada o una por defecto
        });
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador()
    // alert(`Agregaste : ${nombre} al carrito`)
}

// funcion para actualizar el contador del carrito
const actualizarContador = ()=>{
    //cambiamos el contenido del HTML con el ID contador-carrito
    document.getElementById("contador-carrito").textContent = carrito.length

}

// Guarda el contenido del carrito en el almacenamiento local antes de cerrar la pagina

window.addEventListener("beforeunload",()=>{
localStorage.setItem("carrito",JSON.stringify(carrito))
});

