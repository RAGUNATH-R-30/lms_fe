import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import courseServices from "../services/courseServices";

import { useSelector } from "react-redux";
import userServices from "../services/userServices";

function SideBar({ setActivecontent }) {
  const { id } = useParams();
  const [course, setcourse] = useState([]);
  const [sections, setsections] = useState([]);
  const [sectionprogress, setsectionprogress] = useState([]);

  let user_id = "";
  const data = useSelector((state) => state.app);

  const getcourse = async (id) => {
    try {
      // const course = await courseServices.getCoursebyId({course_id:id})
      console.log("GetV");
      courseServices
        .getCoursebyId({ course_id: id })
        .then((response) => {
          console.log("asdasdasdsadsada");
          const course = response.data.course;
          console.log(course);
          setcourse(course);
          setsections(course.sections);
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getprogress = async (course_id) => {
    const user = await userServices.getCurrentuser();
    user_id = user.data.user._id;
    const userProgress = await courseServices.getUserprogress({
      user_id: user_id,
      course_id: course_id,
    });
    const section1progress =
      userProgress.data.userprogress.section_1_progress.reduce(
        (acc, curr) => acc + curr,
        0
      );
    const section2progress =
      userProgress.data.userprogress.section_2_progress.reduce(
        (acc, curr) => acc + curr,
        0
      );
    const section3progress =
      userProgress.data.userprogress.section_3_progress.reduce(
        (acc, curr) => acc + curr,
        0
      );

    setsectionprogress([section1progress, section2progress, section3progress]);

    console.log(userProgress);
    console.log(user);
    // user_id = user
  };
  useEffect(() => {
    getcourse(id);
    getprogress(id);
  }, []);
  console.log(course);
  console.log(sections);
  return (
    <>
      <h3>Table Of Contents</h3>
      <div className="accordion accordion-flush" id="accordionFlushExample">
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
                  <h6>{`${sectionprogress[index]}%`}</h6>
                </button>
              </h2>

              <div
                id={`flush-collapse${index}`}
                className="accordion-collapse collapse"
                data-bs-parent="#accordionFlushExample"
              >
                {item.sectionContent.map((item, index) => {
                  return (
                    <div
                      className="accordion-body"
                      key={index}
                      onClick={() => {
                        setActivecontent(item);
                      }}
                    >
                      <div
                        className="content-wrapper"
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <div>{item.content}</div>
                        <button type="button" className="btn btn-primary">
                          Take Quiz
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default SideBar;

// {
//   item.content;
// }
// <button
//   type="submit"
//   className="btn btn-primary"
//   style={{ position: "absolute", top: 0, right: 0 }}
// >
//   Upload Videos
// </button>;
