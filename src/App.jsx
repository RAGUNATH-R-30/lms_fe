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
      },
    ]
  },
  {
    path:'viewcourse/:id',
    element:<ViewCourse/>
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
