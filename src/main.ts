export default (() => {
  if (!document) return
  // Create a class for the element
class MyWeather extends HTMLElement {
  weatherApiUrl: string
  doRender: boolean
  forecastData: Array<any>
  forecastMarkup: string
  contentDiv: any
  getForecast: any
  getForecastUrl: any
  
  constructor() {
    // Always call super first in constructor
    super()
    this.doRender = true
    this.weatherApiUrl = ''
    this.contentDiv = <HTMLElement>document.createElement('div')
    this.contentDiv.classList.add('periodContainer')
    this.contentDiv.setAttribute('style', 'display:flex;')
    this.contentDiv.innerText = 'loading'
    this.forecastData = []
    this.forecastMarkup = ''
    
    this.getForecast = async (url: RequestInfo | URL) => {
        const response = await fetch(url)
        const weather = await response.json()
        return weather?.properties
    }
    this.getForecastUrl = async () => {
      const response = await fetch(this.weatherApiUrl)
      const weather = await response.json()
      return this.getForecast(weather?.properties?.forecast)
    }
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
    
    this.weatherApiUrl = `https://api.weather.gov/points/${this.getAttribute('lat')},${this.getAttribute('lng')}`
    this.getForecastUrl().then((forecast: { periods: any; }) => {
      this.mapData(forecast).buildUi().render()
    })
  }
  
  render() {
    this.doRender = false
    this.contentDiv.innerHTML = this.forecastMarkup
  }
  
  mapData(forecast: { periods: any; }) {
    const { periods } = forecast
    
    this.forecastData = periods.slice(0, 3).map((period: { name: any; temperature: any; temperatureUnit: any; windSpeed: any; shortForecast: any; }) => {
      const { name, temperature, temperatureUnit, windSpeed, shortForecast } = period
      return { name, temperature, temperatureUnit, windSpeed, shortForecast}
    })
    return this
  }
  
  buildUi() {
    this.forecastMarkup = this.forecastData.map((periodData) => {
      return `<div class="periodCard"><div>${periodData.name}</div><div class="temperature">${periodData.temperature}</div></div>`
    }).join('')
    return this
  }
}
  customElements.define("my-weather", MyWeather);
})()