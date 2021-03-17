import axios from 'axios'
import { useEffect, useState } from 'react'
import Countries from './components/countries'

const App = () =>{
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')

  useEffect(()=>{
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(res =>{
        setCountries(res.data)
      
      })

  }, [])

  const handleSetSearch = (e)=>{
    setSearch(e.target.value)
  }

  const searchedCountries = countries.filter(country=>{
    return country.name.toLowerCase().includes(search.toLowerCase())
  })


  return(
    <div>
      find countries <input value={search} onChange={handleSetSearch}/>
      <Countries countries={searchedCountries}/>
    
    </div>
  )
}


export default App