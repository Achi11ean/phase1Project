const weatherData = {
  clickMe: {
    wilkommen:
      "Welcome To the latest site of G'weather - Gay weather all the time!",
    why: "I thought it would be cool to have a site  to tell you the details of our little shared paradise on Earth. So, if you're thinking of visiting, moving, have friends in the area or live there: This is for you!        It will provide updates as the site grows in users and content so stay tuned and feel free to provide any tips or recommendations to instagram 📸:Gay_coded",
    selfPats:
      "In a time when confusion and anxiety riddle the world, take a moment to check in on out very own cape of curiosity, chaos and scenery. You may find the tide level particularly interesting if you're thinking of visiting the local docks when the moon is high😏",
  },
};
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

    const index = Math.round(degree / 22.5) % 16; // 360 degrees divided by 16 directions
    return directions[index];
  } else {
    return "Invalid degree. Must be between 0 and 360.";
  }
}

function precipitationType(rain, snow) {
  if (snow > 0) {
    return "Snow";
  } else if (rain > 0) {
    return "Rain";
  } else {
    return "No precipitation";
  }
}

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
// we are getting all the quip buttons and adding click event listeners
const puns = [
  "If it's raining cats and dogs make sure to watch where you walk! you might step in poodle. !",
  "I hate when it gets so hot I start losing my glitter 😥",
  "Summer Humidity has my hair giving me more drama than a RuPaul Untucked episode.",
  "The wind is blowing harder than my last Grindr date.",
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
];
function handleQuipClick(event, cardId) {
  // get random pun
  const randomPun = Math.floor(Math.random() * puns.length);
  console.log(randomPun);
  const card = document.getElementById(cardId);
  const p = document.createElement("p");
  console.log(puns[randomPun]);
  p.textContent = puns[randomPun];
  card.append(p);
}

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

//we are getting all the quip buttons and adding click event listeners
const quipButtons = document.querySelectorAll("#showWeather button");
quipButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    //handleQuipClick will make the sassy comment pop up
    handleQuipClick(event, button.parentElement.id);
  });
});

// this section is to populate the weather updated data into the html
function newData() {
  //api used is open-meteo
  fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=42.053&longitude=-70.1864&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m&hourly=temperature_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,weather_code,pressure_msl,surface_pressure,cloud_cover,cloud_cover_low,cloud_cover_mid,cloud_cover_high,visibility,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index,is_day,sunshine_duration&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,sunrise,sunset,daylight_duration,sunshine_duration,uv_index_max,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_hours,precipitation_probability_max,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&temperature_unit=fahrenheit&wind_speed_unit=mph&precipitation_unit=inch&timezone=America%2FNew_York&forecast_days=1&forecast_hours=24"
  )
    .then((response) => response.json())
    .then((json) => {
      // Temperature data
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
      document.getElementById("rainChance").textContent =
        json.current.precipitation;
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
      // this is the data about the big ol' blue (ocean)
      document.getElementById("surfacePressure").textContent =
        json.current.surface_pressure;
      document.getElementById("seaLevelPressure").textContent =
        json.current.pressure_msl;
      document.getElementById("cloudCoverage").textContent =
        json.current.cloud_cover;
    })
    .catch((error) => {
      console.log("Error in fetch call: ".error);
      alert("Unable to load at this time. Sorry, Sis!");
    });

  // this is the data about the intro to the website which should show automatically
  document.getElementById("wilkommen").textContent =
    weatherData.clickMe.wilkommen;
  document.getElementById("why").textContent = weatherData.clickMe.why;
  document.getElementById("selfPats").textContent =
    weatherData.clickMe.selfPats;
  hideWeather();
  const clickMe = document.getElementById("clickMe");
  if (clickMe) {
    clickMe.classList.remove("hidden");
  }
}
window.onload = newData;
