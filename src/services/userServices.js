import { instance, protectedInstance } from "./instance"

const userServices = {
    register:async(email,username,password)=>{
        console.log(email)
        return await instance.post('/users/register',{email,username,password})
    },
    mentorRegister:async(email,username,password)=>{
        console.log(email)
        return await instance.post('/users/mentorregister',{email,username,password})
    },
    mentorLogin:async(email,password)=>{
        return await instance.post('users/mentorlogin',{email,password},{ withCredentials: true })
    }
    ,
    login:async(email,password)=>{
        return await instance.post('users/login',{email,password},{ withCredentials: true })
    },
    getCurrentuser:async()=>{
        return await protectedInstance.get('users/me')
    },
    getCurrentMentor:async()=>{
        return await protectedInstance.get('users/mentorme')
    },
    adminRegister:async(email,username,password)=>{
        console.log(email)
        return await instance.post('/users/adminregister',{email,username,password})
    },
    adminLogin:async(email,password)=>{
        return await instance.post('users/adminlogin',{email,password},{ withCredentials: true })
    },
    requestMentor:async(values)=>{
        return await protectedInstance.post('users/requestmentor',values)
    },
    getmentorRequests:async(values)=>{
        return await protectedInstance.get('users/getmentorrequests')
    },
    updatementorRequests:async(values)=>{
        return await protectedInstance.post('users/mentorregisterupdate',values)
    },

}
export default userServices