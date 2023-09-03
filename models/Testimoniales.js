import Sequelize from 'sequelize';//sequelize para realizar solicitudes a la db
import db from '../config/db.js';//importamos nuestra conexion a la db

// el id no va porque ya lo da por hecho
export const Testimonial = db.define('testimoniales', {
    nombre: {
        type: Sequelize.STRING,
    },
    correo: {
        type: Sequelize.STRING,
    },
    mensaje: {
        type: Sequelize.STRING,
    }
});