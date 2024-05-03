import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLoaderData, useParams } from "react-router-dom";
import courseServices from "../services/courseServices";
import userServices from "../services/userServices";

export async function loader() {
  // get the currently logged in user
  const user = await userServices.getCurrentuser();
  console.log(user);
  // return the user data
  return { user };
}

function ViewCourse() {
  const { id } = useParams();
  const [course, setcourse] = useState([]);
  console.log(course);
  const { user } = useLoaderData();
  const user_id = user.data.user._id;

  const getCourse = async (id) => {
    const course_res = await courseServices.getCoursebyId({ course_id: id });
    setcourse(course_res.data.course);
    console.log(course.data);
  };

  const enrollCourse = async (course_id, user_id) => {
    try {
      const course_enroll = await courseServices.enrollCourse({
        course_id: course_id,
        user_id: user_id,
      });
      console.log(course_enroll);
    } catch (error) {
      console.log(error);
    }
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
            <h4 className="card-title">Sections</h4>
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
        <div className="row mt-4">
          <div className="text-center">
            <button
              type="button"
              className="btn btn-dark"
              style={{ width: 200, fontSize: 20 }}
              onClick={() => {
                enrollCourse(id, user_id);
              }}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ViewCourse;
