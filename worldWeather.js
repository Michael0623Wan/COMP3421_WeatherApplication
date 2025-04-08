const apikey = 'a627f14dfc964a3299e51454250504'
function getWeather() {
    // get the city name from cityInput
    const city = document.getElementById('cityInput').value;
    trackCustomEvent('Search', 'Get Weather', city); // Track custom event for search
    // the API Url
    let worldapiUrl = `https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${apikey}&q=${city}&format=json&showlocaltime=yes`;
	const xhr = new XMLHttpRequest();
    //get the data from the API Url
	xhr.open("GET", worldapiUrl, true);
	xhr.onload = function() {
		if (xhr.status === 200) {
			const Weather = JSON.parse(xhr.responseText);
			const Worldweather = document.getElementById('weatherInfo')
            const localtime = Weather.data.time_zone[0].localtime
            const temp_C = Weather.data.current_condition[0].temp_C
            const humidity = Weather.data.current_condition[0].humidity
            const rainfall = Weather.data.current_condition[0].weatherDesc[0].value
            const icon = Weather.data.current_condition[0].weatherIconUrl[0].value
            console.log(temp_C,humidity,rainfall);
            
			Worldweather.innerHTML = `
            <div class="today">
            <img style="height:100px;width:100px;" src="${icon}">
            <p style="font-size:30px;"><strong>${city} Weather Today</strong></p>
            <p style="font-size:50px;"> ${localtime}</p>
            <p style="font-size:50px;"> ${temp_C} °C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Rainfall:</strong> ${rainfall} </p>
            </div>
        `;
		}
	};
	xhr.send();
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

function trackCustomEvent(category, action, label) {
    gtag('event', action, {
        'event_category': category,
        'event_label': label
    });
}

