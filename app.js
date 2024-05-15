const body = document.getElementById("body"),
  weatherIcon = document.getElementById("weatherIcon"),
  searchBar = document.getElementById("searchBar"),
  cityName = document.getElementById("cityName"),
  // temperature = document.getElementById("temp"),
  weatherCondition = document.getElementById("weatherCondition"),
  // maxTemp = document.getElementById("max"),
  // max_minHTML = document.getElementById("max_min"),
  feelsLike = document.getElementById("feelsLike"),
  humidity = document.getElementById("humidity"),
  windSpeed = document.getElementById("windSpeed"),
  visibility = document.getElementById("visibility");

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

var lat, lon;

function getCurrentLocation(callBack, errorCallback) {
  navigator.geolocation.getCurrentPosition(
    function (location) {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;
      callBack(lat, lon);
    },
    function (error) {
      errorCallback(error);
    }
  );
}

function callBack(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6be255ff5e9fc9c77fa08bd4064fc2a8&units=metric`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      console.log(lat, lon);
      setCurrentWeather(res);
    })
    .catch(function (err) {
      console.log("catch", err);
    });
}

function setCurrentWeather(data) {
  console.log(data);
  cityName.innerText = data.name;
  var temp = `${data.main.temp.toFixed(1)}&deg;C`;
  var weather = data.weather[0].main;
  var condition = capitalize(data.weather[0].description);
  weatherCondition.innerHTML = `${condition} - ${temp}`;
  // var max = `${data.main.temp_max}&deg;`;
  // var min = `${data.main.temp_min}&deg;`;
  // max_minHTML.innerHTML = `${max}/${min}`;
  feelsLike.innerHTML = `${data.main.feels_like}&deg;C`;
  humidity.innerHTML = `${data.main.humidity}%`;
  windSpeed.innerHTML = `${data.wind.speed}km/h`;
  visibility.innerHTML = `${(data.visibility / 1000).toFixed(2)}km`;

  if (weather === "Clear" || weather === "clear sky") {
    body.style.backgroundImage = "url(./imgs/background/clear.jpg)";
    weatherIcon.src = "./imgs/icons/sun.png";
  } else if (
    weather === "few clouds" ||
    weather === "Clouds" ||
    weather === "overcast clouds" ||
    weather === "scattered clouds" ||
    weather === "broken clouds"
  ) {
    body.style.backgroundImage = "url(./imgs/background/cloudy.jpg)";
    weatherIcon.src = "./imgs/icons/cloudy.png";
  } else if (weather === "Rain" || weather === "light rain") {
    body.style.backgroundImage = "url(./imgs/background/rainy.jpg)";
    weatherIcon.src = "./imgs/icons/rainy.png";
  } else if (weather === "Haze" || weather === "Smoke") {
    body.style.backgroundImage = "url(./imgs/background/haze.jpg)";
  } else if (weather === "Snow") {
    body.style.backgroundImage = "url(./imgs/background/snow.webp)";
  }
}

function errorCallback(error) {
  console.log(`Error getting location: ${error.message}`);
  setPakistaWeather();
}

function setPakistaWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=Pakistan&appid=6be255ff5e9fc9c77fa08bd4064fc2a8&units=metric`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      setCurrentWeather(res);
    })
    .catch(function (err) {
      console.log("catch", err);
    });
}

getCurrentLocation(callBack, errorCallback);

function search() {
  return new Promise(function (resolve, reject) {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value
        .toLowerCase()
        .trim()}&appid=6be255ff5e9fc9c77fa08bd4064fc2a8&units=metric`
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (res) {
        resolve(res);
        displayData(res);
        searchBar.value = "";
      })
      .catch(function (res) {
        reject(res);
      });
  });
}

function displayData(data) {
  console.log("data", data);
  cityName.innerText = data.name;
  var temp = `${data.main.temp.toFixed(1)}&deg;C`;
  var weather = data.weather[0].main;
  var condition = capitalize(data.weather[0].description);
  weatherCondition.innerHTML = `${condition} - ${temp}`;
  // var max = `${data.main.temp_max}&deg;`;
  // var min = `${data.main.temp_min}&deg;`;
  // max_minHTML.innerHTML = `${max}/${min}`;
  feelsLike.innerHTML = `${data.main.feels_like}&deg;C`;
  humidity.innerHTML = `${data.main.humidity}%`;
  windSpeed.innerHTML = `${data.wind.speed}km/h`;
  visibility.innerHTML = `${(data.visibility / 1000).toFixed(2)}km`;

  if (weather === "Clear" || weather === "clear sky") {
    body.style.backgroundImage = "url(./imgs/background/clear.jpg)";
    weatherIcon.src = "./imgs/icons/sun.png";
  } else if (
    weather === "few clouds" ||
    weather === "Clouds" ||
    weather === "overcast clouds" ||
    weather === "scattered clouds" ||
    weather === "broken clouds"
  ) {
    body.style.backgroundImage = "url(./imgs/background/cloudy.jpg)";
    weatherIcon.src = "./imgs/icons/cloudy.png";
  } else if (weather === "Rain" || weather === "light rain") {
    body.style.backgroundImage = "url(./imgs/background/rainy.jpg)";
    weatherIcon.src = "./imgs/icons/rainy.png";
  } else if (weather === "Haze" || weather === "Smoke") {
    body.style.backgroundImage = "url(./imgs/background/haze.jpg)";
  } else if (weather === "Snow") {
    body.style.backgroundImage = "url(./imgs/background/snow.webp)";
  }
}
