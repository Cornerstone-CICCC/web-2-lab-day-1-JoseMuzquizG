// const cityButton = document.querySelector('.city-btn')
// const cityName = document.querySelector('.header-image-city')


const getCity = async (city) => {
    let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=Vancouver&count=1&language=en&format=json`)
    const data = await res.json()
    return data.results[0] // get first city result in results array
}

const getWeather = async (latitude, longitude) => {
    let res = await fetch (`https://api.open-meteo.com/v1/forecast?latitude=49.2497&longitude=-123.1193&current=temperature_2m,is_day,rain,showers&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`)
    const data = await res.json()
    // console.log(data)
    return data
}

const buildHtml = async (cityInput) => {
    const cityData = await getCity(cityInput)
    const weatherData = await getWeather(cityData.latitude, cityData.longitude)
    console.log(cityData.name, weatherData.latitude, weatherData.longitude)
    //rest of your code?
}

// getCity()
// getWeather()
buildHtml()