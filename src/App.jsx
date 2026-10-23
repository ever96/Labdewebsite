
import React, { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Atom,
  BrainCircuit,
  Menu,
  X,
  Dna,
  Network,
  Microscope,
  Globe2,
  GitBranch,
  Mail,
  FlaskConical,
  Cpu,
  Layers3,
} from "lucide-react";

const researchAreas = [
  {
    number: "01",
    icon: BrainCircuit,
    title: "Artificial intelligence",
    description:
      "Developing intelligent systems for reasoning, scientific discovery, and complex problem solving.",
    tags: ["Machine learning", "AI systems", "Agents"],
  },
  {
    number: "02",
    icon: Dna,
    title: "Computational biology",
    description:
      "Applying computational methods to molecular interactions, biological systems, and drug discovery.",
    tags: ["Bioinformatics", "Molecular modeling", "Drug discovery"],
  },
  {
    number: "03",
    icon: Atom,
    title: "Complex systems",
    description:
      "Exploring how interactions between individual components give rise to emergent behavior.",
    tags: ["Simulation", "Mathematics", "Networks"],
  },
  {
    number: "04",
    icon: Network,
    title: "Economics & society",
    description:
      "Building quantitative frameworks for understanding markets, industries, and public policy.",
    tags: ["Economic modeling", "Data science", "Policy"],
  },
];

const models = [
  {
    id: "M01",
    name: "Molecular Intelligence",
    category: "Biology",
    status: "In development",
    description:
      "A computational research direction exploring molecular structure, interactions, and candidate prioritization.",
    icon: Dna,
  },
  {
    id: "M02",
    name: "Scientific Intelligence",
    category: "AI",
    status: "Research direction",
    description:
      "Investigating AI systems that connect scientific literature, computational tools, and structured reasoning.",
    icon: BrainCircuit,
  },
  {
    id: "M03",
    name: "Economic Intelligence",
    category: "Economics",
    status: "Research direction",
    description:
      "Exploring data-driven models for economic analysis, industry research, and decision support.",
    icon: Network,
  },
];

