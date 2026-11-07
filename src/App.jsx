// LabDE · Laboratorio de Desarrollo Económico — sitio en un solo componente (estilos incluidos).
// Paleta negro, gris y blanco. Fondo animado: una red de partículas que se conectan y difunden capacidades (la idea del espacio de productos).
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowDown, ArrowRight, ArrowUp, ArrowUpRight, BrainCircuit, Check, Cpu, FlaskConical, Lightbulb, Mail, Menu, Network, Orbit, Sparkles, Telescope, X,
} from "lucide-react";

// TAPE: en producción vive en el mismo dominio, en /tape (vercel.json la trae del proyecto tape-saas); en desarrollo, en el puerto 5173.
const TAPE_URL = import.meta.env.VITE_TAPE_URL || (import.meta.env.PROD ? "/tape/" : "http://127.0.0.1:5173/");
// Reemplazar por las direcciones oficiales antes de publicar.
const CONTACTO = { general: "hola@labde.org", investigacion: "investigacion@labde.org" };

const COMO = [
  { icono: Network, titulo: "Complejidad", texto: "Vemos la economía como una red de capacidades: qué sabe hacer cada lugar y qué tiene cerca de poder hacer." },
  { icono: Cpu, titulo: "Computación", texto: "Procesamos datos de comercio, producción, empleo y territorio a escala, con métodos reproducibles." },
  { icono: Lightbulb, titulo: "Creatividad", texto: "Diseñamos herramientas nuevas para preguntas que el desarrollo se hace desde hace décadas." },
  { icono: BrainCircuit, titulo: "Inteligencia artificial", texto: "Modelos que conversan con los datos, para que cualquiera pueda preguntar y entender." },
  { icono: Telescope, titulo: "Apertura intelectual", texto: "Ideas de distintas escuelas y disciplinas, sin dogmas, y resultados abiertos a la crítica." },
  { icono: FlaskConical, titulo: "Investigación teórica y aplicada", texto: "De la teoría del crecimiento y la complejidad económica a software que se usa todos los días." },
];

const PARA_QUE = [
  "Aumentar el nivel de vida", "Bienestar", "Transformación estructural", "Aumentar la productividad", "Calidad del empleo",
  "Mejores ingresos", "Disminuir la pobreza", "Generar y atraer inversiones", "Aprendizaje",
];

const METODO = [
  { n: "01", t: "Una pregunta real", d: "¿Qué puede producir este distrito? ¿Dónde rinde más una subestación? Empezamos por lo que alguien necesita decidir." },
  { n: "02", t: "Teoría y datos", d: "Complejidad económica, capacidades y brechas, medidas con datos oficiales y comparadas con quienes ya producen." },
  { n: "03", t: "Software que se usa", d: "Lo convertimos en herramientas simples, con IA, que muestran la evidencia y sus límites." },
];

