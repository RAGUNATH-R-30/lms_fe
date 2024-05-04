import { protectedInstance } from "./instance"

const courseServices = {
    uploadcourse:async(values)=>{
        return await protectedInstance.post('users/course/uploadcourse',values)
    },
    uploadvideo:async(formData)=>{
        // console.log(values)

        return await protectedInstance.post('users/course/uploadvideo',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
              }
        })

    },
    getMycourses:async(values)=>{
        console.log(values)
        return await protectedInstance.post('users/course/mycourses',values)

    },
    getCoursebyId:async(values)=>{
        console.log(values)
        return await protectedInstance.post('users/course/getcoursebyid',values)
    },
    getVideoUrl:async(values)=>{
        console.log(values)
        return await protectedInstance.post('users/course/getvideourl',values)
    },
    getAllvideos:async(values)=>{
        console.log(values)
        return await protectedInstance.post('users/course/getallvideos',values)
    },
    getAllcourses:async()=>{
        return await protectedInstance.get('users/course/getallcourses')
    },
    enrollCourse:async(values)=>{
        return await protectedInstance.post('users/course/enrollcourse',values)
    },
    getUsercourses:async(values)=>{
        return await protectedInstance.post('users/course/getusercourses',values)
    }
    
}
export default courseServices;