const articles = [
  {
    category: "RESEARCH NOTES",
    date: "01",
    title: "Can AI become a tool for scientific discovery?",
    excerpt:
      "Exploring the relationship between machine learning, scientific methods, and the production of new knowledge.",
    icon: BrainCircuit,
  },
  {
    category: "COMPUTATIONAL BIOLOGY",
    date: "02",
    title: "From molecular structure to biological function",
    excerpt:
      "Why understanding molecular interactions requires more than predicting a single static structure.",
    icon: Microscope,
  },
  {
    category: "ECONOMICS & TECHNOLOGY",
    date: "03",
    title: "Building technological capacity in Latin America",
    excerpt:
      "On research infrastructure, local talent, open technologies, and the economics of innovation.",
    icon: Globe2,
  },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');

:root {
  --bg: #fff;
  --text: #111;
  --muted: #707070;
  --line: #e8e8e8;
  --soft: #f7f7f5;
  --width: 1320px;
}

* { box-sizing: border-box; }

html {
  scroll-behavior: smooth;
  scroll-padding-top: 88px;
}

body {
  margin: 0;
  background: var(--bg);
  color: var(--text);
  font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  -webkit-font-smoothing: antialiased;
}

button, input { font: inherit; }
button, a { -webkit-tap-highlight-color: transparent; }
a { color: inherit; text-decoration: none; }
button { color: inherit; cursor: pointer; }
::selection { color: white; background: #171717; }

.lab-shell { min-height: 100vh; overflow: clip; }
.lab-container {
  width: min(var(--width), calc(100% - 100px));
  margin: auto;
}

.lab-header {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px;
  background: rgba(255,255,255,.94);
  border-bottom: 1px solid rgba(0,0,0,.065);
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(18px);
  transition: box-shadow .3s ease;
}

.lab-header.scrolled {
  box-shadow: 0 5px 25px rgba(0,0,0,.035);
}

.lab-brand {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: .76;
  flex-shrink: 0;
}

.lab-brand-top {
  font-size: 30px;
  font-weight: 700;
  letter-spacing: -2.7px;
}

.lab-brand-bottom {
  margin-top: 7px;
  padding-left: 5px;
  color: #999;
  font-size: 20px;
  font-weight: 400;
  letter-spacing: 5px;
}

.lab-nav { display: flex; align-items: center; gap: 31px; }

.lab-nav a {
  color: #4e4e4e;
  font-size: 12px;
  transition: color .2s;
}

.lab-nav a:hover { color: #aaa; }

.lab-nav-cta {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  border: 1px solid #d8d8d8;
  border-radius: 100px;
  padding: 11px 16px;
  font-size: 12px;
  transition: background .25s, color .25s, border-color .25s;
}

.lab-nav-cta:hover {
  background: #111;
  color: white;
  border-color: #111;
}

.lab-mobile-toggle {
  display: none;
  border: 0;
  background: transparent;
  padding: 8px;
}

.lab-mobile-panel {
  position: absolute;
  top: 67px;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  padding: 12px 22px 22px;
  background: white;
  border-bottom: 1px solid var(--line);
  box-shadow: 0 15px 25px rgba(0,0,0,.05);
  animation: lab-enter .25s ease both;
}

.lab-mobile-panel a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px 0;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.lab-hero {
  padding: 106px 0 91px;
  display: grid;
  grid-template-columns: 1.12fr .88fr;
  align-items: center;
  gap: 70px;
}

.lab-eyebrow {
  display: flex;
  align-items: center;
  gap: 11px;
  color: #737373;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .19em;
  text-transform: uppercase;
}

.lab-eyebrow::before {
  content: '';
  width: 25px;
  height: 1px;
  background: #a0a0a0;
  flex-shrink: 0;
}

.lab-hero h1 {
  margin: 31px 0 27px;
  font-size: clamp(56px, 6.2vw, 88px);
  font-weight: 500;
  line-height: .99;
  letter-spacing: -.078em;
}

.lab-muted { color: #a3a3a3; }

.lab-lead {
  max-width: 510px;
  color: #656565;
  font-size: 15px;
  line-height: 1.95;
}

.lab-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 31px;
}

.lab-btn {
  min-height: 46px;
  padding: 0 19px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  border: 1px solid #151515;
  border-radius: 100px;
  background: #151515;
  color: white;
  font-size: 12px;
  transition: transform .25s, background .25s, color .25s;
}

.lab-btn:hover {
  transform: translateY(-2px);
  background: #353535;
}

.lab-btn.secondary {
  background: white;
  color: #111;
  border-color: #dedede;
}

.lab-btn.secondary:hover { border-color: #111; background: #fafafa; }

.lab-hero-copy { animation: lab-enter .9s both; }

.lab-hero-art {
  position: relative;
  min-height: 420px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #080808;
  overflow: hidden;
  isolation: isolate;
  animation: lab-enter .9s .12s both;
}

.lab-hero-art::before,
.lab-hero-art::after {
  content: '';
  position: absolute;
  border: 1px solid rgba(255,255,255,.15);
  border-radius: 50%;
}

.lab-hero-art::before {
  width: 330px;
  height: 330px;
  animation: lab-orbit 36s linear infinite;
}

.lab-hero-art::after {
  width: 230px;
  height: 230px;
  border-color: rgba(255,255,255,.12);
  animation: lab-orbit 26s linear infinite reverse;
}

.lab-art-grid {
  position: absolute;
  inset: 0;
  opacity: .12;
  background-image:
    linear-gradient(rgba(255,255,255,.17) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.17) 1px, transparent 1px);
  background-size: 38px 38px;
  mask-image: radial-gradient(ellipse at center, black 5%, transparent 75%);
}

.lab-art-center {
  position: relative;
  z-index: 2;
  width: 135px;
  height: 135px;
  display: grid;
  place-items: center;
  color: white;
  background: #101010;
  border: 1px solid #555;
  border-radius: 50%;
  box-shadow: 0 0 90px rgba(255,255,255,.08);
  animation: lab-float 6s ease-in-out infinite;
}

.lab-art-center svg { width: 45px; height: 45px; stroke-width: 1; }

.lab-art-node {
  position: absolute;
  z-index: 3;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  border: 1px solid #555;
  border-radius: 50%;
  background: #171717;
  color: #ddd;
}

.lab-art-node svg { width: 18px; height: 18px; stroke-width: 1.2; }
.lab-node-one { top: 21%; left: 24%; }
.lab-node-two { top: 26%; right: 19%; }
.lab-node-three { bottom: 19%; left: 27%; }
.lab-node-four { bottom: 22%; right: 23%; }

.lab-art-caption {
  position: absolute;
  bottom: 21px;
  left: 23px;
  color: #aaa;
  font-size: 9px;
  letter-spacing: .17em;
  text-transform: uppercase;
}

.lab-scroll {
  position: absolute;
  right: 22px;
  bottom: 19px;
  color: #aaa;
  animation: lab-bob 2s ease-in-out infinite;
}

.lab-marquee { border-block: 1px solid var(--line); }

.lab-marquee-inner {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 24px 0;
}

.lab-marquee-item {
  display: flex;
  align-items: center;
  gap: 11px;
  color: #626262;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: .13em;
  text-transform: uppercase;
}

.lab-marquee-item:not(:first-child) {
  padding-left: 30px;
  border-left: 1px solid var(--line);
}

.lab-marquee-item svg { width: 16px; height: 16px; color: #888; }

.lab-section { padding: 112px 0; scroll-margin-top: 75px; }

.lab-section-heading {
  display: flex;
  justify-content: space-between;
  align-items: end;
  gap: 40px;
  margin-bottom: 43px;
}

.lab-section h2 {
  margin: 22px 0 0;
  font-size: clamp(38px, 4.6vw, 62px);
  font-weight: 500;
  line-height: 1.07;
  letter-spacing: -.065em;
}

.lab-section-intro {
  max-width: 420px;
  margin: 0 0 4px;
  color: #707070;
  font-size: 13px;
  line-height: 1.9;
}

.lab-text-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  border-bottom: 1px solid #bbb;
  padding-bottom: 5px;
  transition: gap .25s, border-color .25s;
}

.lab-text-link:hover { gap: 13px; border-color: #111; }

.lab-research-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  border-left: 1px solid var(--line);
  border-top: 1px solid var(--line);
}

.lab-research-card {
  min-height: 315px;
  padding: 30px;
  border-right: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  transition: background .35s;
}

.lab-research-card:hover { background: #fafaf9; }

.lab-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 47px;
}

.lab-number { color: #aaa; font-size: 11px; }

.lab-card-icon {
  width: 37px;
  height: 37px;
  display: grid;
  place-items: center;
  border: 1px solid #e4e4e4;
  border-radius: 50%;
  transition: background .3s, color .3s, transform .3s;
}

.lab-card-icon svg { width: 17px; height: 17px; stroke-width: 1.4; }

.lab-research-card:hover .lab-card-icon {
  background: #111;
  color: white;
  transform: rotate(-8deg);
}

.lab-research-card h3 {
  margin: 0 0 12px;
  font-size: 23px;
  font-weight: 500;
  letter-spacing: -.045em;
}

.lab-research-card p {
  max-width: 470px;
  margin: 0;
  color: #737373;
  font-size: 12px;
  line-height: 1.9;
}

.lab-tags { display: flex; flex-wrap: wrap; gap: 7px; margin-top: 23px; }

.lab-tag {
  padding: 7px 10px;
  border: 1px solid var(--line);
  border-radius: 100px;
  color: #777;
  font-size: 9px;
}

.lab-models { background: var(--soft); }

.lab-model-list { border-top: 1px solid #dededb; }

.lab-model-row {
  display: grid;
  grid-template-columns: 55px 1fr 1.1fr 160px 30px;
  align-items: center;
  gap: 25px;
  padding: 28px 0;
  border-bottom: 1px solid #dededb;
  transition: padding .3s, background .3s;
}

.lab-model-row:hover {
  padding-left: 12px;
  padding-right: 12px;
  background: rgba(255,255,255,.65);
}

.lab-model-index { color: #999; font-size: 10px; }

.lab-model-title { display: flex; align-items: center; gap: 15px; }

.lab-model-symbol {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 50%;
  flex-shrink: 0;
}

.lab-model-symbol svg { width: 19px; height: 19px; stroke-width: 1.4; }

.lab-model-title h3 {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: -.025em;
}

.lab-model-title small {
  display: block;
  margin-top: 5px;
  color: #929292;
  font-size: 10px;
}

.lab-model-desc { color: #727272; font-size: 11px; line-height: 1.8; }

.lab-status {
  justify-self: start;
  border: 1px solid #dededb;
  border-radius: 100px;
  padding: 7px 10px;
  color: #686868;
  font-size: 9px;
  white-space: nowrap;
}

.lab-model-arrow { color: #777; transition: transform .25s; }
.lab-model-row:hover .lab-model-arrow { transform: translate(3px,-3px); color: #111; }

.lab-model-note { margin-top: 20px; color: #8a8a8a; font-size: 10px; line-height: 1.8; }

.lab-statement { background: #080808; color: white; }

.lab-statement-inner {
  display: grid;
  grid-template-columns: 1.15fr .85fr;
  gap: 90px;
  padding: 100px 0;
  align-items: end;
}

.lab-statement .lab-eyebrow { color: #aaa; }

.lab-statement h2 {
  margin: 25px 0 0;
  font-size: clamp(44px, 5.7vw, 76px);
  font-weight: 500;
  line-height: 1.02;
  letter-spacing: -.07em;
}

.lab-statement h2 span { color: #777; }

.lab-statement-copy { color: #aaa; font-size: 13px; line-height: 2; }
.lab-statement-copy p { margin: 0 0 25px; }
.lab-statement .lab-text-link { color: white; border-color: #666; }

.lab-blog-grid { display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 20px; }

.lab-blog-card { display: flex; flex-direction: column; min-width: 0; }

.lab-blog-visual {
  height: 210px;
  position: relative;
  display: grid;
  place-items: center;
  overflow: hidden;
  background: #f2f2f0;
  transition: background .35s;
}

.lab-blog-card:hover .lab-blog-visual { background: #e9e9e6; }

.lab-blog-visual::before, .lab-blog-visual::after {
  content: '';
  position: absolute;
  width: 160px;
  height: 160px;
  border: 1px solid #d9d9d5;
  border-radius: 50%;
}

.lab-blog-visual::after { width: 110px; height: 110px; }

.lab-blog-glyph {
  position: relative;
  z-index: 1;
  width: 65px;
  height: 65px;
  display: grid;
  place-items: center;
  border: 1px solid #bdbdb7;
  border-radius: 50%;
  background: #f2f2f0;
}

.lab-blog-glyph svg {
  width: 25px;
  height: 25px;
  stroke-width: 1.2;
  transition: transform .45s;
}

.lab-blog-card:hover .lab-blog-glyph svg { transform: scale(1.12) rotate(-5deg); }

.lab-blog-meta {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin: 22px 0 13px;
  color: #858585;
  font-size: 9px;
  letter-spacing: .1em;
}

.lab-blog-card h3 {
  margin: 0;
  font-size: 21px;
  line-height: 1.35;
  font-weight: 600;
  letter-spacing: -.045em;
  transition: color .25s;
}

.lab-blog-card:hover h3 { color: #666; }

.lab-blog-card p {
  margin: 12px 0 22px;
  color: #747474;
  font-size: 12px;
  line-height: 1.85;
}

.lab-blog-card .lab-text-link { margin-top: auto; align-self: start; }

.lab-blog-note { margin-top: 30px; color: #999; font-size: 10px; line-height: 1.8; }

.lab-about { border-top: 1px solid var(--line); background: #fafaf9; }

.lab-about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 90px; }

.lab-about-grid h2 {
  margin: 22px 0 0;
  font-size: clamp(40px, 4.6vw, 62px);
  font-weight: 500;
  line-height: 1.07;
  letter-spacing: -.065em;
}

.lab-about-copy { padding-top: 10px; }

.lab-about-copy > p {
  margin: 0 0 20px;
  color: #666;
  font-size: 13px;
  line-height: 2;
}

.lab-principles { margin-top: 34px; border-top: 1px solid #e5e5e2; }

.lab-principle {
  display: grid;
  grid-template-columns: 40px 1fr;
  gap: 15px;
  padding: 19px 0;
  border-bottom: 1px solid #e5e5e2;
}

.lab-principle > span { color: #999; font-size: 10px; }

.lab-principle h3 { margin: 0 0 5px; font-size: 13px; font-weight: 600; }

.lab-principle p { margin: 0; color: #7b7b7b; font-size: 11px; line-height: 1.8; }

.lab-contact { padding: 95px 0; }

.lab-contact-inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 70px;
  padding: 48px;
  background: var(--soft);
}

.lab-contact h2 {
  margin: 20px 0;
  font-size: clamp(38px, 4.5vw, 57px);
  font-weight: 500;
  line-height: 1.06;
  letter-spacing: -.065em;
}

.lab-contact-copy { color: #707070; font-size: 12px; line-height: 1.9; }

.lab-contact-links { display: flex; flex-direction: column; margin-top: 25px; }

.lab-contact-link {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 18px 0;
  border-bottom: 1px solid #e1e1de;
  font-size: 12px;
  transition: padding .25s;
}

.lab-contact-link:hover { padding-left: 7px; }
.lab-contact-link svg { width: 16px; height: 16px; }

.lab-footer { border-top: 1px solid var(--line); }

.lab-footer-main {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 30px;
  padding: 34px 0;
}

.lab-footer-brand { display: flex; align-items: center; gap: 22px; }
.lab-footer-brand p { color: #777; font-size: 10px; line-height: 1.8; }

.lab-footer-nav { display: flex; flex-wrap: wrap; gap: 24px; }
.lab-footer-nav a { color: #666; font-size: 10px; transition: color .2s; }
.lab-footer-nav a:hover { color: black; }

.lab-footer-bottom {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  padding: 17px 0;
  border-top: 1px solid var(--line);
  color: #929292;
  font-size: 9px;
}

.lab-reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity .75s cubic-bezier(.2,.65,.3,1), transform .75s cubic-bezier(.2,.65,.3,1);
}

.lab-reveal.visible { opacity: 1; transform: translateY(0); }
.lab-delay-1 { transition-delay: .09s; }
.lab-delay-2 { transition-delay: .18s; }
.lab-delay-3 { transition-delay: .27s; }

@keyframes lab-enter {
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes lab-orbit { to { transform: rotate(360deg); } }

@keyframes lab-float {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}

@keyframes lab-bob {
  0%,100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

@media (max-width: 1050px) {
  .lab-header { padding: 0 30px; }
  .lab-container { width: calc(100% - 60px); }
  .lab-nav { gap: 19px; }
  .lab-hero { gap: 35px; padding-top: 80px; }
  .lab-hero-art { min-height: 360px; }
  .lab-model-row { grid-template-columns: 35px 1fr 1fr 30px; gap: 17px; }
  .lab-status { display: none; }
  .lab-statement-inner, .lab-about-grid { gap: 50px; }
  .lab-contact-inner { gap: 40px; padding: 35px; }
}

@media (max-width: 760px) {
  html { scroll-padding-top: 72px; }

  .lab-header { height: 68px; padding: 0 22px; }
  .lab-container { width: calc(100% - 44px); }
  .lab-brand-top { font-size: 27px; }
  .lab-brand-bottom { font-size: 17px; }
  .lab-nav, .lab-header > .lab-nav-cta { display: none; }
  .lab-mobile-toggle { display: grid; place-items: center; }

  .lab-hero { grid-template-columns: 1fr; padding: 65px 0 55px; gap: 45px; }
  .lab-hero h1 { font-size: clamp(55px, 12vw, 79px); margin-top: 27px; }
  .lab-lead { font-size: 14px; }
  .lab-hero-art { min-height: 340px; }

  .lab-marquee-inner { grid-template-columns: 1fr; gap: 18px; padding: 22px 0; }
  .lab-marquee-item:not(:first-child) { padding-left: 0; border-left: 0; }

  .lab-section { padding: 76px 0; }
  .lab-section-heading { flex-direction: column; align-items: start; gap: 18px; margin-bottom: 30px; }
  .lab-section h2 { font-size: clamp(38px, 9vw, 53px); }
  .lab-section-intro { font-size: 12px; }

  .lab-research-grid { grid-template-columns: 1fr; }
  .lab-research-card { min-height: auto; padding: 25px 22px 28px; }
  .lab-card-top { margin-bottom: 29px; }
  .lab-research-card h3 { font-size: 22px; }

  .lab-model-row { grid-template-columns: 30px 1fr 24px; gap: 12px; padding: 21px 0; }
  .lab-model-desc { grid-column: 2; font-size: 11px; }
  .lab-model-arrow { grid-column: 3; grid-row: 1; }
  .lab-model-title { gap: 11px; }
  .lab-model-title h3 { font-size: 13px; }
  .lab-model-symbol { width: 34px; height: 34px; }

  .lab-statement-inner { grid-template-columns: 1fr; gap: 35px; padding: 76px 0; }
  .lab-statement h2 { font-size: clamp(45px, 10vw, 65px); }

  .lab-blog-grid { grid-template-columns: 1fr; gap: 38px; }
  .lab-blog-visual { height: 230px; }
  .lab-blog-card h3 { font-size: 22px; }

  .lab-about-grid { grid-template-columns: 1fr; gap: 30px; }

  .lab-contact { padding: 65px 0; }
  .lab-contact-inner { grid-template-columns: 1fr; gap: 30px; padding: 27px 22px; }
  .lab-contact h2 { font-size: 45px; }

  .lab-footer-main { align-items: flex-start; flex-direction: column; gap: 26px; }
  .lab-footer-brand { align-items: flex-start; }
  .lab-footer-nav { gap: 18px; }
  .lab-footer-bottom { flex-direction: column; gap: 8px; }
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
  .lab-reveal { opacity: 1; transform: none; }
}
`;

function Brand() {
  return (
    <a className="lab-brand" href="#home" aria-label="LABDE home">
      <span className="lab-brand-top">Lab</span>
      <span className="lab-brand-bottom">DE</span>
    </a>
  );
}

function Eyebrow({ children }) {
  return <div className="lab-eyebrow">{children}</div>;
}

function Reveal({ children, className = "", delay = 0 }) {
  const [element, setElement] = useState(null);

  useEffect(() => {
    if (!element) return;

    if (!("IntersectionObserver" in window)) {
      element.classList.add("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("visible");
          observer.unobserve(element);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -25px 0px" }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [element]);

  return (
    <div
      ref={setElement}
      className={`lab-reveal ${delay ? `lab-delay-${delay}` : ""} ${className}`}
    >
      {children}
    </div>
  );
}

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="lab-section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2>{title}</h2>
      </div>
      {description && <p className="lab-section-intro">{description}</p>}
    </div>
  );
}

function HeroArtwork() {
  return (
    <div
      className="lab-hero-art"
      role="img"
      aria-label="Abstract representation of interconnected scientific research"
    >
      <div className="lab-art-grid" />
      <div className="lab-art-center"><Atom /></div>
      <div className="lab-art-node lab-node-one"><BrainCircuit /></div>
      <div className="lab-art-node lab-node-two"><Dna /></div>
      <div className="lab-art-node lab-node-three"><Cpu /></div>
      <div className="lab-art-node lab-node-four"><Network /></div>
      <span className="lab-art-caption">Science × Computation × Discovery</span>
      <span className="lab-scroll"><ArrowDown size={15} /></span>
    </div>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [headerScrolled, setHeaderScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setHeaderScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav = [
    ["Research", "#research"],
    ["Models", "#models"],
    ["About us", "#about"],
    ["Blog", "#blog"],
  ];

  return (
    <div className="lab-shell">
      <style>{css}</style>

      <header className={`lab-header ${headerScrolled ? "scrolled" : ""}`}>
        <Brand />

        <nav className="lab-nav" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <a key={label} href={href}>{label}</a>
          ))}
        </nav>

        <a className="lab-nav-cta" href="#contact">
          Get in touch <ArrowUpRight size={14} />
        </a>

        <button
          className="lab-mobile-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={23} /> : <Menu size={23} />}
        </button>

        {menuOpen && (
          <nav className="lab-mobile-panel" aria-label="Mobile navigation">
            {nav.map(([label, href]) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)}>
                {label} <ArrowUpRight size={14} />
              </a>
            ))}
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact <ArrowUpRight size={14} />
            </a>
          </nav>
        )}
      </header>

      <main>
        <section className="lab-container lab-hero" id="home">
          <div className="lab-hero-copy">
            <Eyebrow>Independent research center</Eyebrow>
            <h1>
              Expanding the
              <br />
              boundaries of
              <br />
              <span className="lab-muted">knowledge.</span>
            </h1>
            <p className="lab-lead">
              LABDE explores artificial intelligence, computational science
             and economics to investigate difficult problems and
              develop new ways of understanding the world.
            </p>
            <div className="lab-actions">
              <a href="#research" className="lab-btn">
                Explore our research <ArrowRight size={15} />
              </a>
              <a href="#about" className="lab-btn secondary">Who we are</a>
            </div>
          </div>
          <HeroArtwork />
        </section>

        <div className="lab-marquee">
          <div className="lab-container lab-marquee-inner">
            <div className="lab-marquee-item"><Atom /> Scientific inquiry</div>
            <div className="lab-marquee-item"><Layers3 /> Interdisciplinary research</div>
            <div className="lab-marquee-item"><Globe2 /> A global perspective</div>
          </div>
        </div>

        <section className="lab-container lab-section" id="research">
          <Reveal>
            <SectionHeading
              eyebrow="Research"
              title={<>Understanding more.<br />Discovering what’s next.</>}
              description="We investigate the intersection of disciplines, combining computational methods, scientific reasoning, and engineering to explore challenging questions."
            />
          </Reveal>

          <div className="lab-research-grid">
            {researchAreas.map((area, index) => {
              const Icon = area.icon;
              return (
                <Reveal key={area.number} delay={(index % 3) + 1}>
                  <article className="lab-research-card">
                    <div className="lab-card-top">
                      <span className="lab-number">{area.number} / 04</span>
                      <span className="lab-card-icon"><Icon /></span>
                    </div>
                    <h3>{area.title}</h3>
                    <p>{area.description}</p>
                    <div className="lab-tags">
                      {area.tags.map((tag) => (
                        <span className="lab-tag" key={tag}>{tag}</span>
                      ))}
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="lab-models" id="models">
          <div className="lab-container lab-section">
            <Reveal>
              <SectionHeading
                eyebrow="Models & systems"
                title={<>Research into<br />intelligent systems.</>}
                description="An overview of the research programs LABDE aims to develop. Each program represents an area of exploration, not a claim that a production model is already available."
              />
            </Reveal>

            <div className="lab-model-list">
              {models.map((model, index) => {
                const Icon = model.icon;
                return (
                  <Reveal key={model.id} delay={(index % 3) + 1}>
                    <article className="lab-model-row">
                      <span className="lab-model-index">{model.id}</span>
                      <div className="lab-model-title">
                        <span className="lab-model-symbol"><Icon /></span>
                        <div>
                          <h3>{model.name}</h3>
                          <small>{model.category} · Research program</small>
                        </div>
                      </div>
                      <p className="lab-model-desc">{model.description}</p>
                      <span className="lab-status">{model.status}</span>
                      <ArrowUpRight className="lab-model-arrow" size={17} />
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <p className="lab-model-note">
              Program names and descriptions are illustrative. Add links to
              model cards, documentation, source code, or demos as these become available.
            </p>
          </div>
        </section>

        <section className="lab-statement">
          <div className="lab-container lab-statement-inner">
            <Reveal>
              <Eyebrow>Our perspective</Eyebrow>
              <h2>
                The future is
                <br />
                <span>not simply predicted.</span>
                <br />
                It is investigated.
              </h2>
            </Reveal>
            <Reveal delay={2}>
              <div className="lab-statement-copy">
                <p>
                  Progress emerges when curiosity meets rigorous methods.
                  We believe research should connect fundamental questions
                  with practical tools, and local talent with global
                  scientific communities.
                </p>
                <p>
                  Our ambition is to contribute to a world in which more
                  people can participate in scientific and technological discovery.
                </p>
                <a className="lab-text-link" href="#about">
                  Our approach <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="lab-container lab-section" id="blog">
          <Reveal>
            <SectionHeading
              eyebrow="Ideas & perspectives"
              title={<>Thinking in public.</>}
              description="Notes on science, technology, economics, and the questions that shape the future of research."
            />
          </Reveal>

          <div className="lab-blog-grid">
            {articles.map((article, index) => {
              const Icon = article.icon;
              return (
                <Reveal key={article.title} delay={index + 1}>
                  <article className="lab-blog-card">
                    <a
                      className="lab-blog-visual"
                      href="#contact"
                      aria-label={`Contact us about: ${article.title}`}
                    >
                      <span className="lab-blog-glyph"><Icon /></span>
                    </a>
                    <div className="lab-blog-meta">
                      <span>{article.category}</span>
                      <span>NOTE {article.date}</span>
                    </div>
                    <h3>{article.title}</h3>
                    <p>{article.excerpt}</p>
                    <a className="lab-text-link" href="#contact">
                      Research perspective <ArrowRight size={14} />
                    </a>
                  </article>
                </Reveal>
              );
            })}
          </div>
          <p className="lab-blog-note">
            These are proposed editorial topics, not published articles.
            Replace them with actual posts when the blog launches.
          </p>
        </section>

        <section className="lab-about" id="about">
          <div className="lab-container lab-section">
            <div className="lab-about-grid">
              <Reveal>
                <Eyebrow>Who we are</Eyebrow>
                <h2>
                  Independent in
                  <br />
                  thought. Connected
                  <br />
                  <span className="lab-muted">by curiosity.</span>
                </h2>
              </Reveal>

              <Reveal delay={2}>
                <div className="lab-about-copy">
                  <p>
                    LABDE is an independent research initiative focused on
                    the intersection of science, computation, and technology.
                    We aim to investigate difficult problems and develop
                    methods that make knowledge more useful and accessible.
                  </p>
                  <p>
                    Based in Paraguay, we aspire to participate in global
                    scientific conversations while contributing to the
                    development of research capacity in Latin America.
                  </p>
                  <p>
                    Our approach is interdisciplinary: we connect ideas
                    across fields rather than treating scientific,
                    technological, and economic questions in isolation.
                  </p>

                  <div className="lab-principles">
                    <div className="lab-principle">
                      <span>01</span>
                      <div>
                        <h3>Scientific rigor</h3>
                        <p>Evidence, reproducibility, and intellectual honesty.</p>
                      </div>
                    </div>
                    <div className="lab-principle">
                      <span>02</span>
                      <div>
                        <h3>Open inquiry</h3>
                        <p>Curiosity without disciplinary boundaries.</p>
                      </div>
                    </div>
                    <div className="lab-principle">
                      <span>03</span>
                      <div>
                        <h3>Meaningful impact</h3>
                        <p>Research connected to real problems and people.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="lab-container lab-contact" id="contact">
          <div className="lab-contact-inner">
            <Reveal>
              <Eyebrow>Start a conversation</Eyebrow>
              <h2>
                Every discovery
                <br />
                begins with
                <br />
                a question.
              </h2>
              <p className="lab-contact-copy">
                Interested in research, scientific collaboration, or
                exchanging ideas? We welcome conversations with researchers,
                engineers, students, and institutions.
              </p>
            </Reveal>

            <Reveal delay={2}>
              <div className="lab-contact-links">
                <a className="lab-contact-link" href="mailto:hello@labde.org">
                  <span><Mail size={16} style={{ verticalAlign: "middle", marginRight: 12 }} /> General inquiries</span>
                  <ArrowUpRight />
                </a>
                <a className="lab-contact-link" href="mailto:research@labde.org">
                  <span><FlaskConical size={16} style={{ verticalAlign: "middle", marginRight: 12 }} /> Research collaborations</span>
                  <ArrowUpRight />
                </a>
                <a
                  className="lab-contact-link"
                  href="https://github.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span><GitBranch size={16} style={{ verticalAlign: "middle", marginRight: 12 }} /> Open-source research</span>
                  <ArrowUpRight />
                </a>
              </div>
              <p className="lab-model-note">
                Replace the example email addresses and GitHub destination
                with official LABDE accounts before publishing.
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="lab-footer">
        <div className="lab-container">
          <div className="lab-footer-main">
            <div className="lab-footer-brand">
              <Brand />
              <p>Independent research.<br />Shared knowledge.</p>
            </div>
            <nav className="lab-footer-nav" aria-label="Footer navigation">
              <a href="#research">Research</a>
              <a href="#models">Models</a>
              <a href="#about">About us</a>
              <a href="#blog">Blog</a>
              <a href="#contact">Contact</a>
            </nav>
          </div>
          <div className="lab-footer-bottom">
            <span>© {new Date().getFullYear()} LABDE</span>
            <span>Researching from Paraguay, connected to the world.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
