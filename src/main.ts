import { getForecast, mapForecastData } from "./utils/useWeatherApi.ts"

export default (() => {
  if (!document) return
  // Create a class for the element
class MyWeather extends HTMLElement {
  doRender: boolean
  forecastMarkup: string
  contentDiv: any
  
  constructor() {
    // Always call super first in constructor
    super()
    this.doRender = true
    this.contentDiv = <HTMLElement>document.createElement('div')
    this.contentDiv.classList.add('periodContainer')
    this.contentDiv.setAttribute('style', 'display:flex;')
    this.contentDiv.innerText = 'loading'
    this.forecastMarkup = ''
  }
  
  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" })
    shadow.innerHTML = `<style>
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
    `
    shadow.appendChild(this.contentDiv)
    
    getForecast(this.getAttribute('lat'), this.getAttribute('lng')).then((forecast: { periods: any; }) => {
      const forecastData = mapForecastData(forecast)
      this.buildUi(forecastData).render()
    })
  }
  
  render() {
    this.doRender = false
    this.contentDiv.innerHTML = this.forecastMarkup
  }
  
  
  buildUi(forecastData: any[]) {
    this.forecastMarkup = forecastData.map((periodData: { name: any; temperature: any }) => {
      return `<div class="periodCard"><div>${periodData.name}</div><div class="temperature">${periodData.temperature}</div></div>`
    }).join('')
    return this
  }
}
  customElements.define("my-weather", MyWeather);
})()