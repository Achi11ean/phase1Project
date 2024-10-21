// intro data, originally it was a giant array i used for template data. i'm not changing the name back because i already had it in many 
// places so it would be annoying and a headache lol. 
const weatherData = {
  clickMe: {
    wilkommen:
      "Welcome To the latest site of G'weather - Gay weather all the time!",
    selfPats:
      "In a time when confusion and anxiety riddle the world, take a moment to check in on out very own cape of curiosity, chaos and scenery. You may find the tide level particularly interesting if you're thinking of visiting the local docks when the moon is high😏.",
    
  },
};
// this function is converting the wind directiondata i received from the api because it was giving me the wind direction
// in a format of 0-360 degrees so i had to make a function to convert the data into a legible format. (Charlotte helped me with this)
function getDirection(degree) {
  if (degree >= 0 && degree <= 360) {
    const directions = [
      "North",
      "North-Northeast",
      "Northeast",
      "East-Northeast",
      "East",
      "East-Southeast",
      "Southeast",
      "South-Southeast",
      "South",
      "South-Southwest",
      "Southwest",
      "West-Southwest",
      "West",
      "West-Northwest",
      "Northwest",
      "North-Northwest",
    ];
// this section is saying that whatever you're getting from the api will be divided by 22.5 because 360/16 gives you 22.5
    const index = Math.round(degree / 22.5) % 16; 
//  the % modulo operator %  makes sure that the response we recieve is staying withing the bounds of the 16| if a number received is
// higher it would convert it to be within the parameters 
    return directions[index];
  } else {
    return "Invalid degree. Must be between 0 and 360.";
  }
}
// this function is saying that if snow returns anything over 0 for the day just say snow for the precipitation type 
// and if it is 0 then check rain,if rain is 0 then say no precipitation| if rain is saying anything over 0 say rain for type.
function precipitationType(rain, snow) {
  if (snow > 0) {
    return "Snow";
  } else if (rain > 0) {
    return "Rain";
  } else {
    return "No precipitation";
  }
}
// this is another one of those conversions i had to do because the sunset/sunrise time was in a crazy format 
// charlotte helped a lot. | i saved this as handy to reference and learn because it was tricky to make because the data received
// was very weird

function formatTime(timestamp) {
  const date = new Date(timestamp);

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";

  hours = hours % 12;
  hours = hours ? hours : 12; // If hour equals 0, set to 12
  const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

  return `${hours}:${formattedMinutes}${ampm}`;
}

// defining my puns in an array. i'm gonna add so many more puns.
const puns = [
  "Weathering the storm, one umbrella at a time.",
  "The sun is my favorite influencer. It’s always bringing the heat!",
  "Is it cold outside or is it just giving me the cold shoulder?",
  "I love when it rains on the weekend – it's like the weather's giving me a free excuse to do nothing!",
  "What’s a tornado’s favorite game? Twister!",
  "I’d make a weather joke, but it would be a total breeze.",
  "If it's raining cats and dogs make sure to watch where you walk! you might step in poodle. !",
  "I hate when it gets so hot I start losing my glitter 😥",
  "Summer Humidity has my hair giving me more drama than a RuPaul Untucked episode.",
  "The wind is blowing harder than my last Grindr date.",
  "Why don't clouds ever break up? Because they keep everything under cover!",
  "Snow way I'm leaving the house in this blizzard!",
  "I tried to catch some fog, but I mist.",
  "I'm on cloud nine... because it’s about to rain!",
  "I hate when it is so cold even my GayDar freezes!",
  "This rain is so relentless, I feel like I am trapped in a Britney Spears comeback ballad.",
  "New England weather is like a drag queen's performance: unpredictable, fierce, and leaving me breathless and slightly poorer than when it started. (Always tip your drag queens!).",
  "If this weather were a man, it would be ghosting me after the first date—hot one minute, cold the next.",
  "cloudy days throw more shade than a drag queen during Snatch Game.",
  "Rainy days when i'm not working in office: sashay away. Rainy days when I am working in office: shantay you stay.",
  "Rain puts me to sleep better than a dry tinder convo",
  "This wind is blowing harder than the gossip on Commercial Street after Tea Dance.",
  "This wind is so strong, I saw a seagull get blown into a drag brunch, and honestly: good for her.",
  "Not even a hurricane could mess up my 'do",
  "I'm not a meteorologist but I could tell you which way the wind blows. 🌬️",
  "It's raining sass and class, in a large wine glass.",
  "What do clouds wear under their shorts? Thunderpants!",
  "Rain or shine, I always bring the shade.",
  "Snow matter what, I’m always the coolest person in the room.",
  "When it rains, it pours… tea, because I’m all about the gossip!",
  "The wind was like my ex—always blowing things out of proportion.",
  "This heatwave has me sweating more than a sinner in confession!",
  "Looks like the storm is coming… guess we are all getting blown tonight!",
  "Clouds are great at throwing shade, but honey, I can do it better!",
  "If the wind blows any harder, I might have to reconsider wearing a skirt!",
  "They said to expect heavy showers, but honestly, I wasn’t ready to get this wet!",
  "The only thing hotter than this sun is the idea of us getting stuck inside during a rainstorm.",
  "With skies this clear, even my future is jealous!",
  "The forecast says clear skies, but I’m still throwing shade.",
  "Nothing but blue skies and good alibis."

];

