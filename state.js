"use strict";

import {
  ReStart,
  Start,
  HandleClick,
  OpenCloseMod,
  time,
  intentos,
} from "./js.js";

const localStorageState = window.localStorage.getItem("storage");

const state = {
  usuarios: localStorageState ? JSON.parse(localStorageState).usuarios : [],
  dark: localStorageState ? JSON.parse(localStorageState).dark : true,
};

const ulPuntuacionesElement = document.querySelector(".ul__puntuaciones");
// cambia el valor de dark tema
const temaDarkElement = document.querySelector("#tema");
const bodyDarkElement = document.querySelector(".bodydark");
const gameOverDarkElement = document.querySelector(".overdark");
const modalDarkElement = document.querySelector(".modaldark");
const articleDarkElement = document.querySelector(".articledark");
const pDarkElement = document.querySelector(".pdark");

const toggleThemeDark = () => {
  state.dark = !state.dark;
  saveState();
};

temaDarkElement.addEventListener("click", (e) => {
  e.stopPropagation();
  ulPuntuacionesElement.classList.toggle("darkTema");
  temaDarkElement.classList.toggle("darkTema");
  bodyDarkElement.classList.toggle("darkTema");
  gameOverDarkElement.classList.toggle("darkTema");
  modalDarkElement.classList.toggle("darkTema");
  articleDarkElement.classList.toggle("darkTema");
  pDarkElement.classList.toggle("darkTema");
  toggleThemeDark();
});

if (state.dark) {
  ulPuntuacionesElement.classList.add("darkTema");
  temaDarkElement.classList.add("darkTema");
  bodyDarkElement.classList.add("darkTema");
  gameOverDarkElement.classList.add("darkTema");
  modalDarkElement.classList.add("darkTema");
  articleDarkElement.classList.add("darkTema");
  pDarkElement.classList.add("darkTema");
}

for (const usuario of state.usuarios) {
  usuario.ultima = false;
}

const saveState = () => {
  const jsonState = JSON.stringify(state);
  window.localStorage.setItem("storage", jsonState);
};

const render = () => {
  const fragmentUsuarios = document.createDocumentFragment();

  const ordenado = state.usuarios.sort((a, b) => {
    return a.puntuacion - b.puntuacion;
  });

  for (const usuario of ordenado) {
    const liElement = document.createElement("li");
    const h6Element = document.createElement("h6");
    const span1Element = document.createElement("span");
    const span2Element = document.createElement("span");
    const span3Element = document.createElement("span");

    liElement.append(h6Element);
    liElement.append(span2Element);
    liElement.append(span3Element);
    liElement.append(span1Element);

    h6Element.textContent = usuario.nombre.toUpperCase();
    if (h6Element.textContent === nombreUsuario.toUpperCase()) {
      h6Element.parentElement.classList.add("li__partida");
    }

    console.log(state.usuarios);
    console.log(usuario.ultima);

    if (usuario.ultima) {
      liElement.classList.add("li__ultima");
    } else {
      liElement.classList.remove("li__ultima");
    }
    usuario.ultima = false;

    span1Element.textContent = usuario.puntuacion;
    span2Element.textContent = usuario.intentos;

    const minuto = parseInt(usuario.tiempo / 60);
    const segundos =
      usuario.tiempo % 60 < 10
        ? "0" + (usuario.tiempo % 60)
        : usuario.tiempo % 60;
    const minutos = `${minuto}:${segundos}`;
    span3Element.textContent = minutos;

    fragmentUsuarios.prepend(liElement);
  }
  //limpio tabla puntuaciones
  ulPuntuacionesElement.innerHTML = "";
  //añado titulo a los li
  const liTituloElement = document.createElement("li");
  const h6TituloElement = document.createElement("span");
  const span1TituloElement = document.createElement("span");
  const span2TituloElement = document.createElement("span");
  const span3TituloElement = document.createElement("span");
  h6TituloElement.textContent = "Nombre";
  span1TituloElement.textContent = "Intentos";
  span2TituloElement.textContent = "Tiempo";
  span3TituloElement.textContent = "Puntos";
  liTituloElement.append(h6TituloElement);
  liTituloElement.append(span1TituloElement);
  liTituloElement.append(span2TituloElement);
  liTituloElement.append(span3TituloElement);
  //añado todos los usuarios al ul
  ulPuntuacionesElement.append(liTituloElement);
  ulPuntuacionesElement.append(fragmentUsuarios);
};

//añade un usuario
const addUser = (usuarioNombre) => {
  const nombreUsuario = usuarioNombre;
  return nombreUsuario;
  // const datoUsuario = {
  //   nombre: usuarioNombre,
  //   puntuacion: 0,
  // };
  // state.usuarios.push(datoUsuario);
  // saveState();
};

const formPrincipalElement = document.forms.form__principal;

let nombreUsuario;

const funcionSubmit = (evento) => {
  evento.preventDefault();
  const inputUsuarioElement = formPrincipalElement.elements.userName;
  const nombreUsuarioElement = inputUsuarioElement.value.trim();
  if (nombreUsuarioElement !== "") {
    nombreUsuario = addUser(nombreUsuarioElement);
    // render();
    Start();
    OpenCloseMod();
    return nombreUsuario;
  } else {
    alert("Nombre no valido");
  }
  // inputUsuarioElement.value = "";
  //se ha quitado el setattribute porqué no dejaba escribir despues de el alert
  //inputUsuarioElement.setAttribute("readonly", "");
};

formPrincipalElement.addEventListener("submit", funcionSubmit);

//añade la puntuacion

const addPuntos = (puntosUsuario) => {
  const datoUsuario = {
    nombre: nombreUsuario,
    puntuacion: puntosUsuario,
    intentos: intentos,
    tiempo: time,
    ultima: true,
  };
  state.usuarios.push(datoUsuario);
  saveState();
};

//recarga de pagina web

const btnHomeElement = document.querySelector(".btn__home");
const btnFalloElement = document.querySelector(".btn__fallo");

const funcionHome = (evento) => {
  console.log("recarga de web");
  evento.preventDefault();
  location.reload();
};

btnHomeElement.addEventListener("click", funcionHome);
btnFalloElement.addEventListener("click", funcionHome);

// console.log(state.usuarios);

export { addPuntos, render, nombreUsuario, state };
