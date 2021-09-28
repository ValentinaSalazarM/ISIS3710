const URL =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(URL)
  .then((res) => res.json())
  .then((res) => {
    crearContenido(res);
  });

let listas_categorias = [];
let nombres_categorias = [];

function crearContenido(datos) {
  const barra_categorias = document.querySelector("ul");
  for (let i = 0; i < datos.length; i++) {
    let actual = datos[i];
    let categoria = actual.name;

    let nuevo_list_item = document.createElement("li");
    let nuevo_a = document.createElement("a");
    let texto_nuevo = document.createTextNode(categoria);

    nuevo_a.className = "nav-link";
    nuevo_a.id = categoria;
    nuevo_list_item.className = "nav-item";

    nuevo_a.appendChild(texto_nuevo);
    nuevo_a.onclick = actualizarContenido;

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
}

function actualizarContenido(elemento) {
  let categoria = elemento.target.id;

  let indice = nombres_categorias.indexOf(categoria);
  let productos_categoria = listas_categorias[indice];

  const contenedor_productos = document.getElementById("productos");

  let card = document.createElement("div");
  card.className = "card";
  card.style.width = "18rem";

  for (let i = 0; i < productos_categoria.length; i++) {
    let producto = productos_categoria[i];

    let img = document.createElement("img");
    img.className = "card-img-top";
    img.src = producto.image;

    let card_body = document.createElement("div");
    card_body.className = "card-body";

    let card_title = document.createElement("h5");
    let card_title_texto = document.createTextNode(producto.name);
    card_title.appendChild(card_title_texto);
    card_title.className = "card-title";

    let card_text = document.createElement("p");
    let card_texto = document.createTextNode(producto.description);
    card_text.appendChild(card_texto);
    card_text.className = "card-text";

    let card_price = document.createElement("p");
    let card_price_texto = document.createTextNode(producto.price);
    card_price.appendChild(card_price_texto);
    card_price.className = "card-text";
    card_price.style.fontWeight = "bold";

    let boton = document.createElement("a");
    let boton_texto = document.createTextNode("Add to car");
    boton.appendChild(boton_texto);
    boton.className = "btn btn-dark";
    boton.onclick = añadirItem;

    card.appendChild(img);
    card.appendChild(card_body);
    card_body.appendChild(card_title);
    card_body.appendChild(card_text);
    card_body.appendChild(boton);
  }
  contenedor_productos.appendChild(card);
}

function añadirItem() {}
