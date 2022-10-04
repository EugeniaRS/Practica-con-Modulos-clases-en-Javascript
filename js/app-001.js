import { crearDB } from './funciones.js';
import App from './clases/App.js'
window.onload = () => {
    const app = new App
    crearDB();
}