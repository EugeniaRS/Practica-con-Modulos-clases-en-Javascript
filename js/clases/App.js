import { mascotaInput, propietarioInput, telefonoInput, fechaInput, horaInput, sintomasInput, formulario } from '../selectores.js'
import { datosCita, nuevaCita } from '../funciones.js'

class App {
    constructor() {
        this.initApp() //arrancar la funcionalidad 7:30
    }
    initApp() {
        // Eventos
        eventListeners();

        function eventListeners() {
            /* document.addEventListener('DOMContentLoaded', crearDB) */
            mascotaInput.addEventListener('change', datosCita);
            propietarioInput.addEventListener('change', datosCita);
            telefonoInput.addEventListener('change', datosCita);
            fechaInput.addEventListener('change', datosCita);
            horaInput.addEventListener('change', datosCita);
            sintomasInput.addEventListener('change', datosCita);

            formulario.addEventListener('submit', nuevaCita);

        };


    }
}

export default App;