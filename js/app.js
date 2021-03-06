window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let weatherIcon = document.querySelector('.weather-icon'); 
  let temperatureMetric = document.querySelector(".degree-section"); 
  let temperatureSpan = document.querySelector(".degree-section span");
    
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      // test of function
      long = position.coords.longitude; 
      lat = position.coords.latitude;
    const proxy = 'https://cors-anywhere.herokuapp.com/';  
    const api = `${proxy}http://api.weatherapi.com/v1/current.json?key=ac674f7e8bc045a6a2a120401201705&q=${lat},${long}`;
      
      fetch(api)
        .then(response => {
          return response.json();
        })
        .then(data => {
          
          const { temp_f, temp_c } = data.current;
          const { text } = data.current.condition;
          const { name } = data.location;
          const { region } = data.location;
          const { icon } = data.current.condition;
          // set the DOM elements from the API
          
          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = text;
          
          // setting the location as city, state
          
          let neighborhood = name.toString();
          let city = region.toString();
          locationTimezone.textContent = neighborhood + ", " + city;          
          
          // setting the weather icon
          weatherIcon.src = icon;
          
          // toggle temperature to celsius/farenheit
          temperatureMetric.addEventListener('click', () => {
              if (temperatureSpan.textContent === "F") {
                  temperatureSpan.textContent = "C";
                  
                  temperatureDegree.textContent = temp_c;
              
              } else {
                  temperatureSpan.textContent = "F";
                  temperatureDegree.textContent = temp_f;
              }
          });
        });
    });
  } 
});