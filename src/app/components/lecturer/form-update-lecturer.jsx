"use client";

import { departmentDeg, departmentsL1L2 } from "../../scripts/departments";
import UpdateCourses from "../../../../lib/update_courses";
import days from "../../scripts/days";
import { time, degTime } from "../../scripts/time";
import "../../styles/availability-form.css";
import { useState, useContext, useEffect } from "react";
import { formContext } from "../../../global states/form-context";
import EditData from "../../../../lib/edit-lecturer-data";
import getTeacherAvailability from "../../../../lib/getTeacherAvailability";
import { toast } from "react-toastify";
import Loading from "../../../loading/loading";

const Form = ({ teacherInfo, updateConfirmation, setCheckTeacherInfo }) => {
  const { formData, setFormData } = useContext(formContext);
  const [semester, setSemester] = useState("select level to apply");
  const [coursesArray, setCoursesArray] = useState([]);
  const [error, setError] = useState({});
  const [departmentAbbr, setDepartmentAbbr] = useState(null);
  const [fetchedData, setFetchedData] = useState([]);
  const [isUpdating, setIsUpdating] = useState(false);
  //function to edit teacher record
  const EditTeacher = async (data) => {
    try {
      setIsUpdating(true);
      const res = await EditData(data);
      if (Object.keys(errorMsg).length === 0) {
        if (!res.ok) {
          const error = await res.json();
          toast.error(error.error);
          return;
        }
        toast.success("Lecturer has been updated successfully");
      }
    } catch (err) {
      toast.error("Internal server error, please try again later");
    } finally {
      setIsUpdating(false);
    }
    setCheckTeacherInfo(false);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getTeacherAvailability();
        if (response.error) {
          console.log(response.error);
        } else {
          setFetchedData(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
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
      setCoursesArray(handleCourses());
    }
  }, [formData.department, semester]);
  //getting form input and saving in state object.
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 9) : value,
    }));
  };
  // using useEffect to ensure that whenever I update the form, the departmentAbbreviation updates synchronously with it
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      departmentAbbreviation: departmentAbbr,
    }));
  }, [departmentAbbr]);

  //modifying the formData with the data coming from teacherInfo.
  useEffect(() => {
    if (teacherInfo) {
      setFormData((prevData) => ({
        id: teacherInfo.id,
        ...prevData,
        names: teacherInfo.names || prevData.names,
        email: teacherInfo.email || prevData.email,
        phone: teacherInfo.phone || prevData.phone,
        semester: teacherInfo.semester || prevData.semester,
        course: teacherInfo.course || prevData.course,
        level: teacherInfo.level || prevData.level,
        department: teacherInfo.department || prevData.department,
        day: teacherInfo.day || prevData.day,
        time: teacherInfo.time || prevData.time,
        departmentAbbreviation:
          departmentAbbr || prevData.departmentAbbreviation,
      }));
    }
  }, [teacherInfo]);
  if (isUpdating) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        {" "}
        <Loading message="updating lecturer" />{" "}
      </div>
    );
  }
  let errorMsg = {};
  const handleOnsubmit = (e) => {
    e.preventDefault();
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
      const updatedFormData = fetchedData.find(
        (teacher) =>
          teacher.email.toLowerCase().trim() ===
          formData.email.toLowerCase().trim()
      );
      const updateWithMatch = { ...updatedFormData, ...formData };
      EditTeacher(updateWithMatch);
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
  };
  return (
    <>
      <div className="form-container">
        <div className="logo">
          <h5> All information is required. </h5>
          <h1> Edit Teacher Information </h1>
        </div>
        <form onSubmit={handleOnsubmit}>
          <h5> Teacher's Information </h5>
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
          <h5>Course Information </h5>
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
              value={formData.course}
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
            <button type="submit" className="btn btn-primary">
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Form;
