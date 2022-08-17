document.getElementById("search").addEventListener("keyup",function(event){
        
    if(event.keyCode ===13){
        event.preventDefault();
        document.getElementById("submit").click();
    }
})
function getData(){
    let city = document.getElementById("search").value;
     const apikey = "e0a061a09063942791323a30fe14fc17";
     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

      fetch(url)
      .then(function(res){
       return res.json();
     })
     .then(function(res){
        appendData(res)
        console.log(res)
     })
     .catch(function(err){
         console.log(err)
        let box = document.querySelector("#container");
        box.innerText = `Please Refresh and try again 🤒`;
    })
    function appendData(data){      

        let data_box = document.querySelector("#data");
        data_box.innerHTML=null;

        let frame = document.getElementById("map");
        
        let map = document.getElementById("gmap_canvas");
        map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

        let name = document.createElement("h2");
        name.innerText = data.name;
        let x = data.name;
        cityFunc(x);
        
        let temp = document.createElement("h1");
        temp.innerText = `Temp: ${Math.floor(data.main.temp-273)}° C`;

        let temp_min = document.createElement("p");
        temp_min.innerText = `Min temp: ${Math.floor(data.main.temp_min-273)}° C`;

        let temp_max = document.createElement("p");
        temp_max.innerText = `Max temp: ${Math.floor(data.main.temp_max-273)}° C`;

        let humidity = document.createElement("h4");
        humidity.innerText = `Humidity: ${data.main.humidity}%`;

        let wind = document.createElement("p");
        wind.innerText = `Wind Speed: ${Math.floor(data.wind.speed*1.60934)} kmph`;

        let clouds = document.createElement("p");
        clouds.innerText = `Clouds: ${data.clouds.all}%`

        let sunrise_data = data.sys.sunrise;
        let sunset_data = data.sys.sunset;
        let milliseconds_sunrise = sunrise_data * 1000 ;
        let milliseconds_sunset = sunset_data * 1000 ;
        let dateObject1 = new Date(milliseconds_sunrise);
        let dateObject2 = new Date(milliseconds_sunset);
        let sunrise = dateObject1.toLocaleString() ;
        let sunset = dateObject2.toLocaleString() 
        let sun = document.createElement("p");
        sun.innerText = `Sunrise 🌅 ${sunrise},Sunset 🌇 ${sunset}`;

        frame.append(map)
        data_box.append(name,temp,temp_min,temp_max,humidity,wind,clouds,sun)

    }
 }
 
 //api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
function getlocation(){
    navigator.geolocation.getCurrentPosition(success);
    function success(pos){
    var crd = pos.coords;

    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);

    const apikey = "e0a061a09063942791323a30fe14fc17";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=${apikey}`;
    fetch(url)
    .then(function(res){
     return res.json();
   })
   .then(function(res){
      appendData(res)
      console.log(res)
   })
   .catch(function(err){
    let box = document.querySelector("#container");
    box.innerText = `Please Refresh and try again 🤒`;
  })
   
  }
  function appendData(data){      

    let data_box = document.querySelector("#data");
    data_box.innerHTML=null;

    let frame = document.getElementById("map");
    
    let map = document.getElementById("gmap_canvas");
    map.src = `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`

    let name = document.createElement("h2");
    name.innerText = data.name;
        let x = data.name;
        cityFunc(x);

    let temp = document.createElement("h1");
    temp.innerText = `Temp: ${Math.floor(data.main.temp-273)}° C`;

    let temp_min = document.createElement("p");
    temp_min.innerText = `Min temp: ${Math.floor(data.main.temp_min-273)}° C`;

    let temp_max = document.createElement("p");
    temp_max.innerText = `Max temp: ${Math.floor(data.main.temp_max-273)}° C`;

    let humidity = document.createElement("h4");
    humidity.innerText = `Humidity: ${data.main.humidity}%`;

    let wind = document.createElement("p");
    wind.innerText = `Wind Speed: ${Math.floor(data.wind.speed*1.60934)} kmph`;

    let clouds = document.createElement("p");
    clouds.innerText = `Clouds: ${data.clouds.all}%`

    let sunrise_data = data.sys.sunrise;
    let sunset_data = data.sys.sunset;
    let milliseconds_sunrise = sunrise_data * 1000 ;
    let milliseconds_sunset = sunset_data * 1000 ;
    let dateObject1 = new Date(milliseconds_sunrise);
    let dateObject2 = new Date(milliseconds_sunset);
    let sunrise = dateObject1.toLocaleString() ;
    let sunset = dateObject2.toLocaleString() 
    let sun = document.createElement("p");
    sun.innerText = `Sunrise 🌅 ${sunrise},Sunset 🌇 ${sunset}`;

    frame.append(map)
    data_box.append(name,temp,temp_min,temp_max,humidity,wind,clouds,sun)

 }
}

function cityFunc(x){
    let city = x;
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e0a061a09063942791323a30fe14fc17`;
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        console.log('res:', res);
        forcastData(res)
    })
    .catch(function(err){
        console.log('err:', err)
    })
}
let forcast_box = document.getElementById("forcast");
 function forcastData(data){
    forcast_box.innerHTML = null;
    data.list.map(function(el,ind){   
        if(ind%7===0 && ind!=0){
            console.log(el,ind)
            let div = document.createElement("div");
            div.setAttribute("class","days");
            
            const unixTimestamp = el.dt;
            const milliseconds = unixTimestamp * 1000;
            const dateObject = new Date(milliseconds)
            let week_day = dateObject.toLocaleString("en-US", {weekday: "long"});
            let day = document.createElement("p");
            day.innerText = week_day;

            let img = document.createElement("img");
            let icon = el.weather[0].icon;
            img.src = `http://openweathermap.org/img/wn/${icon}.png`;

            let max = document.createElement("p");
            max.innerText = `${Math.floor(el.main.temp_max -273)}°`;

            let min = document.createElement("p");
            min.innerText = `${Math.floor(el.main.temp_min -273)}°`;

            div.append(day,img,max,min)
            forcast_box.append(div)
         }
    })
       
 }
