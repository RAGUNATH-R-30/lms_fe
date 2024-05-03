import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import courseServices from "../services/courseServices";

import { useSelector } from "react-redux";

function SideBar({setActivecontent}) {
  const { id } = useParams();
  const [course,setcourse] = useState([])
  const [sections,setsections] = useState([])
  const data = useSelector((state)=>state.app)

  const getcourse = async (id) => {
    try {
      // const course = await courseServices.getCoursebyId({course_id:id})
      console.log("GetV")
      courseServices
        .getCoursebyId({ course_id: id })
        .then((response) => {
          console.log("asdasdasdsadsada")
          const course = response.data.course
          console.log(course)
          setcourse(course)
          setsections(course.sections)
        })
        .catch((error) => {
          
          console.log(error.response.data.message);
        });
    } catch (error) {
console.log(error)
    }
  };
  useEffect(() => {
    getcourse(id);
  }, []);
  console.log(course)
  console.log(sections)
  return (
    <>
      <h3>Table Of Contents</h3>
      <div className="accordion accordion-flush" id="accordionFlushExample">
        {
              course?.sections?.map((item,index)=>{
            return <div className="accordion-item" key={index}>
            <h2 className="accordion-header">
              <button
                className="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target={`#flush-collapse${index}`}
                aria-expanded="false"
                aria-controls={`flush-collapse${index}`}
              >
                {item.sectionName}
              </button>
            </h2>
  
            <div
              id={`flush-collapse${index}`}
              className="accordion-collapse collapse"
              data-bs-parent="#accordionFlushExample"
            >
              {
                item.sectionContent.map((item,index)=>{
                  return <div className="accordion-body" key={index} onClick={()=>{setActivecontent(item)}}>
                  {item.content}
                </div>
                })
                
              }
              
            </div>
          </div>
          })
        }

      </div>
    </>
  );
}

export default SideBar;
