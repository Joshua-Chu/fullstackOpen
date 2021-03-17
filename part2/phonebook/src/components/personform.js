const Input = ({value, handleEvent, text})=>{
    return(
        <div>
            {text}:  <input value={value} onChange={handleEvent} />
        </div>
    )
}


const PersonForm = (props)=>{
    const {addName, value, handleEvent} = props


    return(
  
        <div>
            <form onSubmit={addName}>
                <Input text="Name" value={value.newName} handleEvent={handleEvent.handleSetNewName}/>
                <Input text="Number" value={value.newNum} handleEvent={handleEvent.handleSetNewNum}/>
                <div>
                    <button type='submit'>Add</button>  
                </div>
             </form>
        </div>
      
    )

}

export default PersonForm