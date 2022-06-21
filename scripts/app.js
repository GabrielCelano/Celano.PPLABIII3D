import Mascota from "./anuncio_animal.js";
import crearTabla from "./tabla.js";

const anuncioStorage = localStorage.getItem("anuncioStorage")
  ? JSON.parse(localStorage.getItem("anuncioStorage"))
  : [];
const $form = document.forms[0];
const $btnGuardar = document.getElementById("btnGuardar");

actualizarTabla(anuncioStorage);

window.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validarAlta()) {
    alertaCustom("Guardando...");
    const id = $form.id.value,
      titulo = $form.titulo.value,
      descripcion = $form.descripcion.value,
      precio = $form.precio.value,
      raza = $form.raza.value,
      fechaNacimiento = $form.fecha.value,
      animal = $form.radio.value,
      vacuna = $form.vacunas.value,
      castrado = $form.castrado.value;

    const anuncio = new Mascota(
      id,
      titulo,
      descripcion,
      precio,
      animal,
      raza,
      fechaNacimiento,
      vacuna,
      castrado
    );
    if ($btnGuardar.value === "btnGuardar") {
      anuncio.id = Date.now();
      agregoAnuncio(anuncio);
    } else {
      modificarAnuncio(anuncio);
    }
  }
});

function alertaCustom(mensaje){
  const alert = document.getElementById("alertaCustom");
  alert.removeAttribute("style");
  alert.innerText = mensaje;
}

function eliminarAlertaCustom(){
  const alert = document.getElementById("alertaCustom");
  alert.setAttribute("style", "display: none;");
}

function agregoAnuncio(anuncio) {
  anuncioStorage.push(anuncio);
  localStorage.setItem("anuncioStorage", JSON.stringify(anuncioStorage));
  actualizarTabla(anuncioStorage);
}

window.addEventListener("click", (e) => {
  if (e.target.matches("tr td")) {
    $btnGuardar.value = "btnModificar";
    llenarFormulario(buscarAnuncio(e));
    mostrarBotones();
  }
});

function buscarAnuncio(e) {
  const id = parseInt(e.target.parentElement.dataset.id);
  let anuncio;
  anuncioStorage.forEach((element) => {
    for (const key in element) {
      if (element[key] == id) {
        anuncio = element;
      }
    }
  });
  return anuncio;
}

function llenarFormulario(anuncio) {
  $form.id.value = anuncio.id;
  $form.titulo.value = anuncio.titulo;
  $form.descripcion.value = anuncio.descripcion;
  $form.precio.value = anuncio.precio;
  $form.raza.value = anuncio.raza;
  $form.fecha.value = anuncio.fecha_de_nacimiento;
  $form.radio.value = anuncio.animal;
  $form.vacunas.value = anuncio.vacuna;
  if(anuncio.castrado === "si"){
    $form.castrado.checked = true;
  }else{
    $form.castrado.checked = false;
  }
}

function modificarAnuncio(anuncio) {
  alertaCustom("Modificando...");
  anuncioStorage.forEach((element) => {
    for (const key in element) {
      if (element[key] == anuncio.id) {
        element.titulo = $form.titulo.value;
        element.descripcion = $form.descripcion.value;
        element.precio = $form.precio.value;
        element.raza = $form.raza.value;
        element.fecha_de_nacimiento = $form.fecha.value;
        element.animal = $form.radio.value;
        element.vacuna = $form.vacunas.value;
        element.castrado = $form.castrado.value;
      }
    }
  });
  localStorage.clear();
  localStorage.setItem("anuncioStorage", JSON.stringify(anuncioStorage));
  actualizarTabla(anuncioStorage);
}

window.addEventListener("load", () => {
  document
    .getElementById("btnCancelar")
    .addEventListener("click", ocultarBotones);
  document
    .getElementById("btnEliminar")
    .addEventListener("click", eliminarAnuncio);
    document.getElementById("checkBox").addEventListener("click", verificarCheckbox);
});

function verificarCheckbox(){
  const checkBox = document.getElementById("checkBox");
  if(checkBox.checked == true){
    checkBox.setAttribute("value", "si");
  }
  else{
    checkBox.setAttribute("value", "no");
  }
}

function eliminarAnuncio() {
  alertaCustom("Eliminando...");
  const id = parseInt($form.id.value);
  let indice = anuncioStorage.findIndex((anuncio) => {
    return anuncio.id == id;
  });
  anuncioStorage.splice(indice, 1);
  localStorage.setItem("anuncioStorage", JSON.stringify(anuncioStorage));
  actualizarTabla(anuncioStorage);
}

function ocultarBotones() {
  $form.reset();
  document.getElementById("btnEliminar").setAttribute("type", "hidden");
  document.getElementById("btnCancelar").setAttribute("type", "hidden");
  $form.id.value = "";
  $btnGuardar.value = "btnGuardar";
}

function mostrarBotones() {
  document.getElementById("btnEliminar").setAttribute("type", "button");
  document.getElementById("btnCancelar").setAttribute("type", "button");
}

//validar si no ingresa numeros y letras
function validarString(element) {
  if (element.value.length === 0 || !isNaN(element.value)) {
    alert("Solo ingresar letras! ");
    element.focus();
  } else {
    return 1;
  }
}

function validarAlta() {
  if (
    validarString($form.titulo) &&
    validarString($form.descripcion) &&
    validarString($form.raza)
  ) {
    return 1;
  }
  return 0;
}

function actualizarTabla(lista) {
  const spin = document.getElementById("spin");
  spin.removeAttribute("style", "");
  setTimeout(() => {
    const container = document.querySelector(".table-container");
    while (container.hasChildNodes()) {
      container.removeChild(container.firstElementChild);
    }
    if (lista) {
      container.appendChild(crearTabla(anuncioStorage));
    }
    $form.reset();
    spin.setAttribute("style", "visibility: hidden;");
    eliminarAlertaCustom();
  }, 3000);
}
