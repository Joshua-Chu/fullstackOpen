

const Person = ({person, handleDelete})=>{
    

    return(
       <div>
            {person.name} {person.number}
            <button onClick={()=>handleDelete(person.id, person.name)}>Delete</button>
       </div>
    )
}
const Persons = ({persons, handleDelete}) =>{
 


    return (
        <div>
            { 
                persons.map(person=>
                        <Person key={person.number} person={person} handleDelete={handleDelete}/>
                
                )
            }
        </div>
       
    )
}
export default Persons