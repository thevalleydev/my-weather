(function(s,t){typeof exports=="object"&&typeof module<"u"?module.exports=t():typeof define=="function"&&define.amd?define(t):(s=typeof globalThis<"u"?globalThis:s||self,s.MyWeather=t())})(this,function(){"use strict";var p=Object.defineProperty;var u=(s,t,r)=>t in s?p(s,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):s[t]=r;var i=(s,t,r)=>(u(s,typeof t!="symbol"?t+"":t,r),r);return(()=>{class t extends HTMLElement{constructor(){super();i(this,"weatherApiUrl");i(this,"doRender");i(this,"forecastData");i(this,"forecastMarkup");i(this,"contentDiv");i(this,"getForecast");i(this,"getForecastUrl");this.weatherApiUrl=`https://api.weather.gov/points/${this.lat},${this.lng}`,this.doRender=!0,this.contentDiv=document.createElement("div"),this.contentDiv.classList.add("periodContainer"),this.contentDiv.setAttribute("style","display:flex;"),this.contentDiv.innerText="content goes here",this.forecastData=[],this.forecastMarkup="",this.getForecast=async e=>{console.log("url",e);const n=await(await fetch(e)).json();return n==null?void 0:n.properties},this.getForecastUrl=async()=>{var n;const a=await(await fetch(this.weatherApiUrl)).json();return this.getForecast((n=a==null?void 0:a.properties)==null?void 0:n.forecast)}}get lat(){return this.getAttribute("lat")}get lng(){return this.getAttribute("lng")}connectedCallback(){const e=this.attachShadow({mode:"open"});e.innerHTML=`<style>
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
    `,e.appendChild(this.contentDiv)}attributeChangedCallback(){this.lat&&this.lng&&this.doRender&&(this.doRender=!1,this.getForecastUrl().then(e=>{this.mapData(e).buildUi().render()}))}render(){console.log(this.forecastMarkup),this.contentDiv.innerHTML=this.forecastMarkup}mapData(e){const{periods:a}=e;return this.forecastData=a.slice(0,3).map(n=>{const{name:o,temperature:c,temperatureUnit:d,windSpeed:h,shortForecast:l}=n;return{name:o,temperature:c,temperatureUnit:d,windSpeed:h,shortForecast:l}}),this}buildUi(){return this.forecastMarkup=this.forecastData.map(e=>`<div class="periodCard"><div>${e.name}</div><div class="temperature">${e.temperature}</div></div>`).join(""),this}}i(t,"observedAttributes",["lat","lng"]),customElements.define("my-weather",t)})()});
