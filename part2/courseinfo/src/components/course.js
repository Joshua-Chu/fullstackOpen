

const Header = ({name}) =>{
    return(
      <h3>{name}</h3>
    )
  }
  
  const Part = ({name, exercises}) =>{
  
    return(
      <p>{name} {exercises}</p>
    )
  }
  const Content = ({parts}) =>{
    return (
      <div>
        {
          parts.map(part=>{
            return <Part key={part.id} name={part.name} exercises={part.exercises}/>
          })
        }
      </div>
    )
  }
  
  const Total = ({parts}) =>{
    return(
      <p>
        <strong>
          total of {parts.reduce((total, part)=>{
            return total + part.exercises
          }, 0)} exercises
        </strong>
      </p>
    )
  }
  const Course = ({course}) =>{
    return(
      <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </div>
    )
  }
  

export default Course