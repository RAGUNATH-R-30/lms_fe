import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Register from './components/Register'
import Signin from './components/Signin'
import Dashboardnav from './wrappers/Dashboardnav'
import UploadForm from './components/UploadForm'
import{loader as userLoader} from './components/UploadForm'
import UploadVideo from './components/UploadVideo'
import MyCourses from './components/MyCourses'
import VideoPlayer from './components/VideoPlayer'
import VideoPage from './wrappers/VideoPage'
import Mentorregister from './components/Mentorregister'
import Mentorsignin from './components/Mentorsignin'
import Userdashboardnav from './wrappers/Userdashboardnav'
import Allcourses from './components/Allcourses'
import UserMyCourses from './components/UserMyCourses'
import ViewCourse from './components/ViewCourse'
import {loader as currentuserLoader} from './components/ViewCourse'
import{loader as usercoursesLoader} from './components/UserMyCourses'
import Quiz from './components/Quiz'
import Success from './components/success'
import success from './components/success'
import Failure from './components/Failure'
import Quizupload from './components/Quizupload'
import Adminsignin from './components/Adminsignin'
import Adminregister from './components/Adminregister'
import AdminDashboardnav from './wrappers/AdminDashboardnav'
import MentorRequests from './components/MentorRequests'
import Myrequests from './components/Myrequests'




const router = createBrowserRouter([
  {
    path:"/",
    element:<Signin/>
  },
  {
    path:"/register",
    element:<Register/>
  },
  {
    path:"/login",
    element:<Signin/>
  },

  {
    path:"/mentorregister",
    element:<Mentorregister/>
  },
  {
    path:"/mentorlogin",
    element:<Mentorsignin/>
  },
  {
    path:"/adminlogin",
    element:<Adminsignin/>
  },
  {
    path:"/adminregister",
    element:<Adminregister/>
  },
  {
    path:'dashboard',
    element:<Dashboardnav/>,
    children:[
      {
        path: '', 
        element: <MyCourses />
      },
      {
        path:'mycourses',
        element:<MyCourses/>
      },
      {
        path:'uploadcourse',
        loader: userLoader,
        element:<UploadForm/>,
      },
      
    ]
  },
  {
    path:'uploadvideo/:id',
    element:<UploadVideo/>,

  },

  {
    path:'videopage/:id',
    element:<VideoPage/>,
    children:[
      {
        path:'video',
        element:<VideoPlayer/>
      }
    ]
  },
  {
    path:'/userdashboard',
    element:<Userdashboardnav/>,
    children:[
      {
        path:'',
        element:<Allcourses/>
      },
      {
        path:'allcourses',
        element:<Allcourses/>,
      },
      {
        path:'usermycourses',
        element:<UserMyCourses/>,
        loader: usercoursesLoader,
      },
      {
        path:'myrequests',
        element:<Myrequests/>
      }
    ]
  },
  {
    path:'viewcourse/:id',
    element:<ViewCourse/>,
    loader:currentuserLoader
  },
  {
    path:'quiz/:id',
    element:<Quiz/>
  },
  {
    path:'success/:payment_id',
    element:<Success/>
  },
  {
    path:'failure/:payment_id',
    element:<Failure/>
  },
  {
    path:'/quizupload/:id',
    element:<Quizupload/>
  },
{
  path:'admindashboard',
  element:<AdminDashboardnav/>,
 children:[
  {
    path:'',
    element:<MentorRequests/>
  },
  {
    path:'mentorrequests',
    element:<MentorRequests/>
  },
 ]
}
 
])


function App() {


  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
