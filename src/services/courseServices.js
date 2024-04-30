import { protectedInstance } from "./instance"

const courseServices = {
    uploadcourse:async(values)=>{
        return await protectedInstance.post('users/course/uploadcourse',values)
    },
    uploadvideo:async(values)=>{
        return await protectedInstance.post('users/course/uploadvideo',values)

    },
    getMycourses:async(values)=>{
        console.log(values)
        return await protectedInstance.post('users/course/mycourses',values)

    }
}
export default courseServices;