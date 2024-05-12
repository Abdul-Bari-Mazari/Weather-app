const body = document.getElementById("body"),
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

//   var lat, lon;
// function getCurrentLocation() {
//  var location = new Promise navigator.geolocation.getCurrentPosition(function (location) {
//     lat = location.coords.latitude;
//     lon = location.coords.longitude;
//     console.log(lat, lon);
//   });

//   console.log(lat, lon);
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6be255ff5e9fc9c77fa08bd4064fc2a8&units=metric`
//   )
//     .then(function (res) {
//       return res.json();
//     })
//     .then(function (res) {
//       response(res);
//       data = res;
//       console.log(data);
//     })
//     .catch(function (err) {
//       err(res);
//     });
// }

// function fetchData() {
//   return new Promise(function (resolve, reject) {
//     fetch(
//       `https://api.openweathermap.org/data/2.5/weather?q=${searchBar.value
//         .toLowerCase()
//         .trim()}&appid=6be255ff5e9fc9c77fa08bd4064fc2a8&units=metric`
//     )
//       .then(function (res) {
//         return res.json();
//       })
//       .then(function (res) {
//         resolve(res);

//       })
//       .catch(function (res) {
//         reject(res);
//       });
//   });
// }

// getCurrentLocation();

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

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayData(data) {
  console.log("data", data);
  cityName.innerText = data.name;
  var temp = `${data.main.temp.toFixed(1)}&deg;C`;
  var weather = data.weather[0].description;
  var condition = capitalize(data.weather[0].description);
  weatherCondition.innerHTML = `${condition} - ${temp}`;
  // var max = `${data.main.temp_max}&deg;`;
  // var min = `${data.main.temp_min}&deg;`;
  // max_minHTML.innerHTML = `${max}/${min}`;
  feelsLike.innerHTML = `${data.main.feels_like}&deg;C`;
  humidity.innerHTML = `${data.main.humidity}%`;
  windSpeed.innerHTML = `${data.wind.speed}km/h`;
  visibility.innerHTML = `${(data.visibility / 1000).toFixed(2)}km`;

  if (weather === "clear" || weather === "clear sky") {
    body.style.backgroundImage = "url(./imgs/background/clear.jpg)";
  } else if (
    weather === "few clouds" ||
    weather === "cloudy" ||
    weather === "overcast" ||
    weather === "scattered clouds"
  ) {
    body.style.backgroundImage = "url(./imgs/background/cloudy.jpg)";
  } else if (weather === "rain" || weather === "light rain") {
    body.style.backgroundImage = "url(./imgs/background/rainy.jpg";
  } else if (weather === "haze") {
    body.style.backgroundImage = "url(./imgs/background/haze.jpg";
  }
}

// function getData() {
//   return new Promise(function (resolve, reject) {
//     fetch(
//       "https://api.openweathermap.org/data/2.5/weather?q=karachi&appid=6be255ff5e9fc9c77fa08bd4064fc2a8&units=metric"
//     )
//       .then(function (res) {
//         return res.json();
//       })
//       .then(function (res) {
//         resolve(res);
//       })
//       .catch(function (res) {
//         reject(res);
//       });
//   });
// }

// getData()
//   .then(function (data) {
//     temperature.innerHTML = data.main.temp;
//   })
//   .catch(function (data) {
//     console.log("data", data);
//   });

// const heading = document.getElementById("heading");

// setInterval(function () {
//   heading.innerHTML = JSON.stringify(data);
// }, 3000);
