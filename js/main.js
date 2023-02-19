//Today's Card Variables:
let searchInput = document.getElementById('searchInput'),
    today = document.getElementById('today'),
    todayDate = document.getElementById('today-date'),
    cityLocation = document.getElementById('location'),
    todayDegree = document.getElementById('today-degree'),
    todayIcon = document.getElementById('today-icon'),
    todayDescription = document.getElementById('today-description'),
    humidty =document.getElementById('humidty'),
    wind = document.getElementById('wind'),
    compass = document.getElementById('compass'),
    apiResponse,
    responseData,
    currentCity = 'Cairo',
    date = new Date(),
    weekDays = ['Saturday','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday'],
    monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//Next Days Variables:
let nextDay = document.getElementsByClassName('nextDay'),
    nextDate = document.getElementsByClassName('nextDate'),
    nextDayIcon = document.getElementsByClassName('nextDay-icon'),
    maxDegree = document.getElementsByClassName('max-degree'),
    minDegree = document.getElementsByClassName('min-degree'),
    nextDayDescription = document.getElementsByClassName('nextDay-description');


async function getWeatherData(){
    apiResponse = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=494937c22a1a4b7e9ca214541231602&q=${currentCity}&days=3`);
    responseData = await apiResponse.json();
    console.log(responseData);
    displayTodayWeather();
    displayNextDaysWeather();
}


//Display Today's Data:

function displayTodayWeather(){
    let dateApi = responseData.forecast.forecastday[0].date;
    let dateComponents = dateApi.split('-');
    let currentDay = dateComponents[2];

    today.innerHTML = weekDays[date.getDay()];
    todayDate.innerHTML = `${currentDay} ${monthName[date.getMonth()]}`;
    cityLocation.innerHTML = responseData.location.name;
    todayDegree.innerHTML = Math.round(responseData.current.temp_c);
    todayIcon.setAttribute('src' , `https:${responseData.current.condition.icon}`);
    todayDescription.innerHTML = responseData.current.condition.text;
    humidty.innerHTML = responseData.current.humidity;
    wind.innerHTML = responseData.current.wind_kph;
    compass.innerHTML = responseData.current.wind_dir;
}
//Next Day - Name Function
function getNextDaysName(nextDateApi){
    let nextDayName = new Date(nextDateApi);
    return nextDayName && weekDays[nextDayName.getDay()]
}
//Next Day - Month Function
function getNextDaysMonth(nextDateApi){
    let nextDayMonth = new Date(nextDateApi);
    return nextDayMonth && monthName[nextDayMonth.getMonth()];
}

//Display Next Days Data:

function displayNextDaysWeather(){
    for(let i =0;i<nextDay.length;i++){
        let nextDateApi = responseData.forecast.forecastday[i+1].date;
        let nextDateComponents = nextDateApi.split('-');
        let next_day = nextDateComponents[2];

        nextDay[i].innerHTML = getNextDaysName(nextDateApi);
        nextDate[i].innerHTML = `${next_day} ${getNextDaysMonth(nextDateApi)}`;
        nextDayIcon[i].setAttribute('src' , `https:${responseData.forecast.forecastday[i+1].day.condition.icon}`);
        maxDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.maxtemp_c;
        minDegree[i].innerHTML = responseData.forecast.forecastday[i+1].day.mintemp_c;
        nextDayDescription[i].innerHTML = responseData.forecast.forecastday[i+1].day.condition.text;
    }
}

searchInput.addEventListener('keyup',function(){
    currentCity = searchInput.value;
    getWeatherData();
})

getWeatherData();


