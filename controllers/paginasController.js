import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) => { //req - lo que enviamos : res - lo que express nos responde

    const promiseDB = [];

    promiseDB.push(Viaje.findAll({ limit: 3 }));
    promiseDB.push(Testimonial.findAll({ limit: 3 }));

    try {
        
        // obtengo los viajes y testimoniales al mismo tiempo (solicitud simultanea - mejor performance)
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0], //object literal === {viajes: viajes}
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.error(error);
    }
};

const paginaNosotros = (req, res) => {
    // render al archivo nosotros.pug para mostrar el HTML
    res.render('nosotros', {
        //esto lo mostramos en el HTML 
        pagina: 'Nosotros'
    });
};

const paginaViajes = async (req, res) => {
    // Consultar DB para obtener viajes
    const viajes = await Viaje.findAll();

    // render al archivo viajes.pug para mostrar el HTML
    res.render('viajes', {
        //esto lo mostramos en el HTML 
        pagina: 'Próximos Viajes',
        viajes, //object literal enhacement
    });
};

const paginaTestimoniales = async (req, res) => {

    try {
        const testimoniales = await Testimonial.findAll();
        // render al archivo testimoniales.pug para mostrar el HTML
        res.render('testimoniales', {
            //esto lo mostramos en el HTML 
            pagina: 'Testimoniales',
            testimoniales
        });
    } catch (error) {
        console.log(error);
    }
};

// Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {

    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });//extraemos el registro que sea igual al slug

        res.render('viaje', {
            pagina: 'Información Viaje',
            viaje //obj literal enhacement
        });

    } catch (error) {
        console.log(error);
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje
}