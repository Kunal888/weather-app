import React, { useEffect, useState } from 'react'
import './App.css'

function App() {
  
  const [location, setLocation] = useState('London')
  const [tempLocation, setTempLocation] = useState('London')
  const [city, setCity] = useState('')
  const [temperature, setTemperature] = useState('')
  const [description, setDescription] = useState('')
  const [icon, setIcon] = useState('')

  function handleOnSubmit(event) {
    event.preventDefault()
    setLocation(tempLocation)
  }

  useEffect(() => {
    async function fetchData() {
      const API_KEY = `e6ddec8aa59b9f30aaafac7c95d94dbc`
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${API_KEY}`
      
      const response = await fetch(url)
      const res = await response.json()
      if(res.main !== undefined) {
        setCity(res.name)
        setTemperature(res.main.temp)
        setDescription(res.weather[0].main)
        setIcon(res.weather[0].icon)
      }
      else {
        setCity('')
      }
    }
    fetchData()
  }, [location])

  return(
    <div className="App">
      <form id="form" onSubmit={handleOnSubmit}>
        <input 
          type="text"
          id="search-text"
          value={tempLocation}
          placeholder="Enter the place here..."
          onChange={(e) => setTempLocation(e.target.value)}
        />
        <button type="submit" id="search-button">Search</button>
      </form>
      <div id="data">
        {city!=='' && (
        <>
          <div className="data-item">
            {city}
          </div>
          <div className="data-item" id="temperature">
            {temperature} &#8451;
          </div>
          <div className="data-item">
            {<img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={description}/>}
          </div>
          <div className="data-item">
            {description}
          </div>
        </>
        )}
        {city==='' && (
          <>
            <div id="error-text">
              City not found!
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default App
