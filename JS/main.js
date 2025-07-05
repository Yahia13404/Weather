const search = document.getElementById("search")
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function getCity(city) {
    let response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=7d77b96c972b4d119a3151101212704&q=${city}&days=3`);
    if(response.ok){
        let data = await response.json()
        console.log(data)
        displayCurrent(data.location.name,data.current.temp_c,data.current.condition.text,data.current.condition.icon);
        displayToday(data.current.last_updated)
        displayTommorow(data.forecast.forecastday[1].day.maxtemp_c,data.forecast.forecastday[1].day.mintemp_c,data.forecast.forecastday[1].day.condition.text,data.forecast.forecastday[1].day.condition.icon)
        tommorowDate(data.forecast.forecastday[1].date)
        displayAftertommorow(data.forecast.forecastday[2].day.maxtemp_c,data.forecast.forecastday[2].day.mintemp_c,data.forecast.forecastday[2].day.condition.text,data.forecast.forecastday[2].day.condition.icon)
        afterTommorowdate(data.forecast.forecastday[2].date)
    }
    
    
}
search.addEventListener("keyup", ()=>{
    getCity(search.value)
})
function displayCurrent(name,currentTemp,condition,icon){
    document.getElementById("city").innerHTML = `<h2>${name}</h2>` ;
    document.querySelector("#today .temperature").textContent = `${currentTemp}oC`
    document.querySelector("#today .condition").textContent = `${condition}`
    document.querySelector("#today .condition-icon").innerHTML = `<img
                    class="condition-icon"
                    src="https:${icon}"
                    alt="sun"
                  />`
    
}
function displayToday(t){
    let now = new Date(t)
    document.querySelector("#today .day-name").innerHTML= days[now.getDay()]
    document.querySelector("#today .date").innerHTML= now.getDate() + monthNames[now.getMonth()] 
    // console.log(monthNames[currentmonth])
    // console.log(days[now.getDate()])
    // let currentmonth = now.getMonth()
}
function displayTommorow(forecastTemp,min,forecastCondition,icon){
    document.querySelector("#tommorow .temperature").textContent = `${forecastTemp}oC`
    document.querySelector("#tommorow .mintemperature").textContent = `${min}oC`
    document.querySelector("#tommorow .condition").textContent = `${forecastCondition}`
    document.querySelector("#tommorow .condition-icon").innerHTML = `<img
                    class="condition-icon"
                    src="https:${icon}"
                    alt="sun"
                  />`
    
}
function tommorowDate(t){
    let now = new Date(t)
    document.querySelector("#tommorow .day-name").innerHTML= days[now.getDay()]
    datefortommorow = now.getDate() ;
    document.querySelector("#tommorow .date").innerHTML= datefortommorow + monthNames[now.getMonth()] 

}
function displayAftertommorow(forecastTemp,min,forecastCondition,icon){
    document.querySelector("#afterTomorrow .temperature").textContent = `${forecastTemp}oC`
    document.querySelector("#afterTomorrow .mintemperature").textContent = `${min}oC`
    document.querySelector("#afterTomorrow .condition").textContent = `${forecastCondition}`
    document.querySelector("#afterTomorrow .condition-icon").innerHTML = `<img
                    class="condition-icon"
                    src="https:${icon}"
                    alt="sun"
                  />`
}
function afterTommorowdate(t){
    let now = new Date(t)
    document.querySelector("#afterTomorrow .day-name").innerHTML= days[now.getDay()]
    dateforAftertommorow = now.getDate() ;
    document.querySelector("#afterTomorrow .date").innerHTML= dateforAftertommorow + monthNames[now.getMonth()] 

}
getCity("cairo")





