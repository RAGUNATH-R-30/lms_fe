import { instance, protectedInstance } from "./instance"

const userServices = {
    register:async(email,username,password)=>{
        console.log(email)
        return await instance.post('/users/register',{email,username,password})
    },
    login:async(email,password)=>{
        return await instance.post('users/login',{email,password},{ withCredentials: true })
    },
    getCurrentuser:async()=>{
        return await protectedInstance.get('users/me')
    }

}
export default userServices