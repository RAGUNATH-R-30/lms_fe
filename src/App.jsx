import { useState } from 'react'
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




const router = createBrowserRouter([
  {
    path:"/",
    element:<div>Root</div>
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


 
])


function App() {
  
  return (
    <>
    <RouterProvider router={router}/>
    </>
  )
}

export default App
