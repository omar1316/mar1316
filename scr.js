//#region html element
const greetingmassge=document.getElementById("greeting");
const hour_holder=document.querySelector("span[data-time=hours]");
const min_holder=document.querySelector("span[data-time=minutes]");
const sec_holder=document.querySelector("span[data-time=seconds]");
let darkmode=localStorage.getItem('darkmode');
const btn_dark=document.querySelector("#dark-mode-btn");
const city_lo=document.getElementsByClassName("city");
let local_imge=document.querySelector("[alt='image1']");
let img_1=document.querySelector("[alt='Thumbnail Image 1']");
let img_2=document.querySelector("[alt='Thumbnail Image 2']");
let img_3=document.querySelector("[alt='Thumbnail Image 3']");
//#endregion
//#region up_data
setInterval(() =>{
    //#region greeting massge
     let localTime =new Date();
     let houers =localTime.getHours();
     if(houers>=0 && houers<12)
       {
        greetingmassge.innerText="Good Morgin ";
       }
    else if(houers>=12 && houers<18)
        {
         greetingmassge.innerText="Good Afternoon";
        }
    else if(houers>=18 && houers<20)
        {
        greetingmassge.innerText="Good Evening";
         }
    else if(houers>=20 && houers<24)
        {
         greetingmassge.innerText="Good Night";   
        }
    //#endregion
    let minutes = localTime.getMinutes();
    let seconds = localTime.getSeconds();
    hour_holder.innerText = houers.toString().padStart(2, "0");
   min_holder.innerText = minutes.toString().padStart(2, "0");
    sec_holder.innerText = seconds.toString().padStart(2, "0");

},1000);
//#endregion

//#endregion
//#region werther
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
    xhr.open('GET', "https://us1.locationiq.com/v1/reverse.php?key=Your_API_Access_Token&lat=30.468178&lon=30.926127&format=json&" + 
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
function initMap() {
    var location = {lat: 26.355216, lng: -80.203384}; // Example coordinates for Boca Raton, Florida
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: location
    });
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}
//#region  swithing
img_1.addEventListener("click",myfunction);
   function myfunction()
   {
    local_imge.setAttribute("src","img1.jpeg");
    img_1.setAttribute("data-selected","true");
    img_2.setAttribute("data-selected","false");
    img_3.setAttribute("data-selected","false");
   };

img_2.addEventListener("click",myfunction1);
  function myfunction1()
  {
    local_imge.setAttribute("src","img2.jpg");
    img_1.setAttribute("data-selected","false");
    img_2.setAttribute("data-selected","true");
    img_3.setAttribute("data-selected","false");
  };
img_3.addEventListener("click",myfunction2);
  function myfunction2()
  {
    local_imge.setAttribute("src","img3.jpg");
    img_1.setAttribute("data-selected","false");
    img_2.setAttribute("data-selected","false");
    img_3.setAttribute("data-selected","true");
  };
  
  //#endregion
  

