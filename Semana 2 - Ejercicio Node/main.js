const axios = require("axios");

const http = require("http");

const fs = require("fs");

let promesaProveedores = axios.get(
  "https://gist.githubusercontent.com/josejbocanegra/d3b26f97573a823a9d0df4ec68fef45f/raw/66440575649e007a9770bcd480badcbbc6a41ba7/proveedores.json"
);
let promesaClientes = axios.get(
  "https://gist.githubusercontent.com/josejbocanegra/986182ce2dd3e6246adcf960f9cda061/raw/f013c156f37c34117c0d4ba9779b15d427fb8dcd/clientes.json"
);

function escribirDatos(json, tipo) {
  let html = fs.readFileSync("index.html", "utf-8");

  if (tipo === "proveedores") {
    html = html
      .replace("Listado de clientes", "Listado de proveedores")
      .replace("ID Cliente", "ID Proveedor");
  } else {
    html = html
      .replace("Listado de proveedores", "Listado de clientes")
      .replace("ID Proveedor", "ID Cliente");
  }
  tbody = html.indexOf("<tbody>");
  cierreTbody = html.lastIndexOf("</tbody>");

  let registros = "\n ";
  let id = tipo === "proveedores" ? "idproveedor" : "idCliente";
  let compania = tipo === "proveedores" ? "nombrecompania" : "NombreCompania";
  let contacto = tipo === "proveedores" ? "nombrecontacto" : "NombreContacto";

  for (let i = 0; i < json.length; i++) {
    let actual = json[i];
    registros += "            <tr> \n";
    registros += '                <th scope="row"> ' + actual[id] + " </th> \n";

    registros += "                <td> " + actual[compania] + " </td> \n";
    registros += "                <td> " + actual[contacto] + " </td> \n";
    registros += "            </tr> \n";
  }

  html = html.substr(0, tbody + 7) + registros + html.substr(cierreTbody);

  return html;
}

Promise.all([promesaProveedores, promesaClientes])
  .then(function (respuesta) {
    http
      .createServer((req, res) => {
        if (req.url === "/api/proveedores") {
          let html = escribirDatos(respuesta[0].data, "proveedores");
          console.log(html);
          res.writeHeader(200, { "Content-Type": "text/html" });
          res.write(html);
          res.end();
        }
        if (req.url === "/api/clientes") {
          let html = escribirDatos(respuesta[1].data, "clientes");
          res.writeHeader(200, { "Content-Type": "text/html" });
          res.write(html);
          res.end();
        }
      })
      .listen(8081);
  })
  .catch(function (error) {
    console.log(`Error: ${error}`);
  });
