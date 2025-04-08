# Project Name:  Weather Application Using Web APIs
# develop in Visual Studio Code 
# Description:  Dynamically display Hong Kong weather data in a user-friendly format. The user also can enter the name of city in the search bar to search to weather in different cities.  A weather application that fetches real-time weather information from a public API: HK Observatory or OpenWeatherMap and displays it on a web page. 

# HK Observatory API used :
https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=en
https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=en

# OpenWeatherMap API used :
https://api.worldweatheronline.com/premium/v1/weather.ashx?key=${apikey}&q=${city}&format=json&showlocaltime=yes

## Setup 
 - Clone this repository: git clone https://github.com/Michael0623Wan/COMP3421_WeatherApplication.git
 - Recommend to run in Visual Studio Code
## Running the Project
 - You can just copy the code into your working environment 
 - OR click the weatherHongKong.html
 - You should see the dynamic Hong Kong current weather and 7-day forecast weather
 - Recommend to use your own api key for fetching the information from OpenWeatherMap API
## Testing 
 - Keep all of this code in same directory
 - Open the html file and check whether the information is printed
 - Enter the city name in the search bar and check whether the differetn city temperature show below
