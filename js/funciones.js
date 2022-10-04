import Citas from "./clases/Citas.js";
import UI from "./clases/UI.js";
import {
    mascotaInput,
    propietarioInput,
    telefonoInput,
    fechaInput,
    horaInput,
    sintomasInput,
    formulario,
} from "./selectores.js";
const ui = new UI();
const administrarCitas = new Citas();
//let editando
let editando = false;

//alcanze global cualquiera lo pueda utilizar, puede modificarlo

const citaObj = {
    // contiene la informacion de la cita y es la que se envia a la base de datos
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: "",
};

export function datosCita(e) {
    //console.log(e.target.name) obtner el input
    citaObj[e.target.name] = e.target.value;
}

export function nuevaCita(e) {
    e.preventDefault();
    const { mascota, propietario, telefono, fecha, hora, sintomas } = citaObj;
    // Validar
    if (
        mascota === "" ||
        propietario === "" ||
        telefono === "" ||
        fecha === "" ||
        hora === "" ||
        sintomas === ""
    ) {
        ui.imprimirAlerta("Todos los campos son Obligatorios", "error");
        return;
    }
    if (editando) {
        // Estamos editando
        administrarCitas.editarCita({...citaObj });
        ui.imprimirAlerta("Guardado Correctamente");
        formulario.querySelector('button[type="submit"]').textContent =
            "Crear Cita";
        editando = false;
    } else {
        // Nuevo Registrando
        // Generar un ID único
        citaObj.id = Date.now(); //generador de numeros
        // Añade la nueva cita
        administrarCitas.agregarCita({...citaObj });
        // Mostrar mensaje de que todo esta bien...
        ui.imprimirAlerta("Se agregó correctamente");
        agregarDB(citaObj);
    }
    // Imprimir el HTML de citas
    ui.imprimirCitas(administrarCitas);

    // Reinicia el objeto para evitar futuros problemas de validación
    reiniciarObjeto();

    // Reiniciar Formulario
    formulario.reset();
}

export function reiniciarObjeto() {
    // Reiniciar el objeto
    citaObj.mascota = "";
    citaObj.propietario = "";
    citaObj.telefono = "";
    citaObj.fecha = "";
    citaObj.hora = "";
    citaObj.sintomas = "";
}

export function deleteCita(id) {
    administrarCitas.eliminarCita(id);
    ui.imprimirCitas(administrarCitas); //actualizar la lista sin el elemento eliminado
}

export function cargarEdicion(cita) {
    const { mascota, propietario, telefono, fecha, hora, sintomas, id } = cita;

    // Reiniciar el objeto
    //lleno mi objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Llenar los Inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;
    formulario.querySelector('button[type="submit"]').textContent =
        "Guardar Cambios";
    editando = true; //porque le voy adar la funcionalidad de modificar
}
let DB;
export function crearDB() {
    const citaDB = window.indexedDB.open("citas", 1);
    citaDB.onerror = function() {
        console.log("hubo un error en la creacion de la BD");
    };
    citaDB.onsuccess = function() {
        console.log(" citas listas");
        DB = citaDB.result;
    };
    citaDB.onupgradeneeded = function(e) {
        const db = e.target.result;
        const objectStore = db.createObjectStore("citas", {
            keyPath: "id",
            autoIncrement: true,
        });
        objectStore.createIndex("mascota", "mascota", { unique: false });
        objectStore.createIndex("cliente", "cliente", { unique: false });
        objectStore.createIndex("telefono", "telefono", { unique: false });
        objectStore.createIndex("fecha", "fecha", { unique: false });
        objectStore.createIndex("hora", "hora", { unique: false });
        objectStore.createIndex("sintomas", "sintomas", { unique: false });
        objectStore.createIndex("id", "id", { unique: false });
        console.log("Base de datoscreada y lista");
    };
}

function agregarDB(citaObj) { //recibe
    let trans = DB.trasaction(["citas"], "readwrite");
    trans.oncomplete = function() {
        console.log("transaccion realizada con exito");
    };
    trans.onerror = function() {
        console.log("Hubo un error enn la trnasaccion");
    };
    let objectStore = trans.objectStore("citas");
    let peticion = objectStore.add(citaObj);
    console.log(peticion);
}