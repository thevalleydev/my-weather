(function(t,e){typeof exports=="object"&&typeof module<"u"?module.exports=e():typeof define=="function"&&define.amd?define(e):(t=typeof globalThis<"u"?globalThis:t||self,t.MyWeather=e())})(this,function(){"use strict";var l=Object.defineProperty;var u=(t,e,a)=>e in t?l(t,e,{enumerable:!0,configurable:!0,writable:!0,value:a}):t[e]=a;var r=(t,e,a)=>(u(t,typeof e!="symbol"?e+"":e,a),a);return(()=>{class e extends HTMLElement{constructor(){super();r(this,"weatherApiUrl");r(this,"doRender");r(this,"forecastData");r(this,"forecastMarkup");r(this,"contentDiv");r(this,"getForecast");r(this,"getForecastUrl");this.doRender=!0,this.weatherApiUrl=`https://api.weather.gov/points/${this.getAttribute("lat")},${this.getAttribute("lng")}`,this.contentDiv=document.createElement("div"),this.contentDiv.classList.add("periodContainer"),this.contentDiv.setAttribute("style","display:flex;"),this.contentDiv.innerText="loading",this.forecastData=[],this.forecastMarkup="",this.getForecast=async s=>{const n=await(await fetch(s)).json();return n==null?void 0:n.properties},this.getForecastUrl=async()=>{var n;const i=await(await fetch(this.weatherApiUrl)).json();return this.getForecast((n=i==null?void 0:i.properties)==null?void 0:n.forecast)}}connectedCallback(){const s=this.attachShadow({mode:"open"});s.innerHTML=`<style>
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
    `,s.appendChild(this.contentDiv),this.getForecastUrl().then(i=>{this.mapData(i).buildUi().render()})}render(){this.doRender=!1,this.contentDiv.innerHTML=this.forecastMarkup}mapData(s){const{periods:i}=s;return this.forecastData=i.slice(0,3).map(n=>{const{name:o,temperature:c,temperatureUnit:d,windSpeed:h,shortForecast:p}=n;return{name:o,temperature:c,temperatureUnit:d,windSpeed:h,shortForecast:p}}),this}buildUi(){return this.forecastMarkup=this.forecastData.map(s=>`<div class="periodCard"><div>${s.name}</div><div class="temperature">${s.temperature}</div></div>`).join(""),this}}document&&(window.onload=()=>{customElements.define("my-weather",e)})})()});
