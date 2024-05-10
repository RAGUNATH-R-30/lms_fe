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
    coursePayment:async(values)=>{
        return await protectedInstance.post('users/payment/checkout',values)
        // return await protectedInstance.post('users/course/enrollcourse',values)
    },
    enrollCourse:async(values)=>{
        // return await protectedInstance.post('users/payment/checkout',values)
        return await protectedInstance.post('users/course/enrollcourse',values)
    },
    getUsercourses:async(values)=>{
        return await protectedInstance.post('users/course/getusercourses',values)
    },
    createQuiz:async(values)=>{
        console.log(values)
        return await protectedInstance.post('users/course/createquiz',values)
    },
    getUserprogress:async(values)=>{
        return await protectedInstance.post('users/course/getuserprogress',values)
    },
    getQuiz:async(values)=>{
        return await protectedInstance.post('users/course/getquiz',values)
    },
    updateQuizanswer:async(values)=>{
        console.log(values)
        return await protectedInstance.post('users/course/updatequizanswer',values)
    },
    
    
}
export default courseServices;