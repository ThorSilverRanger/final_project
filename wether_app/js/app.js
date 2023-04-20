const wrapper = document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn = inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");

let api;
// JavaScript
const citySelect = document.getElementById("citySelect");

citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value;
    if (selectedCity) {
        requestApi(selectedCity);
        localStorage.setItem("lastCity", selectedCity);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        citySelect.value = lastCity;
    }
});


inputField.addEventListener("keyup", e =>{
    if(e.key == "Enter" && inputField.value != ""){
        requestApi(inputField.value);
        localStorage.setItem("lastCity", inputField.value);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const lastCity = localStorage.getItem("lastCity");
    if (lastCity) {
        inputField.value = lastCity;
    }
});


locationBtn.addEventListener("click", () =>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        alert("Ваш браузер не підтримує API геолокації");
    }
});

function requestApi(city){
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=1f260adcbb88d3972731a3e8a036a27f`;
    fetchData();
}

function onSuccess(position){
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=1f260adcbb88d3972731a3e8a036a27f`;
    fetchData();
}

function onError(error){
    infoTxt.innerText = error.message;
    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Отримання деталей погоди...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Щось пішло не так";
        infoTxt.classList.replace("pending", "error");
    });
}

function weatherDetails(info){
    if(info.cod == "404"){
        infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} не є назвою міста`;
    }else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;

        if(id == 800){
            wIcon.src = "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-01-64.png";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-04-64.png";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-24-64.png";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "https://cdn4.iconfinder.com/data/icons/the-weather-is-nice-today/64/weather_30-64.png";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-26-64.png";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "https://cdn2.iconfinder.com/data/icons/weather-color-2/500/weather-31-64.png";
        }
        
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp);
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
    }
}

arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});

const reloadBtn = document.getElementById("reloadBtn");

reloadBtn.addEventListener("click", () => {
  location.reload(); // Reloads the page
});

const dateHeading = document.getElementById('dateHeading');
const currentDate = new Date();
dateHeading.textContent = currentDate.toLocaleDateString();