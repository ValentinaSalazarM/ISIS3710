const URL =
  "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json";

fetch(URL)
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
    let [positivos, negativos] = crearTablaEventos(res);
    crearTablaCorrelacion(res, positivos, negativos);
  });

function crearTablaEventos(res) {
  // Contenedor donde se dispondrá la tabla
  const container = document.getElementById("container");
  container.style.margin = "1rem";

  // Crear secciones de la tabla
  const tabla = document.createElement("table");
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");

  tabla.className = "table";

  // Encabezados de la tabla

  let encabezadoID = document.createElement("th");
  let encabezadoIDTexto = document.createTextNode("#");
  encabezadoID.append(encabezadoIDTexto);
  tblHead.appendChild(encabezadoID);

  let encabezadoEventos = document.createElement("th");
  let encabezadoEventosTexto = document.createTextNode("Events");
  encabezadoEventos.append(encabezadoEventosTexto);
  tblHead.appendChild(encabezadoEventos);

  let encabezadoValor = document.createElement("th");
  let encabezadoValorTexto = document.createTextNode("Squirrel");
  encabezadoValor.append(encabezadoValorTexto);
  tblHead.appendChild(encabezadoValor);

  let positivos = 0;
  let negativos = 0;

  // Completar la tabla
  for (let i = 0; i < res.length; i++) {
    // Obtener el elemento actual de la lista
    let actual = res[i];

    // Crea las filas de la tabla
    let fila = document.createElement("tr");

    let columnaID = document.createElement("th");
    let textoID = document.createTextNode(i + 1 + "");
    columnaID.appendChild(textoID);
    fila.appendChild(columnaID);

    let columnaEventos = document.createElement("td");
    let textoEventos = document.createTextNode(actual.events);
    columnaEventos.appendChild(textoEventos);
    fila.appendChild(columnaEventos);

    let columnaValor = document.createElement("td");
    let textoValor = document.createTextNode(actual.squirrel);
    columnaValor.appendChild(textoValor);
    fila.appendChild(columnaValor);

    // Validar si la fila debe tener un fondo rojo en caso de obtener un valor true
    if (actual.squirrel === true) {
      fila.className = "table-danger";
      positivos += 1;
    } else {
      negativos += 1;
    }

    tblBody.appendChild(fila);
  }

  // Añadir las secciones de la tabla
  tabla.appendChild(tblHead);
  tabla.appendChild(tblBody);

  // Adicionar dinámicamente la tabla
  container.appendChild(tabla);

  return [positivos, negativos];
}

function crearTablaCorrelacion(res, positivos, negativos) {
  // Contenedor donde se dispondrá la tabla
  const container = document.getElementById("container-correlation");
  container.style.margin = "1rem";

  // Crear secciones de la tabla
  const tabla = document.createElement("table");
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");

  tabla.className = "table";

  // Encabezados de la tabla

  let encabezadoID = document.createElement("th");
  let encabezadoIDTexto = document.createTextNode("#");
  encabezadoID.append(encabezadoIDTexto);
  tblHead.appendChild(encabezadoID);

  let encabezadoEventos = document.createElement("th");
  let encabezadoEventosTexto = document.createTextNode("Event");
  encabezadoEventos.append(encabezadoEventosTexto);
  tblHead.appendChild(encabezadoEventos);

  let encabezadoCorrelacion = document.createElement("th");
  let encabezadoCorrelacionTexto = document.createTextNode("Correlation");
  encabezadoCorrelacion.append(encabezadoCorrelacionTexto);
  tblHead.appendChild(encabezadoCorrelacion);

  let infoCorrelacion = new Object();

  // Completar la tabla

  for (let i = 0; i < res.length; i++) {
    // Obtener el elemento actual de la lista
    let actual = res[i];
    let nuevosEventos = actual.events.toString().split(",");
    for (let j = 0; j < nuevosEventos.length; j++) {
      let evento = nuevosEventos[j];

      let tempTP = 0;
      let tempFN = 0;

      if (actual.squirrel === true) {
        tempTP += 1;
      } else {
        tempFN += 1;
      }

      if (!infoCorrelacion.hasOwnProperty(evento)) {
        infoCorrelacion[evento] = {
          "True Positive": 0,
          "False Negative": 0,
        };
      }
      infoCorrelacion[evento]["True Positive"] += tempTP;
      infoCorrelacion[evento]["False Negative"] += tempFN;
    }
  }

  let listaCorrelacion = [];
  for (let evento in infoCorrelacion) {
    let TP = infoCorrelacion[evento]["True Positive"];
    let FN = infoCorrelacion[evento]["False Negative"];

    let FP = positivos - TP;
    let TN = negativos - FN;

    let correlacion =
      (TP * TN - FP * FN) /
      Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));

    nuevoElemento = [evento, correlacion];
    listaCorrelacion.push(nuevoElemento);
  }

  listaCorrelacion.sort(function (a, b) {
    return b[1] - a[1];
  });

  console.log(listaCorrelacion);

  for (let i = 0; i < listaCorrelacion.length; i++) {
    let fila = document.createElement("tr");

    let columnaID = document.createElement("th");
    let textoID = document.createTextNode(i + "");
    columnaID.appendChild(textoID);
    fila.appendChild(columnaID);

    let columnaEvento = document.createElement("td");
    let textoEvento = document.createTextNode(listaCorrelacion[i][0]);
    columnaEvento.appendChild(textoEvento);
    fila.appendChild(columnaEvento);

    let columnaValor = document.createElement("td");
    let textoValor = document.createTextNode(listaCorrelacion[i][1]);
    columnaValor.appendChild(textoValor);
    fila.appendChild(columnaValor);

    tblBody.appendChild(fila);
  }

  // Añadir las secciones de la tabla
  tabla.appendChild(tblHead);
  tabla.appendChild(tblBody);

  // Adicionar dinámicamente la tabla
  container.appendChild(tabla);
}
