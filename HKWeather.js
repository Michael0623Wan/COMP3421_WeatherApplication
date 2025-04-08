function fetchHKWeather() {
    trackCustomEvent('Fetch', 'Get HK Weather', 'Triggered'); // Track the fetching event

    const urlCurrent = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en';
    const url9day = 'https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en';
    const weatherInfo = document.getElementById('weatherInfo');  
      weatherInfo.innerHTML = '<p>Loading...</p>';
      Promise.all([
          fetch(urlCurrent),
          fetch(url9day)
        ]).then(function(responses){
          return Promise.all(responses.map(function(response){
            return response.json();
        }))
        }).then(function(data){
            const currentData = data[0]; 
            const FutureData = data[1]; // Forecast data
            const icon = currentData.icon;
            const iconurl = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${icon}.png`;
            const temperature = currentData.temperature.data[0].value;
            const humidity = currentData.humidity.data[0].value;
            const rainfall = currentData.rainfall.data[0].max || '0';
            const warningMessage = currentData.WarningMessage;
            const time = new Date(currentData.updateTime).toLocaleString();
            weatherInfo.innerHTML = `
                <div class="today">
                <img style="height:100px;width:100px;" src="${iconurl}">
                <p style="font-size:30px;"><strong>Hong Kong Weather Today</strong></p>
                <p style="font-size:50px;"> ${temperature} °C</p>
                <p><strong>Humidity:</strong> ${humidity}%</p>
                <p><strong>WarningMessage:</strong> ${warningMessage}</p>
                <p><strong>Rainfall (last hour):</strong> ${rainfall} mm</p>
                <p><strong>Last updated:</strong> ${time}</p>
                </div>
            `;

            const forecast = FutureData.weatherForecast;
            for (let i = 0; i < 6; i++){
              const forecastlist = forecast[i];
              const forecastDate = forecastlist.forecastDate;
              const weather = forecastlist.forecastWeather;
              const maxTemp = forecastlist.forecastMaxtemp.value;
              const minTemp = forecastlist.forecastMintemp.value;
              const icon = forecastlist.ForecastIcon;
              const iconurl = `https://www.hko.gov.hk/images/HKOWxIconOutline/pic${icon}.png`;

              weatherInfo.innerHTML += `
                    <div class="future">
                    <img style="height:100px;width:100px;" src="${iconurl}">
                    <p><strong>${forecastDate.slice(0,4)+"/"+forecastDate.slice(4,6)+"/"+forecastDate.slice(6,8)}</strong></p>
                    <p><strong> ${minTemp} / ${maxTemp} °C</strong></p>
                    <p id='weatherp'> ${weather}</p>
                    </div>
                `;

            }
        }).catch(function(error){
          weatherInfo.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        })
        const timeStart = performance.now();
        const timeEnd = performance.now(); 
        const loadingTime = timeEnd - timeStart; 
      
        // Send loading time to Google Analytics as a custom event
        gtag('event', 'loading_time', {
            'event_category': 'Performance',
            'event_label': 'Load Time',
            'value': Math.round(loadingTime), // Value in milliseconds
        });         
      }

window.onload = fetchHKWeather;

function trackPageView(page) {
  gtag('event', 'page_view', {
      'page_title': page,
      'page_location': window.location.href,
      'page_path': window.location.pathname
  });
}

// Call this function when the page loads
window.onload = function() {
  trackPageView('Home'); // Track page view for the home page
  fetchHKWeather(); // Fetch Hong Kong weather data
};
