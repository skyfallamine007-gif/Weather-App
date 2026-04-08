const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "125c92597f18aa755fe4ab4d0fe63178";







weatherForm.addEventListener("submit",async event =>{
    event.preventDefault();
    const city = cityInput.value;
    if(city){
          try{
              const weatherData = await getWeatherData(city);
              displayWeatherInfo(weatherData);
          }
          catch(error){
                console.error(error);
                displayError(error);
          }
    } 
    else{
           displayError("Please Enter a City");
    }
});

async function getWeatherData(city){
    const units = "metric";
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
      const response = await fetch(apiUrl);
      
      if(!response.ok){
        throw new Error("Could not fetch weather data")
      }

      return await response.json();
      
};

function displayWeatherInfo(data){
   const {name : city,
         main :{temp, humidity, feels_like},
         weather : [{description, id , main }]} = data;
console.log(data)
    card.textContent = "";
    card.style.display = "flex";  
    

    /* Creating elemnts for the display */
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const mainDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const feelsLikeDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");


    /* Displaying the content of the card */
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${temp}°C`;
    feelsLikeDisplay.textContent = `Feels Like : ${feels_like}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
     mainDisplay.textContent = `Main Temp : ${main}`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);


    /* Adding the style for the elements  */
     cityDisplay.classList.add("cityDisplay");
     tempDisplay.classList.add("timpDisplay");
     humidityDisplay.classList.add("humidityDisplay");
     mainDisplay.classList.add("mainDisplay");
     descDisplay.classList.add("descDisplay");
    feelsLikeDisplay.classList.add("feelsLikeDisplay");
     weatherEmoji.classList.add("weatherEmoji");


    /* Adding the the elements to the bottom of each other */
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(feelsLikeDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(mainDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji);
};

function getWeatherEmoji(weatherId){
     
      switch(true){
            case (weatherId >= 200 && weatherId < 300) :
                  return "⛈️";
            case (weatherId >= 300 && weatherId < 500) :
                  return "🌧️";
            case (weatherId >= 500 && weatherId < 600 ) :
                  return "🌧️";
            case (weatherId >= 600 && weatherId < 700 ) :
                  return "🌨️";
            case (weatherId >= 700 && weatherId < 800 ) :
                  return "🌫️";   
            case (weatherId === 800 ) :
                  return "☀️";    
            case (weatherId > 800 ) :
                  return "☁️";     
              default: 
              return "🤔";
      }
};

function displayError(message){
      const errorDisplay = document.createElement("p");
      errorDisplay.textContent = message;
      errorDisplay.classList.add("errorDisplay");

      
      card.textContent = ""; 
      card.style.display = "flex";
      card.appendChild(errorDisplay);
}
