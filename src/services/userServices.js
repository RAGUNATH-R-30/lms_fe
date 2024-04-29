import { instance } from "./instance"

const userServices = {
    register:async(email,username,password)=>{
        console.log(email)
        return await instance.post('/users/register',{email,username,password})
    },
    login:async(email,password)=>{
        return await instance.post('users/login',{email,password})
    }

}
export default userServices