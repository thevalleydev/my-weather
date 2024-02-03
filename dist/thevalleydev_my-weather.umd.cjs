(function(s,e){typeof exports=="object"&&typeof module<"u"?module.exports=e():typeof define=="function"&&define.amd?define(e):(s=typeof globalThis<"u"?globalThis:s||self,s.MyWeather=e())})(this,function(){"use strict";var p=Object.defineProperty;var u=(s,e,r)=>e in s?p(s,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[e]=r;var i=(s,e,r)=>(u(s,typeof e!="symbol"?e+"":e,r),r);return(()=>{class e extends HTMLElement{constructor(){super();i(this,"weatherApiUrl");i(this,"doRender");i(this,"forecastData");i(this,"forecastMarkup");i(this,"contentDiv");i(this,"getForecast");i(this,"getForecastUrl");this.weatherApiUrl=`https://api.weather.gov/points/${this.lat},${this.lng}`,this.doRender=!0,this.contentDiv=document.createElement("div"),this.contentDiv.classList.add("periodContainer"),this.contentDiv.setAttribute("style","display:flex;"),this.contentDiv.innerText="content goes here",this.forecastData=[],this.forecastMarkup="",this.getForecast=async t=>{const n=await(await fetch(t)).json();return n==null?void 0:n.properties},this.getForecastUrl=async()=>{var n;const a=await(await fetch(this.weatherApiUrl)).json();return this.getForecast((n=a==null?void 0:a.properties)==null?void 0:n.forecast)}}get lat(){return this.getAttribute("lat")}get lng(){return this.getAttribute("lng")}set lat(t){this.lat=t}set lng(t){this.lng=t}connectedCallback(){const t=this.attachShadow({mode:"open"});t.innerHTML=`<style>
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
    `,t.appendChild(this.contentDiv)}attributeChangedCallback(){this.lat&&this.lng&&this.doRender&&(this.doRender=!1,this.getForecastUrl().then(t=>{this.mapData(t).buildUi().render()}))}render(){this.contentDiv.innerHTML=this.forecastMarkup}mapData(t){const{periods:a}=t;return this.forecastData=a.slice(0,3).map(n=>{const{name:o,temperature:c,temperatureUnit:h,windSpeed:d,shortForecast:l}=n;return{name:o,temperature:c,temperatureUnit:h,windSpeed:d,shortForecast:l}}),this}buildUi(){return this.forecastMarkup=this.forecastData.map(t=>`<div class="periodCard"><div>${t.name}</div><div class="temperature">${t.temperature}</div></div>`).join(""),this}}i(e,"observedAttributes",["lat","lng"]),customElements.define("my-weather",e)})()});
