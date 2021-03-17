import { useEffect, useState } from 'react'
import Persons from './components/persons'
import Filter from './components/filter'
import PersonForm from './components/personform'
import phoneService from './services/phone'
import Notifications from './components/notifications'


const App = ()=>{
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [search, setSearch] = useState('')
  const [notif, setNotif] = useState(null)

  useEffect(()=>{
    phoneService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
      .catch(err => console.log(err))
  }, [])




  const handleSetNewName = (e)=>{
    setNewName(e.target.value)
  }
  
  const handleSetNewNum = (e) =>{
    setNewNum(e.target.value)
  }

  const handleSetSearch = (e)=>{
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  const filteredPersons = search === ''? persons : persons.filter(person=> person.name.toLowerCase().includes(search.toLowerCase()))

  const addName = (e) =>{
    e.preventDefault()
    if (persons.findIndex(person=> person.name === newName) !== -1){
      const confirmation = () => window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      
      if(confirmation()){
        const person = persons.find(p => p.name === newName)
        const newObj = {...person, number: newNum}

        phoneService
          .update(newObj.id, newObj)
          .then((res) =>{
            const copy = persons.map(person => person.id !== newObj.id ? person : res)
            setPersons(copy)
          })
      }

    }else if (newName === '' || newNum === ''){
      alert("Cannot add empty info")
      setNewName('')
      setNewNum('')
    }else{

      const newObj = {name: newName, number: newNum}

      phoneService
        .create(newObj)
        .then(returnObj =>{
          setPersons(persons.concat(returnObj))
          setNewName('')
          setNewNum('')
        }).catch(err => console.log(err))

        setNotif(`Added ${newName}`)

        setTimeout(() => {
          setNotif(null)
        }, 2500);
    }
  }

  const handleDelete = (id,name) =>{
    const confirmation = () => window.confirm(`Delete ${name}?`)
    if (confirmation()){
        phoneService
            .deleteItem(id)
            .then(() => {
              const personCopy = persons.filter(person=> person.id !== id)
              setPersons(personCopy)
            })
            .catch(err=> setNotif(`Information of ${name} has already been removed from the server`))

            
            setTimeout(() => {
              setNotif(null)
            }, 2500);
    }
  }




  return(
    <div>
      <h2>Phonebook</h2>
      <Notifications notif={notif}/>
      <Filter search={search} handleSetSearch={handleSetSearch}/>
      <h2>Add a new</h2>
      <PersonForm addName={addName} value={{newName, newNum}} handleEvent={{handleSetNewName, handleSetNewNum}}/>
    
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} handleDelete={handleDelete}/>
    </div>
  )
}


export default App 