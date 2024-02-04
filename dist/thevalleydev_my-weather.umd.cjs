(function(n,e){typeof exports=="object"&&typeof module<"u"?module.exports=e():typeof define=="function"&&define.amd?define(e):(n=typeof globalThis<"u"?globalThis:n||self,n.MyWeather=e())})(this,function(){"use strict";var u=Object.defineProperty;var f=(n,e,i)=>e in n?u(n,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):n[e]=i;var c=(n,e,i)=>(f(n,typeof e!="symbol"?e+"":e,i),i);const n="https://api.weather.gov",e=async(r,o)=>{const a=await fetch(`${n}/points/${r},${o}`),{properties:t}=await a.json();return t==null?void 0:t.forecast},i=async(r,o)=>{const a=await e(r,o),t=await fetch(a),{properties:s}=await t.json();return s},h=r=>{const{periods:o}=r;return o.slice(0,3).map(a=>{const{name:t,temperature:s,temperatureUnit:d,windSpeed:p,shortForecast:l}=a;return{name:t,temperature:s,temperatureUnit:d,windSpeed:p,shortForecast:l}})};return(()=>{if(!document)return;class r extends HTMLElement{constructor(){super();c(this,"doRender");c(this,"forecastMarkup");c(this,"contentDiv");this.doRender=!0,this.contentDiv=document.createElement("div"),this.contentDiv.classList.add("periodContainer"),this.contentDiv.setAttribute("style","display:flex;"),this.contentDiv.innerText="loading",this.forecastMarkup=""}connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=`<style>
      :host {
        font: 1.2rem sans-serif;
        max-width: 400px;
        display: block;
       }
       h1 {
         font-weight: 500;
       }
       .periodContainer {
         justify-content: space-between;
       }
       .periodCard {
         display: flex;
         flex-direction: column;
       }
       .temperature {
          text-align: center;
          font-size: 1.8rem;
          padding: .5rem;
       }
      </style>
      <h1><slot name="title">My Weather</slot></h1>
    `,t.appendChild(this.contentDiv),i(this.getAttribute("lat"),this.getAttribute("lng")).then(s=>{const d=h(s);this.buildUi(d).render()})}render(){this.doRender=!1,this.contentDiv.innerHTML=this.forecastMarkup}buildUi(t){return this.forecastMarkup=t.map(s=>`<div class="periodCard"><div>${s.name}</div><div class="temperature">${s.temperature}</div></div>`).join(""),this}}customElements.define("my-weather",r)})()});
