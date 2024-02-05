var d = Object.defineProperty;
var h = (e, t, n) => t in e ? d(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var a = (e, t, n) => (h(e, typeof t != "symbol" ? t + "" : t, n), n);
const l = "https://api.weather.gov", p = async (e, t) => {
  const n = await fetch(`${l}/points/${e},${t}`), { properties: s } = await n.json();
  return s == null ? void 0 : s.forecast;
}, u = async (e, t) => {
  const n = await p(e, t), s = await fetch(n), { properties: r } = await s.json();
  return r;
}, m = (e) => {
  const { periods: t } = e;
  return t.slice(0, 3).map((n) => {
    const { name: s, temperature: r, temperatureUnit: i, windSpeed: o, shortForecast: c } = n;
    return { name: s, temperature: r, temperatureUnit: i, windSpeed: o, shortForecast: c };
  });
}, v = (() => {
  class e extends HTMLElement {
    constructor() {
      super();
      a(this, "doRender");
      a(this, "forecastMarkup");
      a(this, "contentDiv");
      this.doRender = !0, this.contentDiv = document.createElement("div"), this.contentDiv.classList.add("periodContainer"), this.contentDiv.setAttribute("style", "display:flex;"), this.contentDiv.innerText = "loading", this.forecastMarkup = "";
    }
    connectedCallback() {
      const s = this.attachShadow({ mode: "open" });
      s.innerHTML = `<style>
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
      `, s.appendChild(this.contentDiv), u(this.getAttribute("lat"), this.getAttribute("lng")).then((r) => {
        const i = m(r);
        this.buildUi(i).render();
      });
    }
    render() {
      this.doRender = !1, this.contentDiv.innerHTML = this.forecastMarkup;
    }
    buildUi(s) {
      return this.forecastMarkup = s.map((r) => `<div class="periodCard"><div>${r.name}</div><div class="temperature">${r.temperature}</div></div>`).join(""), this;
    }
  }
  customElements.define("my-weather", e);
})();
export {
  v as default
};
