import axios from 'axios'


const baseURL = 'http://localhost:3001/persons'



const getAll = ()=>{
    const response = axios.get(baseURL)
    return response.then(res => res.data)
}

const create = (newObj) =>{
    const response = axios.post(baseURL, newObj)
    return response.then(res => res.data)
}

const deleteItem = (id) =>{
    const response = axios.delete(`${baseURL}/${id}`)
    return response.then(res => res.data)
}


const update = (id, newObj) =>{
    const response = axios.put(`${baseURL}/${id}`, newObj)
    return response.then(res => res.data)
}

export default {getAll , create, deleteItem, update}