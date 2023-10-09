import React, { useState } from 'react'

const api = {
  key: "6c92e049ecf299a5e2f1eb4a5fee744a",
  baseUrl: "https://api.openweathermap.org/data/2.5/"
}

const MainBox = () => {

  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const dateBuilder = (d) => {


    let months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let days = [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let hour = d.getHours();
    let minutes = d.getMinutes();

    return `${day}, ${date} ${month} ${year}, Time: ${hour}:${minutes}`
  }

  const searchResult = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.baseUrl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result)
          setQuery('');
        });
    }
  }
  return (
    <div className="container flex bg-blue-500 font-extrabold">
      <div className="w-[75%] h-[100vh] bg-blue-300 mx-auto flex rounded-3xl">
        <div className="my-[10vh] mx-[10vw] h-[80vh] w-[75vw] bg-blue-100 rounded-3xl">
          <input type="text"
            placeholder='Enter City ...'
            autoFocus
            className='w-full text-slate-600 text-center rounded-3xl h-20 text-xl font-bold'
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={searchResult}
          />
          {(typeof weather.main != "undefined")
            ? (
              <>
                <div className="mt-20 items-center justify-center">
                  <div className="flex mb-10">
                    <div className="place mx-auto">Date : {dateBuilder(new Date())}</div>
                  </div>
                  <div className="flex">
                    <div className="place mx-auto">City: {weather.name},Country: {weather.sys.country}</div>
                  </div>
                  <div className="flex mt-10">
                    <div className="temp mx-auto">Temp: {Math.floor(weather.main.temp)}°C</div>
                  </div>
                  <div className="flex mt-10">
                    <div className="temp mx-auto">Feels like: {Math.floor(weather.main.feels_like)}°C</div>
                  </div>
                  <div className="flex mt-10">
                    <div className="temp mx-auto">{weather.weather[0].description}</div>
                  </div>
                </div>
                <div className="flex mt-16">
                  <button className='mx-auto mt-5 rounded-2xl w-40 h-12 bg-blue-100 text-black hover:bg-blue-800 hover:text-white' onClick={() => window.location.reload(false)} type="submit">Reload</button>
                </div>
              </>
            )
            : (
              <div className="mt-28 items-center justify-center">
                <div className="flex mb-10">
                  <div className="place mx-auto">Date : </div>
                </div>
                <div className="flex">
                  <div className="place mx-auto">City :  Country: </div>
                </div>
                <div className="flex mt-10">
                  <div className="temp mx-auto">Temp : °C</div>
                </div>
                <div className="flex mt-10">
                  <div className="temp mx-auto">Feels like: °C</div>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  )
}

export default MainBox