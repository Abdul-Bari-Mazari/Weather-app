let data;

function getData(callBack) {
  fetch("https://fakestoreapi.com/products")
    .then(function (res) {
      return res.json();
    })
    .then(function (res) {
      callBack(res);
    })
    .catch(function (res) {
      console.log("catch", err);
    });
}

getData(function (data) {
  console.log("data", data);
});

// const heading = document.getElementById("heading");

// setInterval(function () {
//   heading.innerHTML = JSON.stringify(data);
// }, 3000);
