import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import BecomeMentormodel from "../components/BecomeMentormodel";

function Userdashboardnav() {
  const [modalstate, setshowmodal] = useState(false);
  // console.log(modalstate);
  let modalclose = (bool) => {
    setshowmodal(bool);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            LMS
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  aria-current="page"
                  to={"allcourses"}
                >
                  AllCourses
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"usermycourses"}>
                  MyCourses
                </Link>
              </li>
            </ul>


            {/* <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li> */}
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={() => {
                
                setshowmodal(true);
              }}
            >
              Become Mentor
            </button>
          </div>
        </div>
        {modalstate && <BecomeMentormodel modalclose={modalclose} />}
      </nav>

      <Outlet />
    </>
  );
}

export default Userdashboardnav;