const DEMO = [
  { q: "¿Dónde instalar una fábrica de envases plásticos?", a: "134 distritos están listos; 82 todavía no la tienen.", k: [["Listos", "134"], ["Falta una cosa", "74"], ["Faltan varias", "54"]], semilla: 3 },
  { q: "¿Qué puede desarrollar San Alberto?", a: "10 actividades nuevas podrían instalarse con lo que ya tiene.", k: [["Actividades nuevas", "10"], ["Ya produce", "10"], ["Lo que más destraba", "Educación"]], semilla: 7 },
  { q: "¿Dónde invertir en energía para abrir actividades?", a: "Abriría actividades en 76 distritos: 91 combinaciones nuevas.", k: [["Distritos", "76"], ["Combinaciones", "91"], ["Ente", "ANDE"]], semilla: 11 },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
:root { --negro: #0d0d0d; --tinta: #0d0d0d; --gris: #6b6b6b; --gris2: #8e8e8e; --linea: #e5e5e5; --suave: #f7f7f7; --blanco: #ffffff; --ancho: 1240px; }
* { box-sizing: border-box; }
html { scroll-behavior: smooth; scroll-padding-top: 76px; }
body { margin: 0; background: var(--blanco); color: var(--tinta); font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility; }
a { color: inherit; text-decoration: none; }
button { font: inherit; color: inherit; }
::selection { background: var(--negro); color: var(--blanco); }
:focus-visible { outline: 2px solid currentColor; outline-offset: 3px; border-radius: 6px; }
.l-cont { width: min(var(--ancho), calc(100% - 48px)); margin: 0 auto; }

/* Cabecera */
.l-cab { position: fixed; inset: 0 0 auto; z-index: 50; height: 68px; display: flex; align-items: center; transition: background .3s, color .3s, box-shadow .3s; color: var(--blanco); }
.l-cab.clara { background: rgba(255,255,255,.82); backdrop-filter: saturate(1.6) blur(14px); -webkit-backdrop-filter: saturate(1.6) blur(14px); color: var(--tinta); box-shadow: 0 1px 0 var(--linea); }
.l-cab .l-cont { display: flex; align-items: center; gap: 28px; }
.l-marca { display: inline-flex; align-items: center; gap: 10px; font-weight: 700; letter-spacing: -.01em; font-size: 18px; }
.l-marca i { width: 28px; height: 28px; border-radius: 8px; display: grid; place-items: center; background: currentColor; font-style: normal; }
.l-marca i b { color: var(--negro); font-size: 12px; letter-spacing: 0; }
.l-cab.clara .l-marca i b { color: var(--blanco); }
.l-nav { display: flex; gap: 4px; margin-left: auto; }
.l-nav a { padding: 8px 12px; border-radius: 999px; font-size: 14px; opacity: .78; transition: opacity .2s, background .2s; }
.l-nav a:hover { opacity: 1; background: rgba(127,127,127,.14); }
.l-cta { display: inline-flex; align-items: center; gap: 6px; padding: 9px 16px; border-radius: 999px; font-size: 14px; font-weight: 500; background: var(--blanco); color: var(--negro); transition: transform .2s, opacity .2s; white-space: nowrap; }
.l-cab.clara .l-cta { background: var(--negro); color: var(--blanco); }
.l-cab.oscura { background: rgba(13,13,13,.72); backdrop-filter: saturate(1.4) blur(14px); -webkit-backdrop-filter: saturate(1.4) blur(14px); box-shadow: 0 1px 0 rgba(255,255,255,.08); }
.l-cta:hover { transform: translateY(-1px); }
.l-menu-b { display: none; margin-left: auto; width: 40px; height: 40px; border: 0; background: none; border-radius: 10px; cursor: pointer; }
.l-movil { position: fixed; inset: 68px 0 auto; background: var(--blanco); color: var(--tinta); border-bottom: 1px solid var(--linea); padding: 8px 20px 20px; display: flex; flex-direction: column; z-index: 49; animation: l-baja .2s ease-out; }
.l-movil a { padding: 14px 4px; border-bottom: 1px solid var(--linea); display: flex; justify-content: space-between; font-size: 17px; }
.l-movil .l-cta { margin-top: 14px; justify-content: center; background: var(--negro); color: var(--blanco); border: 0; padding: 14px; }
@keyframes l-baja { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: none; } }

/* Portada con red de partículas */
.l-hero { position: relative; min-height: 100vh; min-height: 100svh; background: var(--negro); color: var(--blanco); display: flex; flex-direction: column; justify-content: space-between; overflow: hidden; isolation: isolate; }
.l-hero canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -2; }
.l-hero::after { content: ''; position: absolute; inset: 0; z-index: -1; background: radial-gradient(ellipse 70% 60% at 30% 50%, rgba(13,13,13,.86) 0%, rgba(13,13,13,.55) 45%, rgba(13,13,13,0) 75%), linear-gradient(to bottom, rgba(13,13,13,0) 70%, var(--negro)); pointer-events: none; }
.l-hero > .l-cont { padding: 132px 0 48px; }
.l-ceja { display: inline-flex; align-items: center; gap: 10px; font-size: 13px; letter-spacing: .02em; color: rgba(255,255,255,.72); border: 1px solid rgba(255,255,255,.18); border-radius: 999px; padding: 6px 14px 6px 8px; backdrop-filter: blur(6px); }
.l-ceja i { width: 8px; height: 8px; border-radius: 50%; background: var(--blanco); box-shadow: 0 0 0 4px rgba(255,255,255,.15); animation: l-pulso 2.4s infinite; margin-left: 4px; }
@keyframes l-pulso { 0%, 100% { box-shadow: 0 0 0 3px rgba(255,255,255,.18); } 50% { box-shadow: 0 0 0 7px rgba(255,255,255,0); } }
.l-hero h1 { font-size: clamp(44px, 6.6vw, 96px); line-height: .98; letter-spacing: -.045em; font-weight: 600; margin: 26px 0 26px; max-width: 13ch; }
.l-hero h1 span { color: rgba(255,255,255,.42); }
.l-lead { font-size: clamp(17px, 1.6vw, 21px); line-height: 1.55; color: rgba(255,255,255,.74); max-width: 40ch; margin: 0 0 36px; }
.l-acciones { display: flex; gap: 12px; flex-wrap: wrap; }
.l-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 22px; border-radius: 999px; font-weight: 500; font-size: 15px; transition: transform .2s, background .2s, color .2s; border: 1px solid transparent; }
.l-btn:hover { transform: translateY(-2px); }
.l-btn.blanco { background: var(--blanco); color: var(--negro); }
.l-btn.borde { border-color: rgba(255,255,255,.3); color: var(--blanco); }
.l-btn.borde:hover { background: rgba(255,255,255,.08); }
.l-btn.negro { background: var(--negro); color: var(--blanco); }
.l-btn.borde-n { border-color: var(--linea); }
.l-btn.borde-n:hover { background: var(--suave); }
.l-cifras { width: 100%; padding: 0 0 28px; }
.l-cifras .l-cont { display: flex; justify-content: space-between; align-items: center; gap: 20px; font-size: 13px; color: rgba(255,255,255,.55); }
.l-cifras span b { color: var(--blanco); font-weight: 500; }
.l-bajar { display: inline-flex; align-items: center; gap: 8px; } .l-bajar svg { animation: l-flota 2s infinite ease-in-out; }
@keyframes l-flota { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(4px); } }

/* Cinta de palabras */
.l-cinta { background: var(--negro); color: var(--blanco); border-top: 1px solid rgba(255,255,255,.1); overflow: hidden; padding: 22px 0; }
.l-cinta-in { display: flex; gap: 48px; width: max-content; animation: l-corre 38s linear infinite; }
.l-cinta span { font-size: clamp(22px, 3vw, 34px); font-weight: 500; letter-spacing: -.02em; white-space: nowrap; display: inline-flex; align-items: center; gap: 48px; color: rgba(255,255,255,.82); }
.l-cinta span::after { content: ''; width: 8px; height: 8px; border-radius: 50%; background: rgba(255,255,255,.35); }
@keyframes l-corre { to { transform: translateX(-50%); } }

