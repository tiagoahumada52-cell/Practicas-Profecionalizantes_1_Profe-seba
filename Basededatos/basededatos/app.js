
const formulario = document.getElementById("formulario");
const mensaje = document.getElementById("mensaje");

formulario.addEventListener("submit", function(event) {
    event.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const apellido = document.getElementById("apellido").value.trim();
    const dni = document.getElementById("dni").value.trim();
    const celular = document.getElementById("celular").value.trim();

    if (!nombre || !apellido || !dni || !celular) {
        mensaje.textContent = "Completa todos los campos.";
        return;
    }

    mensaje.textContent =
        "¡Registro de " + nombre + " " + apellido +
        " validado correctamente!";

    console.log({
        nombre: nombre,
        apellido: apellido,
        dni: dni,
        celular: celular
    });
});

formulario.addEventListener("reset", function() {
    mensaje.textContent = "";
});
