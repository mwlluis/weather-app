window.addEventListener('load', () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
    
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
          console.log(data);
          const { temp_f } = data.current;
          const { text } = data.current.condition;
          const { name, region } = data.location;
          // set the DOM elements from the API
          temperatureDegree.textContent = temp_f;
          temperatureDescription.textContent = text;
          locationTimezone.textContent = name;
          
        })
    });
  } 
});