/* Secciones */
.l-sec { padding: clamp(90px, 12vw, 160px) 0; }
.l-etq { font-size: 13px; letter-spacing: .08em; text-transform: uppercase; color: var(--gris); display: flex; align-items: center; gap: 10px; margin-bottom: 26px; }
.l-etq::before { content: ''; width: 22px; height: 1px; background: currentColor; }
.l-h2 { font-size: clamp(36px, 5vw, 68px); line-height: 1.02; letter-spacing: -.04em; font-weight: 600; margin: 0; }
.l-h2 span { color: var(--gris2); }
.l-intro { font-size: 18px; line-height: 1.6; color: var(--gris); max-width: 44ch; margin: 0; }
.l-cabeza { display: grid; grid-template-columns: 1.3fr 1fr; gap: 48px; align-items: end; margin-bottom: 64px; }

/* Qué hacemos: frase que se completa al bajar */
.l-frase { font-size: clamp(32px, 4.6vw, 64px); line-height: 1.12; letter-spacing: -.035em; font-weight: 600; margin: 0; max-width: 20ch; }
.l-frase span { color: #d4d4d4; transition: color .35s; }
.l-frase span.on { color: var(--tinta); }
.l-frase-pie { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 72px; border-top: 1px solid var(--linea); padding-top: 28px; }
.l-frase-pie div { font-size: 15px; line-height: 1.55; color: var(--gris); }
.l-frase-pie b { display: block; color: var(--tinta); font-weight: 600; font-size: 16px; margin-bottom: 6px; }

/* Cómo */
.l-como { background: var(--suave); }
.l-grilla { display: grid; grid-template-columns: repeat(3, 1fr); background: var(--blanco); border: 1px solid var(--linea); border-radius: 24px; overflow: hidden; }
.l-tarj { background: var(--blanco); box-shadow: inset -1px -1px 0 var(--linea); padding: 34px 30px 36px; min-height: 280px; display: flex; flex-direction: column; gap: 14px; transition: background .35s, color .35s; position: relative; }
.l-tarj:hover { background: var(--negro); color: var(--blanco); }
.l-tarj:hover p, .l-tarj:hover .l-num { color: rgba(255,255,255,.66); }
.l-tarj:hover .l-ico { background: var(--blanco); color: var(--negro); }
.l-tarj .l-num { font-size: 13px; color: var(--gris2); font-variant-numeric: tabular-nums; transition: color .35s; }
.l-ico { width: 46px; height: 46px; border-radius: 14px; background: var(--negro); color: var(--blanco); display: grid; place-items: center; margin-top: auto; transition: background .35s, color .35s; }
.l-tarj h3 { font-size: 22px; letter-spacing: -.02em; margin: 6px 0 0; font-weight: 600; }
.l-tarj p { margin: 0; color: var(--gris); line-height: 1.6; font-size: 15px; transition: color .35s; }

/* Para qué */
.l-paraque { background: var(--negro); color: var(--blanco); position: relative; overflow: hidden; }
.l-paraque .l-etq { color: rgba(255,255,255,.55); }
.l-paraque .l-h2 span { color: rgba(255,255,255,.4); }
.l-paraque .l-intro { color: rgba(255,255,255,.6); }
.l-lista { border-top: 1px solid rgba(255,255,255,.14); }
.l-fila { display: grid; grid-template-columns: 80px 1fr auto; align-items: center; gap: 20px; padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,.14); cursor: default; position: relative; }
.l-fila small { color: rgba(255,255,255,.4); font-size: 14px; font-variant-numeric: tabular-nums; }
.l-fila b { font-size: clamp(26px, 3.6vw, 48px); font-weight: 500; letter-spacing: -.03em; color: rgba(255,255,255,.5); transition: color .3s, transform .4s cubic-bezier(.2,.8,.2,1); }
.l-fila svg { opacity: 0; transform: translateX(-10px); transition: opacity .3s, transform .3s; }
.l-fila:hover b { color: var(--blanco); transform: translateX(10px); }
.l-fila:hover svg { opacity: 1; transform: none; }
.l-fila::before { content: ''; position: absolute; left: 0; bottom: -1px; height: 1px; width: 0; background: var(--blanco); transition: width .6s cubic-bezier(.2,.8,.2,1); }
.l-fila:hover::before { width: 100%; }

/* Frase central */
.l-manifiesto { text-align: center; }
.l-manifiesto h2 { font-size: clamp(40px, 6.4vw, 96px); line-height: 1; letter-spacing: -.05em; font-weight: 600; margin: 0 auto; max-width: 15ch; }
.l-manifiesto h2 span { color: var(--gris2); }
.l-manifiesto p { font-size: 19px; color: var(--gris); max-width: 46ch; margin: 30px auto 0; line-height: 1.6; }

/* TAPE */
.l-tape { background: var(--suave); }
.l-tape-g { display: grid; grid-template-columns: 1fr 1.08fr; gap: 64px; align-items: center; }
.l-tape-t { display: inline-flex; align-items: center; gap: 10px; font-weight: 600; font-size: 15px; margin-bottom: 22px; }
.l-tape-t i { width: 34px; height: 34px; border-radius: 10px; background: var(--negro); color: var(--blanco); display: grid; place-items: center; font-style: normal; font-weight: 800; }
.l-tape-t small { color: var(--gris); font-weight: 400; }
.l-feat { list-style: none; padding: 0; margin: 32px 0; display: grid; gap: 14px; }
.l-feat li { display: grid; grid-template-columns: 26px 1fr; gap: 10px; font-size: 16px; line-height: 1.5; }
.l-feat li svg { margin-top: 3px; }
.l-feat li span { color: var(--gris); }
.l-feat li b { font-weight: 600; color: var(--tinta); }
.l-num4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 1px; background: var(--linea); border: 1px solid var(--linea); border-radius: 18px; overflow: hidden; margin: 0 0 32px; }
.l-num4 div { background: var(--blanco); padding: 16px 14px; }
.l-num4 b { display: block; font-size: 28px; letter-spacing: -.03em; font-weight: 600; }
.l-num4 span { font-size: 12.5px; color: var(--gris); line-height: 1.35; display: block; }

