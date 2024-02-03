var l = Object.defineProperty;
var u = (a, e, n) => e in a ? l(a, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : a[e] = n;
var i = (a, e, n) => (u(a, typeof e != "symbol" ? e + "" : e, n), n);
const f = (() => {
  if (!document)
    return;
  class a extends HTMLElement {
    constructor() {
      super();
      i(this, "weatherApiUrl");
      i(this, "doRender");
      i(this, "forecastData");
      i(this, "forecastMarkup");
      i(this, "contentDiv");
      i(this, "getForecast");
      i(this, "getForecastUrl");
      this.doRender = !0, this.weatherApiUrl = "", this.contentDiv = document.createElement("div"), this.contentDiv.classList.add("periodContainer"), this.contentDiv.setAttribute("style", "display:flex;"), this.contentDiv.innerText = "loading", this.forecastData = [], this.forecastMarkup = "", this.getForecast = async (t) => {
        const r = await (await fetch(t)).json();
        return r == null ? void 0 : r.properties;
      }, this.getForecastUrl = async () => {
        var r;
        const s = await (await fetch(this.weatherApiUrl)).json();
        return this.getForecast((r = s == null ? void 0 : s.properties) == null ? void 0 : r.forecast);
      };
    }
    connectedCallback() {
      console.log(this);
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
    `, t.appendChild(this.contentDiv), this.weatherApiUrl = `https://api.weather.gov/points/${this.getAttribute("lat")},${this.getAttribute("lng")}`, this.getForecastUrl().then((s) => {
        this.mapData(s).buildUi().render();
      });
    }
    render() {
      this.doRender = !1, this.contentDiv.innerHTML = this.forecastMarkup;
    }
    mapData(t) {
      const { periods: s } = t;
      return this.forecastData = s.slice(0, 3).map((r) => {
        const { name: o, temperature: c, temperatureUnit: h, windSpeed: d, shortForecast: p } = r;
        return { name: o, temperature: c, temperatureUnit: h, windSpeed: d, shortForecast: p };
      }), this;
    }
    buildUi() {
      return this.forecastMarkup = this.forecastData.map((t) => `<div class="periodCard"><div>${t.name}</div><div class="temperature">${t.temperature}</div></div>`).join(""), this;
    }
  }
  customElements.define("my-weather", a);
})();
export {
  f as default
};
