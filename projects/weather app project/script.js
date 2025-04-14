
const weatherForm = document.querySelector('.weatherForm')
const cityInput = document.querySelector('.cityInput')
const card = document.querySelector('.card')
const apiKey = ""

//button reactions
weatherForm.addEventListener('submit', async event => {
    event.preventDefault()

    const city = cityInput.value

    //error handling
    if(city) {
        try{
            const weatherData = await getWeatherData(city)
            displayWeatherInfo(weatherData)
        }
        catch (error){
            console.error(error)
            displayError(error)
        }

    } else {
        displayError('Please enter a city')
    }

})

//async api call
async function getWeatherData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
    const response = await fetch(apiUrl)
    //console.log(response)

    if(!response.ok) {
        throw new Error('Could not fetch weather data')
    } 
    return await response.json()
}

//api data and card display
function displayWeatherInfo(data) {
    //console.log(data)

    const {name: city, 
           main: {temp, humidity}, 
           weather: [{description, id}]} = data

    card.textContent = ''
    card.style.display = 'flex'

    //element creation
    const cityDisplay = document.createElement('h1')
    const tempDisplay = document.createElement('p')
    const humidityDisplay = document.createElement('p')
    const descDisplay = document.createElement('p')
    const weatherEmojiDisplay = document.createElement('p')

    //element text content
    cityDisplay.textContent = city
    tempDisplay.textContent = `${(temp - 273.15).toFixed(2)}°C`
    // `${((temp - 273.15)* (9/5) + 32).toFixed(2)}°F`
    humidityDisplay.textContent = `Humidity: ${humidity}%`
    descDisplay.textContent = description
    weatherEmojiDisplay.textContent = getWeatherEmoji(id)

    cityDisplay.classList.add('cityDisplay')
    tempDisplay.classList.add('tempDisplay')
    humidityDisplay.classList.add('humidityDisplay')
    humidityDisplay.classList.add('descDisplay')
    weatherEmojiDisplay.classList.add('weatherEmoji')

    card.appendChild(cityDisplay)
    card.appendChild(tempDisplay)
    card.appendChild(humidityDisplay)
    card.appendChild(descDisplay)
    card.appendChild(weatherEmojiDisplay)
 
}

//adding image based on weather condition
function getWeatherEmoji(weatherId) {

    switch(true) {
        case(weatherId >= 200 && weatherId < 300):
            return '⛈'
        case(weatherId >= 300 && weatherId < 400):
            return '🌧'
        case(weatherId >= 500 && weatherId < 600):
            return '🌧'
        case(weatherId >= 600 && weatherId < 700):
            return '❄'
        case(weatherId >= 700 && weatherId < 800):
            return '🌁'
        case(weatherId === 800):
            return '☀'
        case(weatherId >= 801 && weatherId < 810):
            return '☁'
        default:
            return '❓'
    }
}

//error handling
function displayError(message) {

    const errorDisplay = document.createElement('p')
    errorDisplay.textContent = message
    errorDisplay.classList.add('errorDisplay')

    //reseting existing card text
    card.textContent = ''
    card.style.display = 'flex'
    card.appendChild(errorDisplay)

}
