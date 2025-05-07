//#region HTML Elements
const btnOpenMenu = document.getElementById("open-nav-menu");
const btnCloseMenu = document.getElementById("close-nav-menu");
const divMenu = document.getElementsByClassName("wrapper");
const greetingMessage = document.getElementById("greeting");
const hoursHolder = document.querySelector("span[data-time=hours]");
const minutesHolder = document.querySelector("span[data-time=minutes]");
const secondsHolder = document.querySelector("span[data-time=seconds]");
const weatherText = document.getElementById("weather");
const celsiusOption = document.getElementById("celsius");
const fahrOption = document.getElementById("fahr");
let weatherInCelsius, weatherInFahrenheit, spanTemp, spanTempUnit;
let local_imge=document.querySelector("[ alt='image1']");
let img_1=document.querySelector("[ alt='Thumbnail Image 1']");
let img_2=document.querySelector("[ alt='Thumbnail Image 2']");
let img_3=document.querySelector("[ alt='Thumbnail Image 3']");
//#endregion

// #region Menu
btnOpenMenu.addEventListener("click", function () {
  divMenu[0].classList.add("nav-open");
});
btnCloseMenu.addEventListener("click", function () {
  divMenu[0].classList.remove("nav-open");
});
//#endregion

//#region Updating Greeting Message & Local Time
setInterval(() => {
  //#region Greeting Message
  let localTime = new Date();
  let hours = localTime.getHours();
  if (hours >= 0 && hours < 12) {
    greetingMessage.innerText = "Good Morning!";
  } else if (hours >= 12 && hours < 18) {
    greetingMessage.innerText = "Good Afternoon!";
  } else if (hours >= 18 && hours < 22) {
    greetingMessage.innerText = "Good Evening!";
  } else if (hours >= 22) {
    greetingMessage.innerText = "Good Night!";
  } else {
    greetingMessage.innerText = "Invalid Hour!";
  }
  //#endregion

  //#region Local Time
  let minutes = localTime.getMinutes();
  let seconds = localTime.getSeconds();
  hoursHolder.innerText = hours.toString().padStart(2, "0");
  minutesHolder.innerText = minutes.toString().padStart(2, "0");
  secondsHolder.innerText = seconds.toString().padStart(2, "0");
  //#endregion
}, 1000);
//#endregion

//#region Getting Geo Location
function getCoordintes() { 
  var options = { 
      enableHighAccuracy: true, 
      timeout: 5000, 
      maximumAge: 0 
  }; 

  function success(pos) { 
      var crd = pos.coords; 
      var lat = crd.latitude.toString(); 
      var lng = crd.longitude.toString(); 
      var coordinates = [lat, lng]; 
      console.log(`Latitude: ${lat}, Longitude: ${lng}`); 
      getCity(coordinates); 
      return; 

  } 

  function error(err) { 
      console.warn(`ERROR(${err.code}): ${err.message}`); 
  } 

  navigator.geolocation.getCurrentPosition(success, error, options); 
} 

// Step 2: Get city name 
function getCity(coordinates) { 
  var xhr = new XMLHttpRequest(); 
  var lat = coordinates[0]; 
  var lng = coordinates[1]; 

  // Paste your LocationIQ token below. 
  xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?keyYour_API_Access_Token&lat=30.468178&lon=30.926127&format=json&" + 
  lat + "&lon=" + lng + "&format=json", true); 
  xhr.send(); 
  xhr.onreadystatechange = processRequest; 
  xhr.addEventListener("readystatechange", processRequest, false); 

  function processRequest(e) { 
      if (xhr.readyState == 4 && xhr.status == 200) { 
          var response = JSON.parse(xhr.responseText); 
          var city = response.address.city; 
    const base = `https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&APPID=127881d6fad5b6a5f33704d6d74b7e3d`;

          console.log(city); 
          return; 
      } 
  } 
} 

getCoordintes();
//#endregion 
//#region  swithing
img_1.addEventListener("click",() =>{
  local_imge.setAttribute("scr","image1.jpg");
  img_1.setAttribute("data-selected","true");
  img_2.setAttribute("data-selected","false");
  img_3.setAttribute("data-selected","false");
})
img_2.addEventListener("click",() =>{
  local_imge.setAttribute("scr","image2.jpg");
  img_1.setAttribute("data-selected","false");
  img_2.setAttribute("data-selected","true");
  img_3.setAttribute("data-selected","false");
})
img_3.addEventListener("click",() =>{
  local_imge.setAttribute("scr","image3.jpg");
  img_1.setAttribute("data-selected","false");
  img_2.setAttribute("data-selected","false");
  img_3.setAttribute("data-selected","true");
})


//#endregion
