"use client";
import { departmentDeg, departmentsL1L2 } from "../scripts/departments";
import UpdateCourses from "../../../lib/update_courses";
import days from "../scripts/days";
import { time, degTime } from "../scripts/time";
import Link from "next/link";
import "../styles/form.css";
import { useState, useContext, useEffect } from "react";
import { formContext } from "../../global states/form-context";
import sendData from "../../../lib/sendData";
import getTeacherAvailability from "../../../lib/getTeacherAvailability";
import EditData from "../../../lib/edit-lecturer-data";
import { useRouter } from "next/navigation";

const Form = ({ setDisplayModal, data }) => {
  const { formData, setFormData } = useContext(formContext);
  const [semester, setSemester] = useState("select level to apply");
  const [coursesArray, setCoursesArray] = useState([]);
  const [error, setError] = useState({});
  const [fetchedData, setFetchedData] = useState([]);
  const [departmentAbbr, setDepartmentAbbr] = useState(null);
  const router = useRouter();
  let updatedFormData = {};
  //function to add data to json server
  const transferData = async () => {
    try {
      await sendData(formData);
    } catch (err) {
      alert("error sending data to the database");
    }
  };
  const updateTeacher = async () => {
    try {
      await EditData(updatedFormData);
    } catch (err) {
      console.log(error);
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
  const handleOnsubmit = (e) => {
    e.preventDefault();
    const errorMsg = {};
    console.log(formData);
    console.log(error);
    if (!formData.names.trim()) {
      errorMsg.names = "Name is required";
    }
    if (!formData.course.trim()) {
      errorMsg.course = "Course required";
    } else if (formData.course.trim() === "Select course") {
      errorMsg.course = "Please choose a course";
    } else if (formData.course.trim() === "Please select a level") {
      errorMsg.course = "Please choose a course";
    } else if (
      formData.course.trim() === "Department doesn't exist for degree."
    ) {
      errorMsg.course =
        "The departmen of Hardware Maintenance is not available for degree. Did you mean CNSM?";
    }
    if (!formData.email.trim()) {
      errorMsg.email = "Course required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errorMsg.email = "Invalid email";
    }
    if (!formData.level.trim()) {
      errorMsg.level = "Level required";
    } else if (formData.level.trim() === "Select level") {
      errorMsg.level = "Please select a level";
    }
    if (!formData.time.trim()) {
      errorMsg.time = "Time required";
    } else if (formData.time.trim() === "Select time") {
      errorMsg.time = "Please select available time";
    }
    if (!formData.department.trim()) {
      errorMsg.department = "Department required";
    } else if (formData.department.trim() === "Choose Department") {
      errorMsg.department = "Please select a department";
    }
    if (!formData.day.trim()) {
      errorMsg.day = "Day is required";
    } else if (formData.day.trim() === "Choose day") {
      errorMsg.day = "Please select available day";
    }
    if (formData.semester === "Please select a level") {
      errorMsg.semester = "Select a level to fill this field";
    } else if (!formData.semester === "select level to apply") {
      errorMsg.semester = "Select a level to automatically get the semester";
    }
    if (!formData.phone.trim()) {
      errorMsg.phone = "Phone is required";
    } else if (formData.phone.trim().length < 9) {
      errorMsg.phone = "Phone number must be 9 digits";
    } else if (formData.phone.trim().slice(0, 1) != 6) {
      errorMsg.phone = "Phone number must begin with 6";
    }
    setError(errorMsg);
    if (Object.keys(errorMsg).length === 0) {
      console.log(fetchedData);
      //checking if a lecturer has already taken the course on a certain period and time and day.
      const match = fetchedData.find((teacher) => {
        return (
          teacher.department === formData.department &&
          teacher.day === formData.day &&
          teacher.time === formData.time &&
          teacher.level === formData.level &&
          teacher.names != formData.names
        );
      });
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
        } else {
          errorMsg.error = "Sorry, this period has already been taken"; // display error message
        }
      } else if (courseMatch) {
        //if course has already been selected, block the ability of the user to take that course again!
        errorMsg.error = "This course has already been selected"; // set error message.
      } else {
        // if no match was found and if the course was not selected already, send the teacher's data to the database.
        transferData();
        alert("Data has been submitted");
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
        setTimeout(() => {
          router.push("/"); // route to a specific location after the data has been transfered after 2s.
        }, 2000);
      }
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="logo">
          <h5> All information is required. </h5>
          {/* <img src={CITECIMG} width="350px" height="350px" /> */}
        </div>
        <form onSubmit={handleOnsubmit}>
          <h5>
            <i> Personal Information </i>
          </h5>
          <div className="name form-group">
            <label>
              {" "}
              Full Names <span style={{ color: "red" }}> * </span>{" "}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="names"
              value={formData.names}
            />
          </div>
          {error.names && <p style={{ color: "red" }}> {error.names} </p>}
          <div className="email form-group">
            <label>
              {" "}
              Email <span style={{ color: "red" }}> * </span>{" "}
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="email"
              value={formData.email}
            />
          </div>
          {error.email && <p style={{ color: "red" }}> {error.email} </p>}
          <div className="phone form-group">
            <label>
              {" "}
              Phone <span style={{ color: "red" }}> * </span>{" "}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="phone"
              value={formData.phone}
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
            <button type="button" className="btn btn-danger">
              <Link href="/" style={{ textDecoration: "none", color: "white" }}>
                Go back{" "}
              </Link>
            </button>
          </div>
          {error.error && <p style={{ color: "red" }}> {error.error} </p>}
        </form>
      </div>
    </>
  );
};

export default Form;
