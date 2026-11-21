"use strict";

const enlacesDelIndice = document.querySelectorAll(".indice a");
const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
const botonTema = document.querySelector(".boton-tema");
const iconoClaro = document.getElementById("icon-claro");
const iconoOscuro = document.getElementById("icon-oscuro");

const preferenciaOscura = window.matchMedia("(prefers-color-scheme: dark)");

function obtenerTemaInicial() {
  const temaGuardado = localStorage.getItem("tema");

  if (temaGuardado === "claro" || temaGuardado === "oscuro") {
    return temaGuardado;
  }

  return preferenciaOscura.matches ? "oscuro" : "claro";
}

function aplicarTema(tema) {
  const esOscuro = tema === "oscuro";

  document.documentElement.dataset.tema = tema;
  metaColorScheme.content = esOscuro ? "dark" : "light";

  botonTema.setAttribute("aria-pressed", String(esOscuro));

  iconoClaro.hidden = esOscuro;
  iconoOscuro.hidden = !esOscuro;
}

function cambiarTema() {
  const temaActual = document.documentElement.dataset.tema;
  const nuevoTema = temaActual === "oscuro" ? "claro" : "oscuro";

  aplicarTema(nuevoTema);
  localStorage.setItem("tema", nuevoTema);
}

function marcarEntradaActual() {
  for (const enlace of enlacesDelIndice) {
    if (enlace.hash === window.location.hash) {
      enlace.style.fontWeight = "bold";
    } else {
      enlace.style.fontWeight = "normal";
    }
  }
}

function inicializar() {
  aplicarTema(obtenerTemaInicial());
  marcarEntradaActual();

  botonTema.addEventListener("click", cambiarTema);
  window.addEventListener("hashchange", marcarEntradaActual);
}

inicializar();
