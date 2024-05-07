import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import courseServices from '../services/courseServices';
import { setcourse } from '../../reducers/courseSlice';
import Quizmodal from './Quizmodal';
import { ToastManager, showToast } from './ToastManager';

function Quizupload() {
    const data = useSelector((state) => state.app);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setloading] = useState(true);
    const [modalstate, setshowmodal] = useState(false);
    const [contentid,setcontentid] = useState("")
    // console.log(data)
    const course = data?.course;
    const { id } = useParams();
    const nextpage = ()=>{
        showToast("Course Created Successfully!")
        setTimeout(() => {
      navigate('/dashboard')
            
        },800);
    }

    let modalclose = (bool) => {
        setshowmodal(bool);
      };
    const handleClick = async () => {
      
    };
  
    useEffect(() => {
      console.log("effect");
      const fetchData = async () => {
        console.log("fetchdata");
        console.log(data.course);
        if (Object.keys(data.course).length == 0) {
          console.log("course");
          try {
            // Fetch course data or perform any async operation
            // console.log("effect")
            setloading(true);
            const response = await courseServices.getCoursebyId({
              course_id: id,
            });
            const currentCourse = response.data.course;
            dispatch(setcourse(currentCourse));
            // console.log(currentCourse);
            setloading(false);
            // Update state or do something with the data
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        } else {
          setloading(false);
        }
      };
  
      fetchData();
    }, [data.course, id]);
    return (
      <>
    <ToastManager></ToastManager>

        {loading ? (
          <div>Loading</div>
        ) : (
          <div className="container">
            {/* Course Details */}
            <div className="card mt-5 mb-4">
              <h5 className="card-header">Course Details</h5>
              <div className="card-body">
                {<h5>{`Author: ${course?.author_name}`}</h5>}
                {<h5>{`Course: ${course?.name}`}</h5>}
                {<h5>{`Description: ${course?.description}`}</h5>}
              </div>
            </div>
  
            {/* Beginner module */}
            <div className="card mt-5 mb-4">
              <h5 className="card-header">Beginner module</h5>
              <div className="card-body">
                {course?.sections[0]?.sectionContent.map((item, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="row">
                        <div className="col-lg-7">
                          <div className="card-body">
                            {/* {item.id} */}
                            {/* {item.content} */}
                            <h5>{`${index + 1}. ${item.content}`}</h5>
                          </div>
                        </div>
  
                        
                        <div className="col-lg-5">
                          <div className="card-body">
                            <button
                              type="submit"
                              className="btn btn-primary"
                              onClick={() => {
                                setshowmodal(true)
                                setcontentid(item.id)
                            }}

                              >
                                Create Quiz
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
  
            {/* Intermediate Module */}
  
            <div className="card mb-4">
              <h5 className="card-header">Intermediate Module</h5>
              <div className="card-body">
                {course?.sections[1]?.sectionContent.map((item, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="row">
                        <div className="col-lg-7">
                          <div className="card-body">
                            {/* {item.id} */}
                            <h5>{`${index + 1}. ${item.content}`}</h5>
                          </div>
                        </div>
  
  
                        <div className="col-lg-2">
                          <div className="card-body">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                setshowmodal(true)
                                setcontentid(item.id)
                            }}

                            >
                                Create Quiz
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
  
            {/* advanced module */}
  
            <div className="card">
              <h5 className="card-header">Advanced module </h5>
              <div className="card-body">
                {course?.sections[2]?.sectionContent.map((item, index) => {
                  return (
                    <div className="card" key={index}>
                      <div className="row">
                        <div className="col-lg-7">
                          <div className="card-body">
                            {/* {item.id} */}
                            <h5>{`${index + 1}. ${item.content}`}</h5>
                          </div>
                        </div>
  
  
                        <div className="col-lg-2">
                          <div className="card-body">
                            <button
                              type="button"
                              className="btn btn-primary"
                              onClick={() => {
                                setshowmodal(true)
                                setcontentid(item.id)
                              }}
                            >
                              Create Quiz
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      {modalstate && <Quizmodal modalclose={modalclose} contentid={contentid} />}
        <div className="row mt-4">
          <div className="text-center">
            <button type="button" className="btn btn-primary mb-4" onClick={()=>{nextpage()}}>
              Submit
            </button>
          </div>
        </div>
      </>
    );
  
}

export default Quizupload