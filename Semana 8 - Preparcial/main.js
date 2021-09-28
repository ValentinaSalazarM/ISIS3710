ruta = "archivo.json";

let listaDatos = [];
let ordAscendente = {
  "Last Name": false,
  "First Name": false,
  Email: false,
  Photo: false,
};
const mapeoNombres = {
  "Last Name": "last_name",
  "First Name": "first_name",
  Email: "email",
  Photo: "photo",
};

/* Botón eliminar datos */
const btnEliminarDatos = document.getElementById("eliminar-datos");
btnEliminarDatos.onclick = limpiarTabla;

/* Acceder a un JSON */
fetch(ruta)
  .then((res) => res.json())
  .then((datos) => {
    let atributos = ["last_name", "first_name", "email", "photo"];
    listaDatos = insertarDatos(datos, atributos);

    const encabezado = document.querySelectorAll("th");
    for (let i = 0; i < encabezado.length; i++) {
      encabezado[i].onclick = ordenarElementos;
    }
  });

function insertarDatos(datos, atributos) {
  let listaDatos = [];
  let table = document.querySelector("table");
  let tblBody = document.createElement("tbody");
  tblBody.id = "tblBody";

  for (let i = 0; i < datos.length; i++) {
    actual = datos[i];
    let fila = document.createElement("tr");

    fila.id = "fila-" + i;
    fila.onmouseover = (elemento) =>
      (elemento.target.parentNode.style.backgroundColor = "cornflowerblue");
    fila.onmouseout = (elemento) =>
      (elemento.target.parentNode.style.backgroundColor = "white");

    let nuevoElemento = {};

    for (let j = 0; j < atributos.length - 1; j++) {
      let columna = document.createElement("td");
      let texto = document.createTextNode(actual[atributos[j]]);
      columna.appendChild(texto);
      fila.appendChild(columna);

      nuevoElemento[atributos[j]] = actual[atributos[j]];
    }

    let columnaImagen = document.createElement("td");
    let imagen = document.createElement("img");
    imagen.src = actual.photo;
    columnaImagen.appendChild(imagen);
    fila.appendChild(columnaImagen);

    nuevoElemento["photo"] = actual.photo;

    let columnaBoton = document.createElement("td");
    let botonEliminar = document.createElement("button");
    let texto = document.createTextNode("Eliminar fila");
    botonEliminar.className = "btn btn-secondary";
    botonEliminar.style.display = "block";
    botonEliminar.style.margin = "0.75rem";
    botonEliminar.appendChild(texto);
    botonEliminar.onclick = eliminarFila;

    let botonActualizar = document.createElement("button");
    texto = document.createTextNode("Actualizar fila");
    botonActualizar.className = "btn btn-primary";
    botonActualizar.style.display = "block";
    botonActualizar.style.margin = "0.75rem";
    botonActualizar.appendChild(texto);
    botonActualizar.onclick = actualizarFila;

    columnaBoton.appendChild(botonEliminar);
    columnaBoton.appendChild(botonActualizar);

    fila.appendChild(columnaBoton);

    listaDatos.push(nuevoElemento);

    tblBody.appendChild(fila);
    table.appendChild(tblBody);
  }

  const formulario = document.createElement("form");

  for (let i = 0; i < 4; i++) {
    let input = document.createElement("input");
    input.id = "input-" + i;
    input.className = "form-control";
    input.placeholder = Object.keys(mapeoNombres)[i];
    formulario.appendChild(input);
  }

  const contenedor = document.getElementById("formulario");
  contenedor.appendChild(formulario);

  const btnSubir = document.getElementById("subir");
  btnSubir.onclick = añadirFila;

  return listaDatos;
}

function eliminarElemento(idPadre, idHijo) {
  const padre = document.getElementById(idPadre);
  const hijo = document.getElementById(idHijo);
  padre.removeChild(hijo);
}

/* Respuesta a eventos */

function ordenarElementos(elemento) {
  let columna = elemento.target.innerHTML;
  let criterio = mapeoNombres[columna];

  if (ordAscendente[criterio] === false) {
    listaDatos.sort((a, b) =>
      a[criterio] > b[criterio] ? 1 : b[criterio] > a[criterio] ? -1 : 0,
    );
    ordAscendente[criterio] = true;
  } else {
    listaDatos.sort((a, b) =>
      a[criterio] < b[criterio] ? 1 : b[criterio] < a[criterio] ? -1 : 0,
    );
    ordAscendente[criterio] = false;
  }

  let atributos = ["last_name", "first_name", "email", "photo"];

  limpiarTabla();
  let nuevaLista = crearTablaDatos(listaDatos, atributos);
  listaDatos = [...nuevaLista];
}

function cambiarColor(elemento, color) {
  elemento.target.parentNode.style.backgroundColor = color;
}

function eliminarFila(elemento) {
  let fila = document.getElementById(elemento.target.parentNode.parentNode.id);
  let tblBody = document.querySelector("tbody");
  tblBody.removeChild(fila);
}

function actualizarFila(elemento) {
  let identificador = elemento.target.parentNode.parentNode.id;
}

function limpiarTabla() {
  if (
    confirm("¿Estás seguro que quieres eliminar todos los datos en la tabla?")
  ) {
    console.log("El usuario ha confirmado la eliminación de los datos.");

    let viejoTbody = document.querySelector("tbody");
    let nuevoTbody = document.createElement("tbody");

    viejoTbody.parentNode.replaceChild(nuevoTbody, viejoTbody);
  } else {
    console.log("El usuario ha rechazado la eliminación de los datos.");
  }
}

function añadirFila(elemento) {
  let tblBody = document.getElementById("tblBody");
  let fila = document.createElement("tr");

  let nuevoElemento = {};

  for (let i = 0; i < 4; i++) {
    let valor = document.getElementById("input-" + i).value;
    document.getElementById("input-" + i).value = "";
    let columna = document.createElement("td");
    let texto = document.createTextNode(valor);
    columna.appendChild(texto);
    fila.appendChild(columna);
  }

  tblBody.appendChild(fila);
}
