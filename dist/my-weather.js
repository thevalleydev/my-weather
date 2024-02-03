var p = Object.defineProperty;
var u = (i, s, t) => s in i ? p(i, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[s] = t;
var e = (i, s, t) => (u(i, typeof s != "symbol" ? s + "" : s, t), t);
class n extends HTMLElement {
  constructor() {
    super();
    e(this, "weatherApiUrl");
    e(this, "doRender");
    e(this, "forecastData");
    e(this, "forecastMarkup");
    e(this, "contentDiv");
    e(this, "getForecast");
    e(this, "getForecastUrl");
    this.weatherApiUrl = `https://api.weather.gov/points/${this.lat},${this.lng}`, this.doRender = !0, this.contentDiv = document.createElement("div"), this.contentDiv.classList.add("periodContainer"), this.contentDiv.setAttribute("style", "display:flex;"), this.contentDiv.innerText = "content goes here", this.forecastData = [], this.forecastMarkup = "", this.getForecast = async (t) => {
      console.log("url", t);
      const r = await (await fetch(t)).json();
      return r == null ? void 0 : r.properties;
    }, this.getForecastUrl = async () => {
      var r;
      const a = await (await fetch(this.weatherApiUrl)).json();
      return this.getForecast((r = a == null ? void 0 : a.properties) == null ? void 0 : r.forecast);
    };
  }
  get lat() {
    return this.getAttribute("lat");
  }
  get lng() {
    return this.getAttribute("lng");
  }
  connectedCallback() {
    const t = this.attachShadow({ mode: "open" });
    t.innerHTML = `<style>
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
    `, t.appendChild(this.contentDiv);
  }
  attributeChangedCallback() {
    this.lat && this.lng && this.doRender && (this.doRender = !1, this.getForecastUrl().then((t) => {
      this.mapData(t).buildUi().render();
    }));
  }
  render() {
    console.log(this.forecastMarkup), this.contentDiv.innerHTML = this.forecastMarkup;
  }
  mapData(t) {
    const { periods: a } = t;
    return this.forecastData = a.slice(0, 3).map((r) => {
      const { name: o, temperature: c, temperatureUnit: h, windSpeed: l, shortForecast: d } = r;
      return { name: o, temperature: c, temperatureUnit: h, windSpeed: l, shortForecast: d };
    }), this;
  }
  buildUi() {
    return this.forecastMarkup = this.forecastData.map((t) => `<div class="periodCard"><div>${t.name}</div><div class="temperature">${t.temperature}</div></div>`).join(""), this;
  }
}
e(n, "observedAttributes", ["lat", "lng", "forecast"]);
customElements.define("my-weather", n);
