const URL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(URL)
  .then((res) => res.json())
  .then((res) => {
    cargarContenido(res);
    actualizarContenido(undefined, "Burguers");
  });

let listas_categorias = [];
let nombres_categorias = [];
let items_carrito = [];

/* Funciones genéricas que controlan la información desplegada */

function cargarContenido(datos) {
  const carrito_compras = document.getElementById("carro-compra");
  carrito_compras.onclick = resumenPedido;

  const barra_categorias = document.querySelector("ul");
  for (let i = 0; i < datos.length; i++) {
    let actual = datos[i];
    let categoria = actual.name;

    let nuevo_list_item = document.createElement("li");
    let nuevo_a = document.createElement("a");
    let texto_nuevo = document.createTextNode(categoria);

    nuevo_a.className = "nav-link active";
    nuevo_a.id = categoria;
    nuevo_list_item.className = "nav-item";

    nuevo_a.appendChild(texto_nuevo);
    nuevo_a.onclick = actualizarContenido;
    nuevo_a.setAttribute("href", "#");

    nuevo_list_item.appendChild(nuevo_a);

    barra_categorias.appendChild(nuevo_list_item);

    nombres_categorias.push(categoria);

    nueva_lista_categoria = [];

    let listas_productos = actual.products;
    for (let j = 0; j < listas_productos.length; j++) {
      let producto_actual = listas_productos[j];
      nueva_lista_categoria.push(producto_actual);
    }
    listas_categorias.push(nueva_lista_categoria);
  }

  const boton_cancelar_orden = document.getElementById("boton-modal-yes");
  boton_cancelar_orden.onclick = cancelarOrden;
}

function actualizarContenido(elemento, pCategoria) {
  eliminarContenido();

  let categoria;
  if (!elemento) {
    categoria = pCategoria;
  } else {
    categoria = elemento.target.id;
  }

  let indice = nombres_categorias.indexOf(categoria);
  let productos_categoria = listas_categorias[indice];

  const titulo_seccion = document.getElementById("titulo_seccion");
  titulo_seccion.innerHTML = categoria;

  const contenedor_productos = document.getElementById("contedor_productos");

  for (let j = 0; j < productos_categoria.length / 4; j++) {
    let fila = document.createElement("div");
    fila.className = "row";

    for (let i = j * 4; i < j * 4 + 4; i++) {
      let producto = productos_categoria[i];

      if (!producto) {
        break;
      }

      let columna = document.createElement("div");
      columna.className = "col-3 mb-3 d-flex align-items-stretch";

      let card = document.createElement("div");
      card.className = "card";
      card.style.width = "18rem";

      let img = document.createElement("img");
      img.className = "card-img-top";
      img.src = producto.image;

      let card_body = document.createElement("div");
      card_body.className = "card-body d-flex flex-column";

      let card_title = document.createElement("h5");
      let card_title_texto = document.createTextNode(producto.name);
      card_title.appendChild(card_title_texto);
      card_title.className = "card-title";

      let card_text = document.createElement("p");
      let card_texto = document.createTextNode(producto.description);
      card_text.appendChild(card_texto);
      card_text.className = "card-text";

      let card_price = document.createElement("p");
      let card_price_texto = document.createTextNode("$" + producto.price);
      card_price.appendChild(card_price_texto);
      card_price.className = "card-text";
      card_price.style.fontWeight = "bold";

      let boton = document.createElement("a");
      let boton_texto = document.createTextNode("Add to car");
      boton.appendChild(boton_texto);
      boton.className = "btn btn-dark mt-auto align-self-start";
      boton.id = producto.name + " + " + categoria;
      boton.onclick = añadirItem;

      card_body.appendChild(card_title);
      card_body.appendChild(card_text);
      card_body.appendChild(card_price);
      card_body.appendChild(boton);

      card.appendChild(img);
      card.appendChild(card_body);

      columna.appendChild(card);
      fila.appendChild(columna);
    }
    contenedor_productos.appendChild(fila);
  }
}

function eliminarContenido() {
  const nodo_padre = document.getElementById("contedor_productos");
  while (nodo_padre.firstChild) {
    nodo_padre.removeChild(nodo_padre.lastChild);
  }
}

/* Funciones para manejar eventos de botones */

function añadirItem(elemento) {
  let arreglo_cadena = elemento.target.id.split(" + ");
  let nombre_producto = arreglo_cadena[0];
  let categoria = arreglo_cadena[1];
  let indice_categoria = nombres_categorias.indexOf(categoria);
  let productos_categoria = listas_categorias[indice_categoria];

  let producto;

  for (let i = 0; i < productos_categoria.length; i++) {
    let nombre = productos_categoria[i].name;
    if (nombre === nombre_producto) {
      producto = productos_categoria[i];
      break;
    }
  }

  let producto_agregado = false;
  for (let j = 0; j < items_carrito.length; j++) {
    actual = items_carrito[j];
    if (actual.description === nombre_producto) {
      actual.quantity += 1;
      producto_agregado = true;
      break;
    }
  }

  if (!producto_agregado) {
    let nuevo_producto = {
      item: items_carrito.length + 1,
      quantity: 1,
      description: producto.name,
      unitPrice: parseFloat(producto.price),
    };
    items_carrito.push(nuevo_producto);
  }

  const contador = document.getElementById("contador-items");
  let contadorActual = parseInt(contador.innerText.split(" ")[0]);
  contador.innerText = contadorActual + 1 + " items";
}

