if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const t=e=>n(e,r),u={module:{uri:r},exports:o,require:t};i[r]=Promise.all(s.map((e=>u[e]||t(e)))).then((e=>(l(...e),o)))}}define(["./workbox-29b0ed90"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./favicon.ico",revision:"91cc61c2c328a3f972a956bbfcb70e23"},{url:"./images/faa81ee5a2be.png",revision:null},{url:"./index.html",revision:"cfee543e84dbd532e9fe94bff753e2af"},{url:"./scripts/load.bundle.d0b9812c.min.js",revision:null},{url:"./scripts/main.bundle.8de9c036.min.js",revision:null},{url:"./scripts/runtime.bundle.48631923.min.js",revision:null},{url:"./style/load.d0b9812c.min.css",revision:null},{url:"./style/main.8de9c036.min.css",revision:null}],{})}));
