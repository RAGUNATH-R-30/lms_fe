import axios from "axios"

const baseURL = 'http://localhost:3001/api'

// const baseURL = 'https://lms-api-7wf7.onrender.com/api'

const instance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
})

const protectedInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export{instance,protectedInstance};