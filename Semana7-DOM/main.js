const URL = "https://gist.githubusercontent.com/josejbocanegra/b1873c6b7e732144355bb1627b6895ed/raw/d91df4c8093c23c41dce6292d5c1ffce0f01a68b/newDatalog.json"


fetch(URL).then (res => res.json()).then (res => {

    console.log(res);

    // Contenedor donde se dispondrá la tabla
    const container = document.getElementById ("container");
    container.style.margin = "1rem";

    // Crear secciones de la tabla
    const tabla   = document.createElement("table");
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

    // Completar la tabla
    for (let i = 0; i < res.length; i++) {

        // Obtener el elemento actual de la lista
        let actual = res[i];


        // Crea las filas de la tabla
        let fila = document.createElement("tr");

        let columnaID = document.createElement("th");
        let textoID = document.createTextNode((i + 1) + "");
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
        if (actual.squirrel === true)
        {
            fila.className = "table-danger";
        }
        
        tblBody.appendChild(fila);
    }

    // Añadir las secciones de la tabla
    tabla.appendChild(tblHead);
    tabla.appendChild(tblBody);

    // Adicionar dinámicamente la tabla
    container.appendChild(tabla);

})