if(!self.define){let i,s={};const e=(e,n)=>(e=new URL(e+".js",n).href,s[e]||new Promise((s=>{if("document"in self){const i=document.createElement("script");i.src=e,i.onload=s,document.head.appendChild(i)}else i=e,importScripts(e),s()})).then((()=>{let i=s[e];if(!i)throw new Error(`Module ${e} didn’t register its module`);return i})));self.define=(n,l)=>{const r=i||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let o={};const c=i=>e(i,r),u={module:{uri:r},exports:o,require:c};s[r]=Promise.all(n.map((i=>u[i]||c(i)))).then((i=>(l(...i),o)))}}define(["./workbox-db5fc017"],(function(i){"use strict";i.setCacheNameDetails({prefix:"mvtime"}),self.addEventListener("message",(i=>{i.data&&"SKIP_WAITING"===i.data.type&&self.skipWaiting()})),i.precacheAndRoute([{url:"/css/192.1df17f4d.css",revision:null},{url:"/css/208.85e27b48.css",revision:null},{url:"/css/29.22821ac8.css",revision:null},{url:"/css/371.0f19f39a.css",revision:null},{url:"/css/400.84bb0208.css",revision:null},{url:"/css/72.30b9bcc5.css",revision:null},{url:"/css/984.c36f2533.css",revision:null},{url:"/css/app.c9cd7bd8.css",revision:null},{url:"/img/add.26c186da.svg",revision:null},{url:"/img/add.69c298e9.svg",revision:null},{url:"/img/arrow-left.f0f6e9ed.svg",revision:null},{url:"/img/arrow-right.b158c98b.svg",revision:null},{url:"/img/cal-icon-alt.3a7faeef.svg",revision:null},{url:"/img/cal-icon.c98af1ed.svg",revision:null},{url:"/img/create.f85db708.svg",revision:null},{url:"/img/error-icon.c5bc41dd.svg",revision:null},{url:"/img/favicon/favicon-128.png",revision:"646d8f3b904f7941dedb546cd6fd99c8"},{url:"/img/favicon/favicon-256.png",revision:"d4605e66aff8199c21f36d79975f1e08"},{url:"/img/favicon/favicon-50.png",revision:"852254a3e938fbdb532581335d7f7846"},{url:"/img/favicon/favicon-64.png",revision:"cc2d23cc2a176e6a679f727fbfcb1bca"},{url:"/img/favicon/favicon.svg",revision:"e9496d6dc667d7d227066915fbd9b7aa"},{url:"/img/general/user-icon.png",revision:"27c4e474ced2e8b9c2bfdb606f1822c6"},{url:"/img/info-locked-icon.0b9144cc.svg",revision:null},{url:"/img/info-unlocked-icon.1ea710d7.svg",revision:null},{url:"/img/info.f44f3ac0.svg",revision:null},{url:"/img/logout.3e85d292.svg",revision:null},{url:"/img/menu-close-icon.421663a4.svg",revision:null},{url:"/img/menu-icon.59a84447.svg",revision:null},{url:"/img/popup-out.733b7d2b.svg",revision:null},{url:"/img/remove.dedbe003.svg",revision:null},{url:"/img/settings.4d695786.svg",revision:null},{url:"/img/ss/login-narrow-light.png",revision:"d537401043d2a56b7bdd3ee81b22e54a"},{url:"/img/ss/login-narrow.png",revision:"695c86ab3026feb5d1faf6cf2b808207"},{url:"/img/ss/login-wide.png",revision:"500e07b9d307ce5d8cb00d4ac3a0e29f"},{url:"/img/ss/portal-narrow.png",revision:"08ccdd749cda0f451b3f55d24d24f130"},{url:"/img/ss/portal-wide-light.png",revision:"e979ae09b19ea7e7dbdc41f86e8a96e2"},{url:"/img/ss/portal-wide.png",revision:"9f8c2c8ec0ab558783a75aedc0ded5e0"},{url:"/img/ss/test-narrow-light.png",revision:"8aad57e267176f1fe2844d8355894bdc"},{url:"/img/ss/test-narrow.png",revision:"248235558a2e38cde9cd33f21a9ee72d"},{url:"/img/success-icon.53e866c5.svg",revision:null},{url:"/img/test-icon.d01e01a2.svg",revision:null},{url:"/img/unimplemented-icon.5a21c0ed.svg",revision:null},{url:"/img/warning-icon.5869cd08.svg",revision:null},{url:"/index.html",revision:"3c97672b22e8007f719c6e1c9e86ede1"},{url:"/js/192.0d7f98ec.js",revision:null},{url:"/js/208.e4d55caa.js",revision:null},{url:"/js/277.04cafac2.js",revision:null},{url:"/js/29.d3dd9da7.js",revision:null},{url:"/js/364.06a572e1.js",revision:null},{url:"/js/371.305a1d68.js",revision:null},{url:"/js/400.38bff73c.js",revision:null},{url:"/js/72.031ab83c.js",revision:null},{url:"/js/984.0e929757.js",revision:null},{url:"/js/app.40844149.js",revision:null},{url:"/js/chunk-vendors.afd15121.js",revision:null},{url:"/manifest.json",revision:"fbf2bdf31b89df11037fa20852aa8b26"},{url:"/og/hero-img.png",revision:"8a8ea4376c20640fc5cf1c41e1b59fbd"},{url:"/robots.txt",revision:"735ab4f94fbcd57074377afca324c813"}],{})}));
//# sourceMappingURL=service-worker.js.map
