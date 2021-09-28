ruta = "archivo.json";

fetch(ruta)
  .then((res) => res.json())
  .then((datos) => {
    console.log(datos);
    let encabezados = ["Last Name", "First Name", "Email", "Photo"];
    let listaDatos = crearTablaDatos(datos, encabezados);
    console.log(listaDatos);

    const encabezado = document.querySelectorAll("th");
    for (let i = 0; i < encabezado.length; i++) {
      encabezado[i].onclick = ordenarElementos;
    }

    function ordenarElementos(element) {
      criterio = element.target.innerHTML;

      listaDatos.sort(function (a, b) {
        return b[criterio] - a[criterio];
      });
    }
  });

function crearTablaDatos(datos, encabezados) {
  console.log(encabezados);
  const contenedor = document.getElementById("contenedor");
  contenedor.style.margin = "1rem";

  let listaDatos = [];

  // Crear secciones de la tabla
  const tabla = document.createElement("table");
  const tblHead = document.createElement("thead");
  const tblBody = document.createElement("tbody");

  tabla.style.margin = "2rem";
  tabla.className = "table table-striped";

  // Encabezados de la tabla

  for (let i = 0; encabezados.length; i++) {
    let nuevoEncabezado = document.createElement("th");
    let texto = document.createTextNode(encabezados[i]);
    nuevoEncabezado.append(texto);
    tblHead.appendChild(nuevoEncabezado);
  }

  for (let i = 0; i < datos.length; i++) {
    actual = datos[i];

    // Crear una nueva fila de la tabla
    let fila = document.createElement("tr");

    //Completar las columnas y añadirlas a la fila
    let columnaLN = document.createElement("td");
    let textoLN = document.createTextNode(actual.last_name);
    columnaLN.appendChild(textoLN);
    fila.appendChild(columnaLN);

    let columnaFN = document.createElement("td");
    let textoFN = document.createTextNode(actual.first_name);
    columnaFN.appendChild(textoFN);
    fila.appendChild(columnaFN);

    let columnaEmail = document.createElement("td");
    let textoEmail = document.createTextNode(actual.email);
    columnaEmail.appendChild(textoEmail);
    fila.appendChild(columnaEmail);

    let columnaImagen = document.createElement("td");
    let imagen = document.createElement("img");
    imagen.src = actual.photo;
    columnaImagen.appendChild(imagen);
    fila.appendChild(columnaImagen);

    // Incluir la fila en la tabla
    tblBody.appendChild(fila);

    //Adicionar el objeto a la lista
    nuevoElemento = {
      "Last Name": actual.last_name,
      "First Name": actual.first_name,
      Email: actual.email,
      Photo: actual.photo,
    };
    listaDatos.push(nuevoElemento);
  }

  // Añadir las secciones de la tabla
  tabla.appendChild(tblHead);
  tabla.appendChild(tblBody);

  // Adicionar la tabla
  contenedor.appendChild(tabla);

  return listaDatos;
}
