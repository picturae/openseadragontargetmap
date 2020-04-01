!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e=e||self).openSeadragonDeltaEMap=t()}(this,(function(){"use strict";const e=function(e,t){return Number(Math.round(e+"e"+t)+"e-"+t)},t=function(e){return"string"==typeof e||"number"==typeof e||"boolean"==typeof e},i=function(e){return e&&(e.getRootNode()instanceof Document||e.getRootNode()instanceof ShadowRoot)},n=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r=function(e,t,i){this.name="Patch",this.element=document.createElement("deltaepatch"),this.element.style.left=`${100*e.location.x/i.x}%`,this.element.style.top=`${100*e.location.y/i.y}%`,this.element.style.width=`${100*e.location.w/i.x}%`,this.element.style.height=`${100*e.location.h/i.y}%`,t.appendChild(this.element);let r={};for(let[t,i]of Object.entries(e))"location"!==t&&(r[t]=i);if(this.element.dataset.picturaeDeltaemapDisplay=JSON.stringify(r),r.validity&&n(r.validity,"valid")){const e=r.validity.valid;this.element.classList.add(e?"valid":"invalid")}},s=function(e,t,i){if(this.name="Chart",this.element=document.createElement("deltaechart"),this.element.style.left=`${100*e.location.x/i.x}%`,this.element.style.top=`${100*e.location.y/i.y}%`,this.element.style.width=`${100*e.location.w/i.x}%`,this.element.style.height=`${100*e.location.h/i.y}%`,e.location.r&&180===e.location.r){this.element.style.transformOrigin="center center";const t=`rotate(${e.location.r}deg)`;this.element.style.transform=t}t.appendChild(this.element);let s={};for(let[t,i]of Object.entries(e))"location"!==t&&"colorPatches"!==t&&"edgePatches"!==t&&(s[t]=i);if(this.element.dataset.picturaeDeltaemapDisplay=JSON.stringify(s),s.validity&&n(s.validity,"valid")){const e=s.validity.valid;this.element.classList.add(e?"valid":"invalid")}this.patches=[];const l={x:e.location.w,y:e.location.h};e.colorPatches&&e.colorPatches.forEach(e=>{e.patchType="color",this.patches.push(new r(e,this.element,l))})},l=e=>Boolean(e&&"string"==typeof e&&1===e.length),o=e=>l(e)&&Boolean(e.match(/[0-9]/)),a=e=>l(e)&&e.toLowerCase()!==e.toUpperCase(),d=e=>l(e)&&e===e.toLowerCase()&&e!==e.toUpperCase(),c=e=>l(e)&&e===e.toUpperCase()&&e!==e.toLowerCase(),p={delimit:[],preserve:[],replace:{},delimitInput:"",delimitLetterNumber:!0,delimitLowerUpper:!0,delimitNumberLetter:!0,delimitUpperLower:!1,delimitUpperUpperLower:!0,delimitOutput:" "},h={postProcess:e=>e,firstWordFirstChar:e=>e,firstWordNextChars:e=>e,nextWordsFirstChar:e=>e,nextWordsNextChars:e=>e},m=(e,t)=>{const i=new RegExp("^"+t),n=new RegExp(t+"$"),r=new RegExp(t+t,"g");return e.replace(i,"").replace(n,"").replace(r,t)},u=(e,t,i,n)=>{let r,s,l,p,h;return r=n.delimitLetterNumber&&a(e)&&o(t),s=n.delimitLowerUpper&&d(e)&&c(t),l=n.delimitNumberLetter&&o(e)&&a(t),p=n.delimitUpperLower&&c(e)&&d(t),h=n.delimitUpperUpperLower&&c(e)&&c(t)&&d(i),r||s||l||p||h},f=e=>(e=>e.replace(/‘’`/g,"'").replace(/“”/g,'"'))(e).replace(/[…,:;[\](){}\-‐–—'".!?]/g,""),y=function(e,t){if(!e)return;const i=Object.assign({},p,t);this.orgin={input:e},e=e.trim().replace(/\s+/g," "),i.delimitInput?this.orgin.normalised=m(e,i.delimitInput):this.orgin.normalised=e,this.orgin.isPureAlphaNumeric=(e=>e&&e.split&&!e.split("").some(e=>!a(e)&&!o(e)))(this.orgin.normalised);let n,r=this.orgin.normalised;n=i.delimitInput?i.delimitInput:(this.orgin.isPureAlphaNumeric,i.delimitOutput);const s=Object.entries(i.replace);if(i.replace&&s.length)for(let[e,t]of s)r=r.replace(new RegExp(e,"g"),t);const l=[].concat(i.preserve,i.delimit);if(l.length&&(l.forEach(e=>{r=r.replace(new RegExp(e,"g"),n+e+n)}),r=m(r,n)),i.delimitInput)this.phrase=r,this.words=r.split(i.delimitInput);else if(this.orgin.isPureAlphaNumeric){let e=r.split(i.delimitOutput);this.phrase=e.map(e=>i.preserve.includes(e)?e:((e,t)=>{let i=e[0];for(let n=1;n<e.length;n++)u(e[n-1],e[n],e[n+1]||"",t)&&(i+=t.delimitOutput),i+=e[n];return i})(e,i)).join(i.delimitOutput),this.words=this.phrase.split(i.delimitOutput)}else this.phrase=r,this.words=r.split(i.delimitOutput);const d=e=>e.toLowerCase(),c=e=>e.toUpperCase(),y=e=>{let t=this.words.map((t,n)=>0===n?i.preserve.includes(t)?t:e.firstWordFirstChar(t.substr(0,1))+e.firstWordNextChars(t.substr(1)):i.preserve.includes(t)?t:e.nextWordsFirstChar(t.substr(0,1))+e.nextWordsNextChars(t.substr(1)));return e.postProcess(t.join(e.delimitOutput))};this.camelCase=()=>{const e=Object.assign({},h,{postProcess:f,delimitOutput:"",firstWordFirstChar:d,firstWordNextChars:d,nextWordsFirstChar:c,nextWordsNextChars:d});return y(e)},this.humanTitle=()=>{const e=Object.assign({},h,{delimitOutput:" ",firstWordFirstChar:c,nextWordsFirstChar:c});return y(e)}};function g(e,t){return t||(t={}),new y(e,t)}const v=function(e){this.name="DisplayTable";const r=document.body,s=document.documentElement,l=e.parentNode,o=document.createElement("table");this.element=o,o.className="picturae-deltaemap-display";const a=e=>{if(null===e)return"--";if("boolean"==typeof e){return`<deltaeboolean class="${e?"valid":"invalid"}"></deltaeboolean>`}if(t(e))return e;if(e instanceof Array&&e.length){if(t(e[0]))return e.join(", ");if("object"==typeof e[0]){let t="";for(let i=0;i<e.length;i++)t+=a(e[i]);return t}}if("object"==typeof e&&!(e instanceof Array)){let t="";for(let[i,n]of Object.entries(e)){let e="";e="boolean"==typeof n?`${a(n)} ${g(i).humanTitle()}<br/>`:`${g(i).humanTitle()}: ${a(n)}<br/>`,e&&(t+=e)}return t+""}},d=(e,t)=>{let i=`<tbody name="${e}">`;for(let[e,n]of Object.entries(t)){let t="";t=`<tr><th>${g(e,{replace:{deltaE:"&Delta;E",DeltaE:"&Delta;E",deltaL:"&Delta;L",DeltaL:"&Delta;L"}}).humanTitle()}</th><td>${a(n)}</td></tr>`,t&&(i+=t)}return i+="</tbody>",i};r.addEventListener("mouseover",(function(e){const t=e.target;"DELTAEOVERLAY"===t.tagName||"DELTAECHART"===t.tagName||"DELTAEPATCH"===t.tagName?function(e){const t=e.target.dataset.picturaeDeltaemapDisplay;if(t){o.innerHTML="";const e=JSON.parse(t);let r="";if(e.patchType&&"color"===e.patchType){r=`<deltaecolor style="background: ${`rgb(${e.observed.RGB.join()})`};"></deltaecolor>`}if(o.innerHTML+=`<caption>\n                ${e.name} ${r}\n            </caption>`,e.assessed&&(o.innerHTML+=d("assessed",e.assessed)),e.observed&&(o.innerHTML+=d("observed",e.observed)),e.reference&&(o.innerHTML+=d("reference",e.reference)),e.validity){if(n(e.validity,"valid")){const t=e.validity.valid;o.classList.remove("valid","invalid"),o.classList.add(t?"valid":"invalid")}o.innerHTML+=d("validity",e.validity)}i(o)||l.appendChild(o)}}(e):o.contains(t)||i(o)&&l.removeChild(o),e.stopPropagation()})),r.addEventListener("mousemove",(function(e){e.clientX/s.clientWidth<.5?(o.style.left=`${e.clientX+16}px`,o.style.right="auto"):(o.style.left="auto",o.style.right=`${s.clientWidth-e.clientX+16}px`);const t=(s.clientHeight-o.clientHeight)/2;e.clientY<t-16?(o.style.top=`${e.clientY+16}px`,o.style.bottom="auto"):e.clientY<t+16+o.clientHeight?(o.style.top=`${t}px`,o.style.bottom="auto"):(o.style.top="auto",o.style.bottom=`${s.clientHeight-e.clientY+16}px`),e.stopPropagation()}))},b=function(t){this.name="Overlay",this.element=document.createElement("deltaeoverlay"),t.canvas.appendChild(this.element),this.resize=()=>{if(this.tiledImage=t.world.getItemAt(0),!this.tiledImage)return;const i=this.tiledImage.getBounds(),n=t.viewport.pixelFromPoint(i.getTopLeft()),r=t.viewport.pixelFromPoint(i.getBottomRight());if(!function(){let e=Boolean(arguments.length);return Array.from(arguments).forEach(t=>{e=e&&"number"==typeof t&&Number.isFinite(t)}),e}(n.x,n.y,r.x,r.y))return;const s=e(n.x,4),l=e(n.y,4),o=e(r.x-n.x,4),a=e(r.y-n.y,4);this.element.style.left=`${s}px`,this.element.style.top=`${l}px`,this.element.style.width=`${o}px`,this.element.style.height=`${a}px`},t.addHandler("animation",()=>{this.resize()}),t.addHandler("open",()=>{this.resize()}),t.addHandler("rotate",()=>{this.resize()}),t.addHandler("resize",()=>{this.resize()}),this.resize(),this.charts=[],this.render=e=>{this.element.innerHTML="",e.name||(e.name="Target Scan");let t={};for(let[i,n]of Object.entries(e))"targets"!==i&&(t[i]=n);if(this.element.dataset.picturaeDeltaemapDisplay=JSON.stringify(t),t.validity&&n(t.validity,"valid")){const e=t.validity.valid;this.element.classList.add(e?"valid":"invalid")}e.targets.forEach(e=>{this.charts.push(new s(e,this.element,this.tiledImage.getContentSize()))})},new v(this.element)};return function(){var e=window.OpenSeadragon;if(!e&&!(e=require("openseadragon")))throw new Error("OpenSeadragon is missing.");e.Viewer.prototype.deltaEMap=function(){return this._deltaEMap||(this._deltaEMap=new b(this)),this._deltaEMap}}()}));
//# sourceMappingURL=openSeadragonDeltaEMap.js.map
