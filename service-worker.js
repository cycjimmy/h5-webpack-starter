if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(i[r])return;let o={};const t=e=>n(e,r),u={module:{uri:r},exports:o,require:t};i[r]=Promise.all(s.map((e=>u[e]||t(e)))).then((e=>(l(...e),o)))}}define(["./workbox-25b15de9"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"./favicon.ico",revision:"91cc61c2c328a3f972a956bbfcb70e23"},{url:"./images/faa81ee5a2be.png",revision:null},{url:"./index.html",revision:"b55fa3691e4cc2218785b87774bade2f"},{url:"./scripts/load.bundle.96774c6d.min.js",revision:null},{url:"./scripts/main.bundle.df2deaab.min.js",revision:null},{url:"./scripts/runtime.bundle.6005037a.min.js",revision:null},{url:"./style/load.96774c6d.min.css",revision:null},{url:"./style/main.df2deaab.min.css",revision:null}],{})}));