/* Demostración tipo chat */
.l-demo { background: var(--blanco); border: 1px solid var(--linea); border-radius: 24px; box-shadow: 0 30px 80px rgba(0,0,0,.08), 0 2px 6px rgba(0,0,0,.04); overflow: hidden; }
.l-demo-bar { display: flex; align-items: center; gap: 8px; padding: 14px 16px; border-bottom: 1px solid var(--linea); font-size: 13px; color: var(--gris); }
.l-demo-bar i { width: 10px; height: 10px; border-radius: 50%; background: var(--linea); }
.l-demo-bar span { margin-left: 8px; }
.l-demo-c { padding: 24px 22px 18px; min-height: 430px; display: flex; flex-direction: column; gap: 16px; }
.l-burb { align-self: flex-end; background: #f1f1f1; border-radius: 20px; padding: 10px 16px; font-size: 15px; max-width: 85%; min-height: 42px; }
.l-burb .cursor { display: inline-block; width: 2px; height: 1em; background: var(--tinta); vertical-align: -2px; margin-left: 2px; animation: l-parpadeo 1s steps(1) infinite; }
@keyframes l-parpadeo { 50% { opacity: 0; } }
.l-resp { display: flex; gap: 12px; opacity: 0; transform: translateY(8px); transition: opacity .45s, transform .45s; }
.l-resp.on { opacity: 1; transform: none; }
.l-av { width: 26px; height: 26px; border-radius: 8px; background: var(--negro); color: var(--blanco); display: grid; place-items: center; font-size: 13px; font-weight: 800; flex: none; }
.l-resp-c { flex: 1; display: flex; flex-direction: column; gap: 12px; font-size: 15px; line-height: 1.5; }
.l-mini { border: 1px solid var(--linea); border-radius: 16px; padding: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.l-mini-k { display: grid; gap: 8px; align-content: start; }
.l-mini-k div { background: #f4f4f4; border-radius: 10px; padding: 8px 10px; }
.l-mini-k div:first-child { background: var(--negro); color: var(--blanco); }
.l-mini-k span { font-size: 11.5px; opacity: .7; display: block; }
.l-mini-k b { font-size: 18px; font-weight: 600; }
.l-puntos { display: grid; grid-template-columns: repeat(14, 1fr); gap: 4px; align-content: center; }
.l-puntos i { aspect-ratio: 1; border-radius: 50%; background: #e3e3e3; transition: background .5s; }
.l-puntos i.n { background: var(--negro); } .l-puntos i.g { background: #8e8e8e; } .l-puntos i.v { background: transparent; }
.l-demo-sig { display: flex; gap: 6px; flex-wrap: wrap; }
.l-demo-sig span { border: 1px solid var(--linea); border-radius: 999px; padding: 4px 12px; font-size: 13px; color: var(--gris); }
.l-demo-in { margin: 0 16px 16px; border: 1px solid var(--linea); border-radius: 26px; padding: 10px 10px 10px 18px; display: flex; align-items: center; justify-content: space-between; color: var(--gris2); font-size: 14.5px; box-shadow: 0 4px 16px rgba(0,0,0,.04); }
.l-demo-in i { width: 32px; height: 32px; border-radius: 50%; background: var(--negro); color: var(--blanco); display: grid; place-items: center; }

/* Método */
.l-pasos { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px; counter-reset: p; }
.l-paso { border-top: 1px solid var(--tinta); padding-top: 22px; }
.l-paso small { font-size: 13px; color: var(--gris2); font-variant-numeric: tabular-nums; }
.l-paso h3 { font-size: 24px; letter-spacing: -.02em; margin: 10px 0 10px; font-weight: 600; }
.l-paso p { color: var(--gris); line-height: 1.6; margin: 0; font-size: 15.5px; }

/* Contacto */
.l-contacto { background: var(--negro); color: var(--blanco); position: relative; overflow: hidden; isolation: isolate; }
.l-contacto canvas { position: absolute; inset: 0; width: 100%; height: 100%; z-index: -1; opacity: .5; }
.l-contacto .l-etq { color: rgba(255,255,255,.55); }
.l-contacto-g { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: end; }
.l-contacto h2 { font-size: clamp(40px, 6vw, 88px); line-height: 1; letter-spacing: -.05em; margin: 0; font-weight: 600; }
.l-contacto h2 span { color: rgba(255,255,255,.4); }
.l-enlaces { display: flex; flex-direction: column; border-top: 1px solid rgba(255,255,255,.18); }
.l-enlaces a { display: flex; justify-content: space-between; align-items: center; padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,.18); font-size: 18px; transition: padding .3s; }
.l-enlaces a:hover { padding-left: 10px; }
.l-enlaces a span { display: inline-flex; gap: 12px; align-items: center; }
.l-enlaces a small { color: rgba(255,255,255,.5); font-size: 14px; }

/* Pie */
.l-pie { background: var(--negro); color: rgba(255,255,255,.55); border-top: 1px solid rgba(255,255,255,.1); padding: 36px 0; font-size: 14px; }
.l-pie .l-cont { display: flex; justify-content: space-between; gap: 20px; flex-wrap: wrap; align-items: center; }
.l-pie .l-marca { color: var(--blanco); }
.l-pie nav { display: flex; gap: 18px; flex-wrap: wrap; } .l-pie nav a:hover { color: var(--blanco); }
.l-arriba { width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255,255,255,.2); background: none; color: var(--blanco); display: grid; place-items: center; cursor: pointer; }

/* Aparición al bajar */
.l-rev { opacity: 0; transform: translateY(26px); transition: opacity .9s cubic-bezier(.2,.8,.2,1), transform .9s cubic-bezier(.2,.8,.2,1); }
.l-rev.on { opacity: 1; transform: none; }
.l-tarj.l-rev { transition: opacity .9s cubic-bezier(.2,.8,.2,1), transform .9s cubic-bezier(.2,.8,.2,1), background .35s, color .35s; }
.l-d1 { transition-delay: .08s; } .l-d2 { transition-delay: .16s; } .l-d3 { transition-delay: .24s; }

@media (max-width: 980px) {
  .l-nav, .l-cab .l-cta { display: none; } .l-menu-b { display: grid; place-items: center; }
  .l-cabeza, .l-tape-g, .l-contacto-g { grid-template-columns: 1fr; gap: 32px; }
  .l-grilla { grid-template-columns: 1fr 1fr; }
  .l-pasos, .l-frase-pie { grid-template-columns: 1fr; }
  .l-cifras .l-cont span:not(.l-bajar) { display: none; }
}
@media (max-width: 620px) {
  .l-cont { width: calc(100% - 36px); }
  .l-grilla { grid-template-columns: 1fr; } .l-tarj { min-height: 0; }
  .l-fila { grid-template-columns: 44px 1fr; } .l-fila svg { display: none; }
  .l-num4 { grid-template-columns: 1fr 1fr; }
  .l-mini { grid-template-columns: 1fr; }
  .l-demo-c { min-height: 470px; }
}
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .l-rev { opacity: 1; transform: none; }
  .l-frase span { color: var(--tinta); }
}
`;

// ---------- Red de partículas: nodos que derivan, se conectan por cercanía y difunden pulsos (capacidades que se contagian) ----------
function RedDeComplejidad({ densidad = 1, interactiva = true }) {
  const lienzo = useRef(null);
  useEffect(() => {
    const cv = lienzo.current;
    const ctx = cv.getContext("2d");
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, dpr = 1, nodos = [], pulsos = [], raf = 0, visible = true, t0 = performance.now();
    const raton = { x: -9999, y: -9999, activo: false };
    const DIST = () => Math.min(170, Math.max(110, w / 10));

    function armar() {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height; dpr = Math.min(2, window.devicePixelRatio || 1);
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(170, Math.max(50, (w * h) / 9500)) * densidad);
      // Unos pocos centros grandes (capacidades muy conectadas) y muchos nodos chicos agrupados a su alrededor.
      const centros = Array.from({ length: 6 }, () => ({ x: w * (0.35 + Math.random() * 0.62), y: h * (0.1 + Math.random() * 0.8) }));
      nodos = Array.from({ length: n }, (_, i) => {
        const c = centros[i % centros.length];
        const agrupado = Math.random() < 0.6;
        const ang = Math.random() * Math.PI * 2, rad = Math.random() * Math.min(w, h) * 0.22;
        return {
          x: agrupado ? c.x + Math.cos(ang) * rad : Math.random() * w,
          y: agrupado ? c.y + Math.sin(ang) * rad : Math.random() * h,
          vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22,
          r: i < 6 ? 2.6 : Math.random() < 0.15 ? 1.8 : 1.1,
          brillo: 0,
        };
      });
    }

    function paso(dt) {
      const d = DIST();
      for (const p of nodos) {
        p.x += p.vx * dt; p.y += p.vy * dt;
        if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
        if (raton.activo) {
          const dx = raton.x - p.x, dy = raton.y - p.y, dd = Math.hypot(dx, dy);
          if (dd < 180 && dd > 1) { p.x += (dx / dd) * 0.18 * dt * (1 - dd / 180); p.y += (dy / dd) * 0.18 * dt * (1 - dd / 180); }
        }
        p.brillo *= 0.965;
      }
      // Un pulso nace en un nodo y salta a sus vecinos: así se difunden las capacidades en la red.
      if (Math.random() < 0.025 * dt && pulsos.length < 7) {
        const a = nodos[Math.floor(Math.random() * nodos.length)];
        pulsos.push({ de: a, a: null, t: 0, saltos: 0 });
      }
      for (const s of pulsos) {
        if (!s.a) {
          const vec = nodos.filter((q) => q !== s.de && Math.hypot(q.x - s.de.x, q.y - s.de.y) < d);
          if (!vec.length || s.saltos > 5) { s.fin = true; continue; }
          s.a = vec[Math.floor(Math.random() * vec.length)]; s.t = 0;
        }
        s.t += 0.022 * dt;
        if (s.t >= 1) { s.a.brillo = 1; s.de = s.a; s.a = null; s.saltos += 1; }
      }
      pulsos = pulsos.filter((s) => !s.fin);
    }

    function dibujar() {
      ctx.clearRect(0, 0, w, h);
      const d = DIST(); const d2 = d * d;
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodos.length; i++) {
        const a = nodos[i];
        for (let j = i + 1; j < nodos.length; j++) {
          const b = nodos[j]; const dx = a.x - b.x, dy = a.y - b.y; const q = dx * dx + dy * dy;
          if (q < d2) {
            let al = (1 - Math.sqrt(q) / d) * 0.26;
            if (raton.activo) { const m = Math.hypot((a.x + b.x) / 2 - raton.x, (a.y + b.y) / 2 - raton.y); if (m < 160) al += (1 - m / 160) * 0.35; }
            ctx.strokeStyle = `rgba(255,255,255,${al.toFixed(3)})`;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const s of pulsos) {
        if (!s.a) continue;
        const x = s.de.x + (s.a.x - s.de.x) * s.t, y = s.de.y + (s.a.y - s.de.y) * s.t;
        ctx.strokeStyle = "rgba(255,255,255,.55)"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(s.de.x, s.de.y); ctx.lineTo(x, y); ctx.stroke();
        ctx.fillStyle = "#fff"; ctx.beginPath(); ctx.arc(x, y, 1.9, 0, Math.PI * 2); ctx.fill();
        ctx.lineWidth = 0.6;
      }
      for (const p of nodos) {
        const al = 0.55 + p.brillo * 0.45;
        ctx.fillStyle = `rgba(255,255,255,${al.toFixed(3)})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r + p.brillo * 1.6, 0, Math.PI * 2); ctx.fill();
        if (p.brillo > 0.05) { ctx.strokeStyle = `rgba(255,255,255,${(p.brillo * 0.35).toFixed(3)})`; ctx.beginPath(); ctx.arc(p.x, p.y, p.r + 6 * (1 - p.brillo) + 2, 0, Math.PI * 2); ctx.stroke(); }
      }
    }

    function bucle(t) {
      const dt = Math.min(3, (t - t0) / 16.7); t0 = t;
      if (visible) { paso(dt); dibujar(); }
      raf = requestAnimationFrame(bucle);
    }

    armar();
    if (quieto) { dibujar(); } else { raf = requestAnimationFrame(bucle); }
    const ro = new ResizeObserver(() => { armar(); if (quieto) dibujar(); });
    ro.observe(cv);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting && !document.hidden; }, { threshold: 0 });
    io.observe(cv);
    const mover = (e) => { const r = cv.getBoundingClientRect(); raton.x = e.clientX - r.left; raton.y = e.clientY - r.top; raton.activo = interactiva && raton.y >= 0 && raton.y <= h; };
    const salir = () => { raton.activo = false; };
    window.addEventListener("pointermove", mover, { passive: true });
    document.addEventListener("pointerleave", salir);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener("pointermove", mover); document.removeEventListener("pointerleave", salir); };
  }, [densidad, interactiva]);
  return <canvas ref={lienzo} aria-hidden="true" />;
}

