if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const c=e=>n(e,r),t={module:{uri:r},exports:o,require:c};i[r]=Promise.all(s.map((e=>t[e]||c(e)))).then((e=>(l(...e),o)))}}define(["./workbox-99aa7f72"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./favicon.ico",revision:"91cc61c2c328a3f972a956bbfcb70e23"},{url:"./images/faa81ee5a2be.png",revision:null},{url:"./index.html",revision:"69741ff03529ecfccfe5e503cceac45d"},{url:"./scripts/load.bundle.027fa9ff.min.js",revision:null},{url:"./scripts/main.bundle.47083208.min.js",revision:null},{url:"./scripts/runtime.bundle.6ac7d0da.min.js",revision:null},{url:"./style/load.027fa9ff.min.css",revision:null},{url:"./style/main.47083208.min.css",revision:null}],{})}));