// this is the function to handle the click on my bottom page puns                     ***
function handleQuipClick(event, cardId) {
 // get random pun| math.random() is generating a random devimal number between 0 (inclusive) and 1(exclusive)|
// puns.length gives the length of my array, entirety|
// math.randon by pun.length scales the random number to a range between 0 and the length of the array.
// math.floor() rounds the decimal number down to the nearest whole number so if the array has 5 items it will generate a random number between 0-4.99
  const randomPun = Math.floor(Math.random() * puns.length);
  const card = document.getElementById(cardId);
  const p = document.createElement("p");
  p.textContent = puns[randomPun];
   card.append(p);
}
// this function is hiding all of the weather data from the page at first load so we can select one at a time to be 'unhidden' to show data
function hideWeather() {
  const weather = document.querySelectorAll(".weatherCard");
  weather.forEach((card) => {
    card.classList.add("hidden");
  });
}

// This function is to display the user selected weather data's corresponding section!
function display(weatherCondition) {
  hideWeather();
  const weatherCards = document.getElementById(weatherCondition);
  if (weatherCards) {
    weatherCards.classList.remove("hidden");
  }
}

// this  listens to the drop down menu to determine what to display! :)
document
  .getElementById("weatherChoices")
  .addEventListener("change", function () {
    const yourWeatherYourChoice = this.value;
    // this part maps the dropdown to the corresponding id
    const weatherDrop = {
      temperature: "temps",
      wind: "windData",
      precipitation: "rainData",
      sunlight: "sunData",
      misc: "misc",
      selection: "clickMe",
    };
    display(weatherDrop[yourWeatherYourChoice]);
  });

//we are getting alllllllll the quip buttons and adding click event listeners
const quipButtons = document.querySelectorAll("#showWeather button");
quipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    //handleQuipClick will make the sassy comment pop up
    handleQuipClick(event, button.parentElement.id);
  });
});

// this section is to populate the weather updated data into the html
function newData() {
  //api used is open-meteo.com           ****
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=42.053&longitude=-70.1864&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day,sunshine_duration&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=1&forecast_hours=24"
  )
//   gotta convert it from json
    .then((response) => response.json())
    .then((json) => {
      // Temperature data - pulling from api -->lots of data pulling lol 
      document.getElementById("currentTemp").textContent =
        json.current.temperature_2m;
      document.getElementById("feelsLike").textContent =
        json.current.apparent_temperature;
      document.getElementById("humidity").textContent =
        json.current.relative_humidity_2m;
      // wind data
      document.getElementById("windSpeed").textContent =
        json.current.wind_speed_10m;
      document.getElementById("windDirection").textContent = getDirection(
        json.current.wind_direction_10m
      );
      document.getElementById("windGusts").textContent =
        json.current.wind_gusts_10m;
      //  precipitation data
      document.getElementById("rainType").textContent = precipitationType(
        json.current.rain,
        json.current.snowfall
      );
    //   this is a boolean for the 
      document.getElementById("rainChance").textContent =
        json.current.precipitation;
        // used a ternary expression here for checking multiple conditions to determine 
        // what i needed to display for a value in the rain amount element/ if it's rainfall or snowfall amounts checking snow first. 
      document.getElementById("rainAmount").textContent =
        json.current.snow > 0
          ? json.current.snowfall
          : json.current.rain > 0
          ? json.current.rain
          : json.current.showers;
      // This is that good sun data sis
      document.getElementById("sunriseTime").textContent = formatTime(
        json.daily.sunrise[0]
      );
      document.getElementById("sunsetTime").textContent = formatTime(
        json.daily.sunset[0]
      );
      document.getElementById("uvIndex").textContent =
        json.daily.uv_index_max[0];
      // this is the data about the miscellaneous data i used that will one day house things like moon full percent. high or low tide etc. 
      document.getElementById("surfacePressure").textContent =
        json.current.surface_pressure;
      document.getElementById("seaLevelPressure").textContent =
        json.current.pressure_msl;
      document.getElementById("cloudCoverage").textContent =
        json.current.cloud_cover;
    })
    // gotta get them errors girl
    .catch((error) => {
      console.log("Error in fetch call: ".error);
      alert("Unable to load at this time. Sorry, Sis!");
    });

  // this is the data about the intro to the website which should show automatically
  // document.getElementById("wilkommen").textContent =
  //   weatherData.clickMe.wilkommen;
  // document.getElementById("why").textContent = weatherData.clickMe.why;
  // document.getElementById("selfPats").textContent =
  //   weatherData.clickMe.selfPats;
    // this is calling the hideWeatherfunction again to make sure they arent all showing on the same page and are ' hidden' unless selected
  hideWeather();
  const clickMe = document.getElementById("clickMe");
//   this is making it default to my clickMe page which is just the label i put for the main opening card
  if (clickMe) {
    clickMe.classList.remove("hidden");
  }
}
// pull our data and make them accessible
const letters = document.querySelectorAll('#rainbow span')
const rainbows = document.getElementById('rainbow')
// add event listener hover to title Gweather
rainbows.addEventListener('mouseover', () => {
letters.forEach(letter => {
    letter.classList.add('danceMouseBoy')
    });
});
// stop the hover event so when you pull mouse off it will go back to normal -- now the letters kind of dance!
rainbows.addEventListener('mouseout', () => {
    letters.forEach(letters => {
        letters.classList.remove('danceMouseBoy')
    });
})
// this made my super gae border
rainbow.style.borderTop = "5px solid"
rainbow.style.borderBottom = "5px solid"
rainbow.style.borderImage = "linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet ) 1"
rainbow.style.borderRight = "5px solid" 
rainbow.style.borderLeft = "5px solid"

window.onload = newData;

