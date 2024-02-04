const weatherApiBaseUrl = 'https://api.weather.gov'

const getForecastUrl = async (lat: string, lng: string) => {
  const response = await fetch(`${weatherApiBaseUrl}/points/${lat},${lng}`)
  const { properties} = await response.json()
  return properties?.forecast
}

const getForecast = async (lat: string, lng: string) => {
  const forecastUrl = await getForecastUrl(lat, lng)
  const response = await fetch(forecastUrl)
  const { properties } = await response.json()
  return properties
}


const mapForecastData = (forecast: { periods: any; }) => {
  const { periods } = forecast
  
  return periods.slice(0, 3).map((period: { name: any; temperature: any; temperatureUnit: any; windSpeed: any; shortForecast: any; }) => {
    const { name, temperature, temperatureUnit, windSpeed, shortForecast } = period
    return { name, temperature, temperatureUnit, windSpeed, shortForecast}
  })
}

export {
  getForecast, mapForecastData
}