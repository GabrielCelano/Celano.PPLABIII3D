const anuncioStorage = localStorage.getItem("anuncioStorage")
  ? JSON.parse(localStorage.getItem("anuncioStorage"))
  : [];
const container = document.querySelector(".table-container");
crearAnuncios(anuncioStorage);

function crearAnuncios(vec) {
  vec.forEach((element) => {
    container.appendChild(crearAnuncio(element));
  });
}

function crearAnuncio(elemento) {
  const fieldset = document.createElement("div");
  fieldset.setAttribute("class", "cajaAnuncio");
  fieldset.appendChild(crearCartel(elemento));
  return fieldset;
}

function crearCartel(elemento) {
  const div = document.createElement("div"),
    h1 = document.createElement("h1"),
    h5 = document.createElement("h5"),
    h4 = document.createElement("h4"),
    p1 = document.createElement("p"),
    p2 = document.createElement("p"),
    p3 = document.createElement("p"),
    p4 = document.createElement("p"),
    img1 = document.createElement("img"),
    img2 = document.createElement("img"),
    img3 = document.createElement("img"),
    img4 = document.createElement("img");

  h1.innerText = elemento.titulo;
  div.appendChild(h1);

  h5.innerText = elemento.descripcion;
  div.appendChild(h5);
  h4.innerText = "$ " + elemento.precio;
  div.appendChild(h4);

  img1.setAttribute("src", "../img/pie.svg");
  img1.setAttribute("class", "svg");
  div.appendChild(img1);
  p1.innerText = elemento.raza;
  p1.setAttribute("class", "info");
  div.appendChild(p1);

  img2.setAttribute("src", "../img/gato.svg");
  img2.setAttribute("class", "svg");
  div.appendChild(img2);
  p2.innerText = elemento.fecha_de_nacimiento;
  p2.setAttribute("class", "info");
  div.appendChild(p2);

  img3.setAttribute("src", "../img/vacuna.svg");
  img3.setAttribute("class", "svg");
  div.appendChild(img3);
  p3.innerText = elemento.vacuna;
  p3.setAttribute("class", "info");
  div.appendChild(p3);

  img4.setAttribute("src", "../img/bisturi.svg");
  img4.setAttribute("class", "svg");
  div.appendChild(img4);
  p4.innerText = elemento.castrado;
  p4.setAttribute("class", "info");
  div.appendChild(p4);
  return div;
}
