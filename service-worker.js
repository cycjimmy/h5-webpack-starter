if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const c=e=>n(e,r),t={module:{uri:r},exports:o,require:c};i[r]=Promise.all(s.map((e=>t[e]||c(e)))).then((e=>(l(...e),o)))}}define(["./workbox-cbbbbfe9"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./favicon.ico",revision:"91cc61c2c328a3f972a956bbfcb70e23"},{url:"./images/faa81ee5a2be.png",revision:null},{url:"./index.html",revision:"e4aceac03fe88c7e11f0b68cdd56534e"},{url:"./scripts/load.bundle.9d2073e9.min.js",revision:null},{url:"./scripts/main.bundle.145864cd.min.js",revision:null},{url:"./scripts/runtime.bundle.9b059ef7.min.js",revision:null},{url:"./style/load.9d2073e9.min.css",revision:null},{url:"./style/main.145864cd.min.css",revision:null}],{})}));
