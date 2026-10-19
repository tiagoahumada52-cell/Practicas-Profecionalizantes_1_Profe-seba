import mysql from 'mysql2/promise'; 

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