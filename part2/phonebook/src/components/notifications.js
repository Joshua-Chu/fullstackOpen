const Notifications = ({notif})=>{
    if (notif === null){
        return(
            null
        )
    }else if (notif.includes('has already been removed from the server')){
        return (
            <h1 className='error'>{notif}</h1>
        )
    }else{
        return(
            <h1 className='success'>{notif}</h1>
        )
    }
    
}


export default Notifications