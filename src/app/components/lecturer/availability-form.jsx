"use client";
import LecturerNav from "./lecturer-nav";
import Loading from "../../../loading/loading";
import { departmentDeg, departmentsL1L2 } from "../../scripts/departments";
import UpdateCourses from "../../../../lib/update_courses";
import days from "../../scripts/days";
import { time, degTime } from "../../scripts/time";
import Link from "next/link";
import "../../styles/form.css";
import { useState, useContext, useEffect } from "react";
import { formContext } from "../../../global states/form-context";
import sendData from "../../../../lib/sendData";
import getTeacherAvailability from "../../../../lib/getTeacherAvailability";
import EditData from "../../../../lib/edit-lecturer-data";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import errorMessages from "../../scripts/form-auth";
import { toast } from "react-toastify";

const Form = ({ setDisplayModal, data }) => {
  const { data: user } = useSession();
  const { formData, setFormData, setMatch } = useContext(formContext);
  const [semester, setSemester] = useState("select level to apply");
  const [coursesArray, setCoursesArray] = useState([]);
  const [error, setError] = useState({});
  const [fetchedData, setFetchedData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoad, setSubmitLoad] = useState(false);
  const [updateLoad, setUpdateLoad] = useState(false);
  const [departmentAbbr, setDepartmentAbbr] = useState(null);
  const router = useRouter();
  let updatedFormData = {};
  //function to add data to mongodb
  const transferData = async (dataToSend) => {
    try {
      setSubmitLoad(true);
      const res = await sendData(dataToSend);
      if (!res.ok) {
        const errorMsg = await res.json();
        toast.error(errorMsg.message);
        return;
      }
      const data = await res.json();
      toast.success(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err) {
      toast.error("Internal server error. Please try again later");
    } finally {
      setSubmitLoad(false);
    }
  };

  const updateTeacher = async () => {
    try {
      setUpdateLoad(true);
      const res = await EditData(updatedFormData);
      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error);
      }
    } catch (err) {
      toast.error("Internal server error. Please try again later");
    } finally {
      setUpdateLoad(false);
    }
  };
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const result = await getTeacherAvailability();
        if (result.error) {
          console.log(result.error);
        } else {
          setFetchedData(result);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAvailability();
  }, []);
  // function to set the semester based on the level.
  const handleSemester = (level) => {
    let newSemester;
    if (level === "Level One") {
      newSemester = 1;
    } else if (level === "Level Two") {
      newSemester = 3;
    } else if (level === "Degree") {
      newSemester = "Degree 1";
    } else {
      newSemester = "Please select a level";
    }
    setSemester(newSemester);
    setFormData((prevData) => ({ ...prevData, semester: newSemester }));
  };
  // function to display courses based on semester and department
  const handleCourses = () => {
    const courses = UpdateCourses(
      formData.department,
      semester,
      setDepartmentAbbr
    );
    return courses;
  };
  // updating semester based on level selected
  useEffect(() => {
    if (formData.level) {
      handleSemester(formData.level);
    }
  }, [formData.level]);
  // updating selectable courses based on the department and the semester.
  useEffect(() => {
    if (formData.department && semester) {
      setCoursesArray(handleCourses()); //setting courses only since this function returns an array of the courses and the department full name
    }
  }, [formData.department, semester]);
  //getting form input and saving in state object.
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      departmentAbbreviation: departmentAbbr,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 9) : value,
    }));
  };
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      names: user?.names || formData.names,
      phone: user?.phone || formData.phone,
      email: user?.email || formData.email,
    }));
  }, [user]);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    const errorMsg = {};
    errorMessages(formData, errorMsg);
    setError(errorMsg);
    console.log(fetchedData);
    if (Object.keys(errorMsg).length === 0) {
      // checking if a lecturer has already taken the course on a certain period and time and day.
      const match = fetchedData.find((teacher) => {
        return (
          teacher.department === formData.department &&
          teacher.day === formData.day &&
          teacher.time === formData.time &&
          teacher.level === formData.level
        );
      });
      console.log("matched: ", match);
      // checking if a particular course has already been selected for a specific department and semester.
      const courseMatch = fetchedData.find((teacher) => {
        return (
          teacher.department === formData.department &&
          teacher.level === formData.level &&
          teacher.course === formData.course
        );
      });
      if (match) {
        // if that period is found, then...
        if (match.course === formData.course) {
          // check if the course has already been selected
          updatedFormData = {
            ...match, // if it has been selected, update the formData so and add the lecturer as backup
            backupTeacherNames: formData.names,
            backupTeacherEmail: formData.email,
            backupTeacherPhone: formData.phone,
          };
          setFormData(updatedFormData);
          setDisplayModal(true); //display confirmation modal
          data({
            updateFunction: updateTeacher,
            updatedFormData, //setter that sets the update function and the entire form object that has been matched and updated.
          });
          setMatch(match);
        } else {
          errorMsg.error = "Sorry, this period has already been taken"; // display error message
        }
      } else if (courseMatch) {
        //if course has already been selected, block the ability of the user to take that course again!
        errorMsg.error = "This course has already been taken"; // set error message.
      } else {
        // if no match was found and if the course was not selected already, send the teacher's data to the database.
        transferData(formData);
        setFormData({
          names: "",
          email: "",
          phone: "",
          semester: "",
          course: "",
          level: "",
          department: "",
          day: "",
          time: "",
        });
      }
      console.log(match);
    }
  };

  useEffect(() => {
    setIsLoading(true);
  }, []);
  if (!isLoading)
    return (
      <div
        style={{ width: "100%", height: "100vh" }}
        className="flex items-center justify-center"
      >
        <Loading message="Getting data" />
      </div>
    );
  if (submitLoad) {
    return (
      <div
        style={{ width: "100%", height: "100vh" }}
        className="flex items-center justify-center"
      >
        <Loading message="Submitting data" />;
      </div>
    );
  }
  return (
    <>
      <LecturerNav />
      <div className="form-container">
        <div className="logo">
          <h5> All information is required. </h5>
        </div>
        <form onSubmit={handleOnsubmit}>
          <h5>
            <i> Personal Information </i>
          </h5>
          <div className="name form-group">
            <label>
              Full Names <span style={{ color: "red" }}> * </span>{" "}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="names"
              value={user?.names || formData.names}
            />
          </div>
          {error.names && <p style={{ color: "red" }}> {error.names} </p>}
          <div className="email form-group">
            <label>
              Email <span style={{ color: "red" }}> * </span>{" "}
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="email"
              value={user?.email || formData.email}
            />
          </div>
          {error.email && <p style={{ color: "red" }}> {error.email} </p>}
          <div className="phone form-group">
            <label>
              Phone <span style={{ color: "red" }}> * </span>{" "}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="phone"
              value={user?.phone || formData.phone}
            />
          </div>
          {error.phone && <p style={{ color: "red" }}> {error.phone} </p>}
          <br />
          <hr />
          <h5>
            <i>Course Information </i>
          </h5>
          <div className="level form-group">
            <label>
              {" "}
              Select Level <span style={{ color: "red" }}> * </span>{" "}
            </label>
            <select
              className="form-control form-control"
              onChange={handleOnChange}
              name="level"
              value={formData.level}
              autoComplete="off"
            >
              <option> Select level </option>
              <option> Level One </option>
              <option> Level Two </option>
              <option> Degree </option>
            </select>
          </div>
          {error.level && <p style={{ color: "red" }}> {error.level} </p>}
          <div className="semester form-group">
            <label> Semester </label>
            <input
              value={semester}
              className="form-control form-control"
              onChange={handleOnChange}
              name="semester"
            />
          </div>
          {error.semester && <p style={{ color: "red" }}> {error.semester} </p>}
          <div className="department-name form-group">
            <label>
              Select department <span style={{ color: "red" }}> * </span>
            </label>
            <select
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="department"
              value={formData.department}
            >
              {semester === 1 || semester === 3
                ? departmentsL1L2.map((dep, index) => {
                    return <option key={index}>{dep}</option>;
                  })
                : departmentDeg.map((dep, index) => {
                    return <option key={index}> {dep} </option>;
                  })}
            </select>
          </div>
          {error.department && (
            <p style={{ color: "red" }}> {error.department} </p>
          )}
          <div className="courses form-group">
            <label>
              Select Course <span style={{ color: "red" }}> * </span>
            </label>
            <select
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="course"
              // value={formData.course}
            >
              {coursesArray.map((cours, index) => {
                return <option key={index}>{cours}</option>;
              })}
            </select>
          </div>
          {error.course && <p style={{ color: "red" }}> {error.course} </p>}
          <div className="courses form-group">
            <label>
              Select Available Day <span style={{ color: "red" }}> * </span>
            </label>
            <select
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="day"
              value={formData.day}
            >
              {days.map((day, index) => {
                return <option key={index}>{day}</option>;
              })}
            </select>
          </div>
          {error.day && <p style={{ color: "red" }}> {error.day} </p>}
          <div className="courses form-group">
            <label>
              Select Available Time <span style={{ color: "red" }}> * </span>
            </label>
            <select
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="time"
              value={formData.time}
            >
              {semester === 1 || semester === 3
                ? time.map((time, index) => {
                    return <option key={index}>{time}</option>;
                  })
                : degTime.map((time, index) => {
                    return <option key={index}>{time}</option>;
                  })}
            </select>
          </div>
          {error.time && <p style={{ color: "red" }}> {error.time} </p>}
          <div className="btns">
            <button type="submit" className="btn btn-success">
              Submit
            </button>
            <Link href="/lecturer" passHref>
              <button type="button" className="btn btn-danger">
                Go back
              </button>
            </Link>
          </div>

          {error.error && <p style={{ color: "red" }}> {error.error} </p>}
        </form>
      </div>
    </>
  );
};

export default Form;
