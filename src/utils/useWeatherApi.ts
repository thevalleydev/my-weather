const getForecastUrl = async (weatherApiUrl: RequestInfo | URL) => {
  const response = await fetch(weatherApiUrl)
  const { properties} = await response.json()
  return properties?.forecast
}

const getForecast = async (weatherApiUrl: RequestInfo | URL) => {
  const forecastUrl = await getForecastUrl(weatherApiUrl)
  const response = await fetch(forecastUrl)
  const { properties } = await response.json()
  return properties
}

export {
  getForecast
}