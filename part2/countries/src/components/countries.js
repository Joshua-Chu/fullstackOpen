import { useEffect, useState } from "react"
import axios from 'axios'


const api_key =process.env.REACT_APP_API_KEY

const Country = ({country})=>{
  
    const [showDetails, setShowDetails] = useState(false)
    return(
        <div>
             {country.name}
             <button onClick={()=> setShowDetails(!showDetails)}>
                 {!showDetails? "Show" : "Hide"}
             </button>

            {showDetails? <SingleCountry country={[country]}/> : ""}
        </div>
       
    )
    
}

const SingleCountry = ({country})=>{
    const {name, capital, population, languages, flag} = country[0]


    const [weather, setWeather] = useState('')

    useEffect(()=>{
        axios
            .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
            .then(res =>{
                setWeather(res.data)
              
            })
    }, [capital])
   

    
 
    return(
        <div>
            <h1>{name}</h1>
            <p>Capital: {capital}</p>
            <p>Population: {population}</p>
            <h3>Languages</h3>
            <ul>
                {
                    languages.map(lang => 
                        <li key={lang.name}>{lang.name}</li>
                    )
                }
            </ul>
            <img src={flag} alt="this is the flag" width="300"/>
            <div>
               {
                   weather === '' 
                   ? 'Loading...' 
                   : <div>
                       <h3>Weather in {capital}</h3>
                        <h4>temperature {weather.current.temperature} Celsius</h4>
                        <img src={weather.current.weather_icons} alt="weather display"/>
                        <h4>wind: {weather.current.wind_speed} mph direction {weather.current.wind_dir}</h4>
                   </div>
               }
            </div>
          
          
  
            
        </div>
    )
}
const Countries = ({countries})=>{
    if(countries.length > 10){
        return(
            <p>Too many matches, specify another filter</p>
        )
    }else if(countries.length === 1){
        return(
            <div>
                <SingleCountry country={countries}/>
            </div>
        )
    }else{
        return(
            <div>
                {
                    countries.map(country => 
                        <Country key={country.name} country={country}/>
                      )
                }
            </div>
        )
        
    }
    
}

export default Countries