// Aparece al entrar en pantalla.
function Rev({ children, d = 0, as: Tag = "div", className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!("IntersectionObserver" in window)) { el.classList.add("on"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("on"); io.disconnect(); } }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`l-rev ${d ? `l-d${d}` : ""} ${className}`}>{children}</Tag>;
}

// La frase se «enciende» palabra por palabra a medida que se baja.
function FraseQueSeCompleta({ texto }) {
  const ref = useRef(null);
  const palabras = texto.split(" ");
  const [hasta, setHasta] = useState(0);
  useEffect(() => {
    const calc = () => {
      const r = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      setHasta(Math.round(p * palabras.length));
    };
    calc();
    window.addEventListener("scroll", calc, { passive: true }); window.addEventListener("resize", calc);
    return () => { window.removeEventListener("scroll", calc); window.removeEventListener("resize", calc); };
  }, [palabras.length]);
  return <p className="l-frase" ref={ref} aria-label={texto}>{palabras.map((x, i) => <React.Fragment key={i}><span className={i < hasta ? "on" : ""} aria-hidden="true">{x}</span>{" "}</React.Fragment>)}</p>;
}

// Demostración de TAPE: escribe una pregunta, muestra la respuesta con una tarjeta y pasa a la siguiente.
function puntosDe(semilla) {
  let x = semilla * 9301 + 49297;
  const az = () => { x = (x * 9301 + 49297) % 233280; return x / 233280; };
  // Forma aproximada de Paraguay en una grilla de 14 × 10 (vacío fuera del país).
  const forma = ["00111100000000", "01111110000000", "11111111000000", "11111111100000", "01111111110000", "00111111111100", "00001111111110", "00000111111111", "00000011111110", "00000001111100"];
  return forma.join("").split("").map((c) => (c === "0" ? "v" : az() < 0.48 ? "n" : az() < 0.6 ? "g" : ""));
}
function Demo() {
  const [k, setK] = useState(0);
  const [escrito, setEscrito] = useState("");
  const [fase, setFase] = useState("escribe");
  const ej = DEMO[k];
  useEffect(() => {
    const q = DEMO[k].q;
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (quieto) { setEscrito(q); setFase("responde"); return; }
    let i = 0; let espera = 0; setEscrito(""); setFase("escribe");
    const tipeo = setInterval(() => {
      i += 1; setEscrito(q.slice(0, i));
      if (i >= q.length) { clearInterval(tipeo); espera = setTimeout(() => setFase("responde"), 450); }
    }, 38);
    return () => { clearInterval(tipeo); clearTimeout(espera); };
  }, [k]);
  useEffect(() => {
    if (fase !== "responde") return;
    const quieto = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (quieto) return;
    const t = setTimeout(() => setK((x) => (x + 1) % DEMO.length), 5200);
    return () => clearTimeout(t);
  }, [fase]);
  const puntos = puntosDe(ej.semilla);
  return (
    <div className="l-demo" aria-label="Ejemplo de conversación con TAPE">
      <div className="l-demo-bar"><i /><i /><i /><span>TAPE · Preguntale a Paraguay</span></div>
      <div className="l-demo-c">
        <div className="l-burb">{escrito}{fase === "escribe" && <span className="cursor" />}</div>
        <div className={`l-resp${fase === "responde" ? " on" : ""}`}>
          <span className="l-av">T</span>
          <div className="l-resp-c">
            <div><b>{ej.a.split(";")[0]}</b>{ej.a.includes(";") ? `;${ej.a.split(";")[1]}` : ""}</div>
            <div className="l-mini">
              <div className="l-mini-k">{ej.k.map(([t, v]) => <div key={t}><span>{t}</span><b>{v}</b></div>)}</div>
              <div className="l-puntos" aria-hidden="true">{puntos.map((c, i) => <i key={i} className={c} />)}</div>
            </div>
            <div className="l-demo-sig"><span>↳ Ver la ficha del mejor distrito</span><span>↳ Comparar dos distritos</span></div>
          </div>
        </div>
      </div>
      <div className="l-demo-in">Preguntá por un distrito, una actividad o una inversión… <i><ArrowUp size={16} /></i></div>
    </div>
  );
}

