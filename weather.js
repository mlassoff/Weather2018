       const getWeatherHere = function() {
            if(navigator.geolocation){
                navigator.geolocation.getCurrentPosition(showPosition);
            } else
            {
                document.getElementById('result').innerHTML = "<h3>Sorry. Geolocation is not supported.  Please enter your zip code.";
            }
        }
        
        
        const showPosition = function(pos) {
            var lat = pos.coords.latitude;
            var long = pos.coords.longitude;
            getWeatherPos(lat,long);
        }
        
        const getWeatherPos = function(lat,long) {
            const URL = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long +  "&APPID=" + KEY;
            axios.get(URL)
            .then(data=>displayForecast(data))
            .catch(err=>console.log(err));
        }
        
        const getWeather = function() {
            let zip = document.getElementById('zip').value;
            const URL = "http://api.openweathermap.org/data/2.5/weather?zip=" + zip + "&APPID=" + KEY;
            axios.get(URL)
            .then(data=>displayForecast(data))
            .catch(err=>console.log(err));
        }    
        
        const displayForecast = function(data) {
             let city = data.data.name;
             let weather = data.data.main;
             let conditions = data.data.weather[0].description;
             let icon = data.data.weather[0].icon;
             let output = "<h2>" + city + "</h2>"; 
             output += "<p>Temperature: " + kToF(weather.temp).toFixed(1) + "F";
             output += "<br/>Humidty: " + weather.humidity + "%";
             output += "<br/>Today's High: " + kToF(weather.temp_max).toFixed(1) + "F";
             output += "<br/>Today's Low: " + kToF(weather.temp_min).toFixed(1) + "F";
             output += "<br/>Conditions: " + conditions;
             output += "<br/><img src='http://openweathermap.org/img/w/" + icon + ".png'/></p>";
             
             document.getElementById('result').innerHTML = output;
            
        }
        
        const kToF  = (ktemp) => { return ktemp * (9/5) - 459.67 };
        
        document.getElementById('btnWeather').onclick = getWeather;
        document.getElementById('btnWeatherHere').onclick = getWeatherHere;