// const cityButton = document.querySelector('.city-btn')
const cityName = document.querySelector('.header-image-city')
const content = document.querySelector('.table-content')
const cityTemp = document.querySelector('.header-image-temp')

const getCity = async (city) => {
    let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=Vancouver&count=1&language=en&format=json`)
    const data = await res.json()
    return data.results // get first city result in results array
}

const getWeather = async (latitude, longitude) => {
    let res = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
    const data = await res.json()
    return data
}

const buildHtml = async (cityInput) => {
    const cityData = await getCity(cityInput)
    const weatherData = await getWeather()
    cityName.innerHTML = `<h2>${cityData[0].name}</h2>`
    cityTemp.innerHTML = `<h2>${weatherData.current.temperature_2m} ${weatherData.current_units.temperature_2m}</h2>`

    content.innerHTML =` 
    <tr>
      <td>Country</td>
      <td>${cityData[0].country}</td>
    </tr>
    <tr>
      <td>Timezone</td>
      <td>${cityData[0].timezone}</td>
    </tr>
    <tr>
      <td>Population</td>
      <td>${cityData[0].population}</td>
    </tr>
    <tr>
      <td>Tomorrow's Forecast</td>
      <td>Low: ${weatherData.daily.temperature_2m_min} ${weatherData.daily_units.temperature_2m_min} <br/> Max: ${weatherData.daily.temperature_2m_max} ${weatherData.daily_units.temperature_2m_max}</td>
    </tr>
    `
}

buildHtml()