function Marca() {
  return <a className="l-marca" href="#inicio" aria-label="LabDE, inicio"><i><b>DE</b></i>LabDE</a>;
}

export default function App() {
  // La cabecera toma el tono de la sección que tiene debajo: transparente sobre la portada, oscura sobre secciones negras, clara sobre las blancas.
  const [tono, setTono] = useState("portada");
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const f = () => {
      if (window.scrollY < 40) return setTono("portada");
      const debajo = document.elementsFromPoint(window.innerWidth / 2, 34).find((el) => el.tagName === "SECTION");
      setTono(debajo && /l-hero|l-paraque|l-contacto/.test(debajo.className) ? "oscura" : "clara");
    };
    f(); window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  const nav = [["Qué hacemos", "#que"], ["Cómo", "#como"], ["Para qué", "#para-que"], ["TAPE", "#tape"], ["Contacto", "#contacto"]];
  const palabras = ["Complejidad", "Computación", "Creatividad", "Inteligencia artificial", "Apertura intelectual", "Investigación teórica y aplicada"];
  return (
    <>
      <style>{css}</style>
      <header className={`l-cab${menu || tono === "clara" ? " clara" : tono === "oscura" ? " oscura" : ""}`}>
        <div className="l-cont">
          <Marca />
          <nav className="l-nav" aria-label="Navegación principal">{nav.map(([t, h]) => <a key={h} href={h}>{t}</a>)}</nav>
          <a className="l-cta" href={TAPE_URL}>Probar TAPE <ArrowUpRight size={15} /></a>
          <button className="l-menu-b" onClick={() => setMenu(!menu)} aria-label={menu ? "Cerrar menú" : "Abrir menú"} aria-expanded={menu}>{menu ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </header>
      {menu && <nav className="l-movil" aria-label="Navegación">{nav.map(([t, h]) => <a key={h} href={h} onClick={() => setMenu(false)}>{t} <ArrowUpRight size={16} /></a>)}<a className="l-cta" href={TAPE_URL}>Probar TAPE gratis <ArrowUpRight size={16} /></a></nav>}

      <main>
        <section className="l-hero" id="inicio">
          <RedDeComplejidad />
          <div className="l-cont">
            <Rev><span className="l-ceja"><i />Laboratorio de Desarrollo Económico · Paraguay</span></Rev>
            <Rev d={1}><h1>Software para entender el <span>desarrollo económico.</span></h1></Rev>
            <Rev d={2}><p className="l-lead">Hacemos más práctica la economía: llevamos las ideas económicas a herramientas de software e inteligencia artificial.</p></Rev>
            <Rev d={3}>
              <div className="l-acciones">
                <a className="l-btn blanco" href={TAPE_URL}>Probar TAPE <ArrowUpRight size={16} /></a>
                <a className="l-btn borde" href="#que">Qué hacemos <ArrowRight size={16} /></a>
              </div>
            </Rev>
          </div>
          <div className="l-cifras">
            <div className="l-cont">
              <span><b>263</b> distritos · <b>67</b> actividades · <b>5</b> condiciones medidas</span>
              <a className="l-bajar" href="#que">Bajar <ArrowDown size={15} /></a>
            </div>
          </div>
        </section>

        <div className="l-cinta" aria-hidden="true"><div className="l-cinta-in">{[...palabras, ...palabras].map((p, i) => <span key={i}>{p}</span>)}</div></div>

        <section className="l-sec" id="que">
          <div className="l-cont">
            <Rev><div className="l-etq">Qué hacemos</div></Rev>
            <FraseQueSeCompleta texto="Generamos y desarrollamos software para entender el desarrollo económico, y lo ponemos en manos de quienes deciden." />
            <div className="l-frase-pie">
              <Rev d={1}><div><b>Para quien invierte</b>Dónde producir, qué condiciones ofrece cada lugar y cuánto rinde un proyecto.</div></Rev>
              <Rev d={2}><div><b>Para el sector público</b>Qué le falta a cada territorio, quién puede resolverlo y dónde una inversión abre más actividades.</div></Rev>
              <Rev d={3}><div><b>Para quien investiga</b>Datos, métodos y supuestos abiertos para discutir el desarrollo con evidencia.</div></Rev>
            </div>
          </div>
        </section>

        <section className="l-sec l-como" id="como">
          <div className="l-cont">
            <div className="l-cabeza">
              <Rev><div className="l-etq">¿Cómo?</div><h2 className="l-h2">Seis ideas, <span>una forma de trabajar.</span></h2></Rev>
              <Rev d={2}><p className="l-intro">Combinamos complejidad, computación y creatividad con inteligencia artificial, apertura intelectual e investigación teórica y aplicada.</p></Rev>
            </div>
            <div className="l-grilla">
              {COMO.map((c, i) => (
                <Rev key={c.titulo} d={(i % 3) + 1} className="l-tarj">
                  <span className="l-num">0{i + 1}</span>
                  <h3>{c.titulo}</h3>
                  <p>{c.texto}</p>
                  <span className="l-ico"><c.icono size={21} /></span>
                </Rev>
              ))}
            </div>
          </div>
        </section>

        <section className="l-sec l-paraque" id="para-que">
          <div className="l-cont">
            <div className="l-cabeza">
              <Rev><div className="l-etq">¿Para qué?</div><h2 className="l-h2">Para que la economía <span>mejore la vida de la gente.</span></h2></Rev>
              <Rev d={2}><p className="l-intro">Cada herramienta que hacemos apunta a alguno de estos resultados.</p></Rev>
            </div>
            <div className="l-lista">
              {PARA_QUE.map((x, i) => (
                <Rev key={x} className="l-fila"><small>0{i + 1}</small><b>{x}</b><ArrowRight size={26} /></Rev>
              ))}
            </div>
          </div>
        </section>

        <section className="l-sec l-manifiesto">
          <div className="l-cont">
            <Rev><div className="l-etq" style={{ justifyContent: "center" }}>Nuestra apuesta</div></Rev>
            <Rev d={1}><h2>Hacer más práctica <span>la economía.</span></h2></Rev>
            <Rev d={2}><p>Aplicar las ideas económicas a herramientas de software e inteligencia artificial que cualquier persona pueda usar para decidir mejor.</p></Rev>
          </div>
        </section>

        <section className="l-sec l-tape" id="tape">
          <div className="l-cont l-tape-g">
            <div>
              <Rev><div className="l-tape-t"><i>T</i>TAPE <small>· Territorio, Actividades y Potencial Económico</small></div></Rev>
              <Rev d={1}><h2 className="l-h2">Preguntale <span>a Paraguay.</span></h2></Rev>
              <Rev d={2}>
                <ul className="l-feat">
                  <li><Check size={18} /><span><b>Dónde producir.</b> Qué distritos están listos para cada actividad, y cuáles están a una sola cosa.</span></li>
                  <li><Check size={18} /><span><b>Qué falta y quién actúa.</b> Formación, energía, logística o tierra, y quién puede resolverlo.</span></li>
                  <li><Check size={18} /><span><b>Inversión pública con impacto.</b> Dónde una subestación, una ruta o una escuela abren más actividades.</span></li>
                  <li><Check size={18} /><span><b>Conozca Paraguay.</b> Economía, precios, comercio y finanzas públicas, con su fuente y su fecha.</span></li>
                </ul>
              </Rev>
              <Rev d={3}>
                <div className="l-num4">
                  <div><b>263</b><span>distritos comparados</span></div>
                  <div><b>67</b><span>actividades productivas</span></div>
                  <div><b>5</b><span>condiciones medidas</span></div>
                  <div><b>10</b><span>preguntas gratis sin registrarte</span></div>
                </div>
                <div className="l-acciones">
                  <a className="l-btn negro" href={TAPE_URL}>Probar TAPE gratis <ArrowUpRight size={16} /></a>
                  <a className="l-btn borde-n" href="#metodo">Cómo funciona</a>
                </div>
              </Rev>
            </div>
            <Rev d={2}><Demo /></Rev>
          </div>
        </section>

        <section className="l-sec" id="metodo">
          <div className="l-cont">
            <div className="l-cabeza">
              <Rev><div className="l-etq">Método</div><h2 className="l-h2">De una pregunta <span>a una herramienta.</span></h2></Rev>
              <Rev d={2}><p className="l-intro">Los resultados describen distancias frente a quienes ya producen: muestran evidencia y límites, no promesas.</p></Rev>
            </div>
            <div className="l-pasos">{METODO.map((p, i) => <Rev key={p.n} d={i + 1} className="l-paso"><small>{p.n}</small><h3>{p.t}</h3><p>{p.d}</p></Rev>)}</div>
          </div>
        </section>

        <section className="l-sec l-contacto" id="contacto">
          <RedDeComplejidad densidad={0.55} interactiva={false} />
          <div className="l-cont l-contacto-g">
            <Rev><div className="l-etq">Contacto</div><h2>Toda herramienta empieza <span>con una pregunta.</span></h2></Rev>
            <Rev d={2}>
              <div className="l-enlaces">
                <a href={`mailto:${CONTACTO.general}`}><span><Mail size={18} />Escribinos</span><small>{CONTACTO.general}</small></a>
                <a href={`mailto:${CONTACTO.investigacion}`}><span><Orbit size={18} />Investigar juntos</span><small>{CONTACTO.investigacion}</small></a>
                <a href={TAPE_URL}><span><Sparkles size={18} />Probar TAPE</span><ArrowUpRight size={18} /></a>
              </div>
            </Rev>
          </div>
        </section>
      </main>

      <footer className="l-pie">
        <div className="l-cont">
          <Marca />
          <nav aria-label="Pie de página">{nav.map(([t, h]) => <a key={h} href={h}>{t}</a>)}</nav>
          <span>© {new Date().getFullYear()} LabDE · Desde Paraguay</span>
          <button className="l-arriba" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Volver arriba"><ArrowUp size={17} /></button>
        </div>
      </footer>
    </>
  );
}