function resumenPedido() {
  eliminarContenido();
  const titulo_seccion = document.getElementById("titulo_seccion");
  titulo_seccion.innerHTML = "Order Detail";

  const contenedor = document.getElementById("contedor_productos");
  const tabla = document.createElement("table");
  tabla.className = "table table-striped";

  let encabezados = [
    "Item",
    "Qty.",
    "Description",
    "Unit Price",
    "Amount",
    "Modify",
  ];
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");

  for (let i = 0; i < encabezados.length; i++) {
    let thEncabezado = document.createElement("th");
    let texto_encabezado = document.createTextNode(encabezados[i]);
    thEncabezado.appendChild(texto_encabezado);
    tr.appendChild(thEncabezado);
  }

  thead.appendChild(tr);
  tabla.appendChild(thead);

  const tblBody = document.createElement("tbody");
  let precio_total = 0;

  for (let i = 0; i < items_carrito.length; i++) {
    let fila = document.createElement("tr");
    let actual = items_carrito[i];

    let propiedades_actual = [
      actual.item,
      actual.quantity,
      actual.description,
      actual.unitPrice.toFixed(2),
      (actual.quantity * actual.unitPrice).toFixed(2),
    ];

    for (let j = 0; j < propiedades_actual.length; j++) {
      let columna = document.createElement("td");
      let texto = document.createTextNode(propiedades_actual[j]);
      columna.appendChild(texto);
      fila.appendChild(columna);
    }

    let columna_botones = document.createElement("td");

    let btn_agregar = document.createElement("button");
    let btn_texto = document.createTextNode("+");
    btn_agregar.className = "tabla-btn btn btn-secondary";
    btn_agregar.id = "btnAgregar:" + actual.description;
    btn_agregar.appendChild(btn_texto);
    btn_agregar.onclick = modificarCantidadItem;

    let btn_eliminar = document.createElement("button");
    btn_texto = document.createTextNode("-");
    btn_eliminar.className = "tabla-btn btn btn-secondary";
    btn_eliminar.id = "btnEliminar:" + actual.description;
    btn_eliminar.appendChild(btn_texto);
    btn_eliminar.onclick = modificarCantidadItem;

    columna_botones.appendChild(btn_agregar);
    columna_botones.appendChild(btn_eliminar);

    fila.appendChild(columna_botones);
    tblBody.appendChild(fila);

    precio_total += actual.quantity * actual.unitPrice;
  }
  tabla.appendChild(tblBody);
  contenedor.appendChild(tabla);

  const contenedor_botones = document.createElement("div");
  contenedor_botones.className = "row";

  const contenedor_precio = document.createElement("div");
  contenedor_precio.className = "col-9";
  const campo_precio_total = document.createElement("h6");
  campo_precio_total.innerHTML = "Total: $" + precio_total.toFixed(2);
  contenedor_precio.appendChild(campo_precio_total);

  const contenedor_btn_cancelar = document.createElement("div");
  contenedor_btn_cancelar.className = "col-1";
  let btn_cancelar = document.createElement("button");
  let btn_texto = document.createTextNode("Cancel");
  btn_cancelar.className = "btn btn-danger";
  btn_cancelar.id = "btn-cancelar";
  btn_cancelar.appendChild(btn_texto);
  btn_cancelar.setAttribute("type", "button");
  btn_cancelar.setAttribute("data-toggle", "modal");
  btn_cancelar.setAttribute("data-target", "#resumen-compra");
  contenedor_btn_cancelar.appendChild(btn_cancelar);

  const contenedor_btn_confirmar = document.createElement("div");
  contenedor_btn_confirmar.className = "col-2";
  let btn_confirmar = document.createElement("button");
  btn_texto = document.createTextNode("Confirm order");
  btn_confirmar.className = "btn btn-outline-dark";
  btn_confirmar.id = "btn-confirmar";
  btn_confirmar.onclick = enviarPedido;
  btn_confirmar.appendChild(btn_texto);
  contenedor_btn_confirmar.append(btn_confirmar);

  contenedor_botones.appendChild(contenedor_precio);
  contenedor_botones.appendChild(contenedor_btn_cancelar);
  contenedor_botones.append(contenedor_btn_confirmar);

  contenedor.appendChild(contenedor_botones);
}

function modificarCantidadItem(elemento) {
  let arreglo_cadena = elemento.target.id.split(":");
  let tipo_boton = arreglo_cadena[0];
  let nombre_producto = arreglo_cadena[1];

  for (let j = 0; j < items_carrito.length; j++) {
    actual = items_carrito[j];
    if (actual.description === nombre_producto) {
      if (tipo_boton === "btnAgregar") {
        actual.quantity += 1;
      } else {
        actual.quantity -= 1;
      }
      break;
    }
  }
  resumenPedido();
}

function enviarPedido() {
  console.log(items_carrito);
}

function cancelarOrden() {
  const contador = document.getElementById("contador-items");
  contador.innerText = "0 items";
  items_carrito = [];
  resumenPedido();
}
