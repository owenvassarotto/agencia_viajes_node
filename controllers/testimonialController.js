import { Testimonial } from '../models/Testimoniales.js';

// función para guardar testimonial en la db
const guardarTestimonial = async (req, res) => {
    // validar los campos del formulario
    const { nombre, correo, mensaje } = req.body;

    // creamos un array de errores para despues mostrarlo en la vista
    const errores = [];

    if(nombre.trim() === ''){
        errores.push({ mensaje: 'El nombre está vacío'});
    }
    if(correo.trim() === ''){
        errores.push({ mensaje: 'El correo está vacío'});
    }
    if(mensaje.trim() === ''){
        errores.push({ mensaje: 'El mensaje está vacío'});
    }
    if(errores.length > 0){

        // Consultar testimoniales existentes
        const testimoniales = await Testimonial.findAll();

        // Mostrar la vista con errores
        res.render('testimoniales', {
            pagina: 'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales
        });
    }else{
        // Almacenarlos en la db
        try {
            await Testimonial.create({
                nombre,
                correo,
                mensaje
            })
            // redirecciona a testimoniales
            res.redirect('/testimoniales');
        } catch (error) {
            console.log(error);
        }
    }
}

export {
    guardarTestimonial
};