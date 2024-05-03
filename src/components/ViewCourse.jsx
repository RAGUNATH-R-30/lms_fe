import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import courseServices from "../services/courseServices";

function ViewCourse() {
  const { id } = useParams();
  const [course, setcourse] = useState([]);
  console.log(course);
  const getCourse = async (id) => {
    const course_res = await courseServices.getCoursebyId({ course_id: id });
    setcourse(course_res.data.course);
    console.log(course.data);
  };
  useEffect(() => {
    getCourse(id);
  }, []);
  return (
    <>
      <div className="container">
        <div className="card mt-3">
          <div className="card-header">
            <h4>Course Details</h4>
          </div>
          <div className="card-body">
            <h4 className="card-title">{course.name}</h4>
            <p className="card-text" style={{ fontSize: 18 }}>
              <b>Description:</b>

              <br />
              {course.description}
            </p>
          </div>
        </div>

        <div className="card mt-4">
          <div className="card-body">
            <div
              className="accordion accordion-flush"
              id="accordionFlushExample"
            >
              {course?.sections?.map((item, index) => {
                return (
                  <div className="accordion-item" key={index}>
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
                      {item.sectionContent.map((item, index) => {
                        return (
                          <div className="accordion-body" key={index}>
                            {item.content}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCourse;
