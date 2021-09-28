ruta = "archivo.json";

let listaDatos = [];
let ordAscendente = { "Last Name": false, "First Name": false, "Email": false, "Photo": false };
const mapeoNombres = { "Last Name": "last_name", "First Name": "first_name", "Email": "email", "Photo": "photo" };

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

function eliminarElemento(idPadre, idHijo) {
  const padre = document.getElementById(idPadre);
  const hijo = document.getElementById(idHijo);
  padre.removeChild(hijo);
}

function insertarDatos(datos, atributos) {

  let listaDatos = [];
  let table = document.querySelector("table");
  let tblBody = document.createElement("tbody");

  for (let i = 0; i < datos.length; i++) {

    actual = datos[i];
    let fila = document.createElement("tr");

    fila.id = "fila-" + i;
    fila.onmouseup = cambiarColor;

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
    botonEliminar.style.display = 'block';
    botonEliminar.style.margin = "0.75rem";
    botonEliminar.appendChild(texto);
    botonEliminar.onclick = eliminarFila;


    let botonActualizar = document.createElement("button");
    texto = document.createTextNode("Actualizar fila");
    botonActualizar.className = "btn btn-primary";
    botonActualizar.style.display = 'block';
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
  return listaDatos;
}


function ordenarElementos(elemento) {
  let columna = elemento.target.innerHTML;
  let criterio = mapeoNombres[columna];

  if (ordAscendente[criterio] === false) {
    listaDatos.sort((a, b) => (a[criterio] > b[criterio]) ? 1 : ((b[criterio] > a[criterio]) ? -1 : 0));
    ordAscendente[criterio] = true;
  }
  else {
    listaDatos.sort((a, b) => (a[criterio] < b[criterio]) ? 1 : ((b[criterio] < a[criterio]) ? -1 : 0));
    ordAscendente[criterio] = false;
  }

  let atributos = ["last_name", "first_name", "email", "photo"];

  eliminarElemento("table", "tbody");
  let nuevaLista = crearTablaDatos(listaDatos, atributos);
  listaDatos = [...nuevaLista];
}

/* Respuesta a eventos */

function cambiarColor(elemento) {
  elemento.target.parentNode.style.backgroundColor = "cornflowerblue";
}


function eliminarFila(elemento) {
  let identificador = elemento.target.parentNode.parentNode.id;
  console.log(elemento.target.parentNode.parentNode)
  let fila = document.getElementById(identificador);

  let tblBody = document.querySelector("tbody");
  console.log(fila, tblBody)
  tblBody.removeChild(fila);

}

function actualizarFila(elemento) {
  let identificador = elemento.target.id;
  console.log(identificador)
  console.log(tabla)
  eliminarElemento("tabla-principal", identificador);
}