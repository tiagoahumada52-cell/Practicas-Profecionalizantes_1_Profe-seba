import mysql from 'mysql2/promise'; 
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// conexion a la base de datos
 const configurarConexion = {
   host: 'localhost',
   user: 'alumnos_Cen',
   password: 'alumno.1234',
   db: 'alumnos_cen',
   port: 5500,
   multipleStatements: true
   
};

async function conectar() {
  try {
    const conexion = await mysql.createConnection(configurarConexion);
    console.log('Conexión exitosa a la base de datos');
    return conexion;
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    throw error;
  }
}
conectar();
document.addEventListener("DOMContentLoaded", () => {
    const cuerpoTabla = document.getElementById("cuerpo-tabla");
    const filtroAnio = document.getElementById("filtro-anio");
    const filtroDivision = document.getElementById("filtro-division");

    // Función para obtener los registros (asumiendo que los guardas en localStorage bajo la clave 'alumnos')
    function obtenerRegistros() {
        return JSON.parse(localStorage.getItem("alumnos")) || [];
    }

    // Función para guardar los registros
    function guardarRegistros(alumnos) {
        localStorage.setItem("alumnos", JSON.stringify(alumnos));
    }

    // Función para renderizar la tabla con filtros aplicados
    function renderizarTabla() {
        const alumnos = obtenerRegistros();
        const anioSeleccionado = filtroAnio.value;
        const divisionSeleccionada = filtroDivision.value;

        // Filtrar datos
        const alumnosFiltrados = alumnos.filter(alumno => {
            const coincideAnio = anioSeleccionado === "" || alumno.anio === anioSeleccionado;
            const coincideDivision = divisionSeleccionada === "" || alumno.division === divisionSeleccionada;
            return coincideAnio && coincideDivision;
        });

        cuerpoTabla.innerHTML = "";

        if (alumnosFiltrados.length === 0) {
            cuerpoTabla.innerHTML = `<tr><td colspan="7" style="text-align: center; color: #8c7b6d;">No hay registros encontrados.</td></tr>`;
            return;
        }

        alumnosFiltrados.forEach((alumno, index) => {
            // Nota: index real en el array completo si guardas por índice, 
            // o puedes usar un ID único si lo prefieres.
            const fila = document.createElement("tr");
            
            fila.innerHTML = `
                <td>${alumno.nombre}</td>
                <td>${alumno.apellido}</td>
                <td>${alumno.dni}</td>
                <td>${alumno.celular}</td>
                <td>${alumno.anio}.º año</td>
                <td>${alumno.division === '1ra' ? '1.ª división' : '2.ª división'}</td>
                <td>
                    <button class="btn-accion btn-editar" data-index="${index}">Editar</button>
                    <button class="btn-accion btn-eliminar" data-index="${index}">Borrar</button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    }

    // Eventos de filtrado
    filtroAnio.addEventListener("change", renderizarTabla);
    filtroDivision.addEventListener("change", renderizarTabla);

    // Eventos de la tabla (Borrar y Editar)
    cuerpoTabla.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        let alumnos = obtenerRegistros();

        if (e.target.classList.contains("btn-eliminar")) {
            if (confirm("¿Estás seguro de que deseas eliminar este registro?")) {
                alumnos.splice(index, 1);
                guardarRegistros(alumnos);
                renderizarTabla();
            }
        }

        if (e.target.classList.contains("btn-editar")) {
            const alumno = alumnos[index];
            const nuevoNombre = prompt("Editar Nombre:", alumno.nombre);
            const nuevoApellido = prompt("Editar Apellido:", alumno.apellido);
            const nuevoDni = prompt("Editar DNI:", alumno.dni);
            const nuevoCelular = prompt("Editar Celular:", alumno.celular);

            if (nuevoNombre && nuevoApellido && nuevoDni && nuevoCelular) {
                alumnos[index].nombre = nuevoNombre;
                alumnos[index].apellido = nuevoApellido;
                alumnos[index].dni = nuevoDni;
                alumnos[index].celular = nuevoCelular;
                
                guardarRegistros(alumnos);
                renderizarTabla();
                alert("Registro actualizado con éxito.");
            }
        }
    });

    // Carga inicial al abrir la página
    renderizarTabla();
});