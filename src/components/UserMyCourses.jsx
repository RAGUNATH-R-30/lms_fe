import React, { useEffect, useState } from 'react'
import userServices from '../services/userServices';
import { Link, useLoaderData } from 'react-router-dom';
import courseServices from '../services/courseServices';

export async function loader() {
  // get the currently logged in user
  const user = await userServices.getCurrentuser();
  // console.log(user);
  // return the user data
  return { user };
}
function UserMyCourses() {
  const { user } = useLoaderData();
  const user_id = user.data.user._id;
  const [userCourses,setuserCourses] = useState([])
  const getUsercourses = async(user_id)=>{
    try {
      const userCourses = await courseServices.getUsercourses({user_id:user_id})
      // console.log(userCourses)
      setuserCourses(userCourses.data.usercourses)
    } catch (error) {
      console.log(error);
      
    }
  }
  useEffect(()=>{
    getUsercourses(user_id)
  },[])
  return (
    <>
    <div className="container mt-4">


        {userCourses.length == 0?(<div className='text-center'style={{fontSize:20}}>No Course Available.</div>):(<div className="row">
          {userCourses?.map((item, index) => {
            return (
              <div className="col-lg-4" key={index}>
                <div className="card mb-4" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      {item.author_name}
                    </h6>
                    <p className="card-text">
                      {item.description}
                    </p>
                    <Link to={`/videopage/${item._id}`} type="button" className="btn btn-outline-dark">View Course</Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>)}
      </div>
    </>
  )
}

export default UserMyCourses