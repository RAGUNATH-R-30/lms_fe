import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  useLoaderData,
  useNavigate,
  useParams,
} from "react-router-dom";
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
  const navigate = useNavigate();
  const user_id = user.data.user._id;

  const getCourse = async (id) => {
    const course_res = await courseServices.getCoursebyId({ course_id: id });
    setcourse(course_res.data.course);
    // console.log(course.data);
  };

  const enrollCourse = async (course_id, user_id, price) => {
    try {
      // const course_enroll = await courseServices.enrollCourse({
      //   course_id: course_id,
      //   user_id: user_id,
      // });
      // console.log(course_enroll);
      console.log(course_id, user_id, price);
      const {
        data: { order },
      } = await courseServices.coursePayment({
        price: price,
        course_id: course_id,
        user_id: user_id,
      });
      // console.log(course_enroll)
      console.log(order);

      const options = {
        key: "rzp_test_tnCdFa30rqjFdx", // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Payment razorpay",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1


        handler: function (response) {
          // console.log(response)
          courseServices
            .enrollCourse({ course_id, user_id })
            .then(() => {
              navigate(`/success/${response.razorpay_order_id}`);
              console.log("Course enrolled successfully.");
            })
            .catch((error) => {
              console.log("Error enrolling course:", error);
            });
        },
        callback_url: `http://localhost:3001/api/users/payment/verification`,
        prefill: {
          name: "Ragunath R",
          email: "ragunath3003@gmail.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);

      rzp1.open();
      // const course_enroll = await courseServices.enrollCourse({
      //   course_id: course_id,
      //   user_id: user_id,
      // });
      // console.log(course_enroll);
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
            <div className="row">
              <div
                className="text-start inline-block"
                style={{ display: "inline-block" }}
              >
                <h4>Course Details</h4>
              </div>
              <div
                className="text-end inline-block"
                style={{ display: "inline-block" }}
              >
                <h4>₹ {course.price}</h4>
              </div>
            </div>
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
                enrollCourse(id, user_id, course.price);
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
