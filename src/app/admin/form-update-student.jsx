"use client";

import { combinedDepartments } from "../scripts/departments";
import "./manage-teachers/styles/form.css";
import { useState, useEffect } from "react";
import EditStudent from "../../../lib/edit-student-data";
import departmentAbbrFunc from "../../../lib/check-department";

const StudentForm = ({
  teacherInfo,
  updateConfirmation,
  setCheckTeacherInfo,
}) => {
  const [formData, setFormData] = useState({
    Name: "",
    department: "",
    level: "",
    phone: "",
    email: "",
    departmentAbbreviation: "",
  });
  const [error, setError] = useState({});
  //function to edit teacher record
  const EditStudentData = async () => {
    try {
      await EditStudent(formData);
      console.log("successfully updated ");
      updateConfirmation(true);
    } catch (err) {
      console.log("error submitting the data " + err);
    }
    setCheckTeacherInfo(false);
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  };
  //getting form input and saving in state object.
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      id: teacherInfo.id,
      [name]: name === "phone" ? value.replace(/\D/g, "").slice(0, 9) : value,
    }));
  };
  useEffect(() => {
    const departmentAbbreviation = departmentAbbrFunc(formData.department);
    setFormData((prevData) => ({
      ...prevData,
      departmentAbbreviation,
    }));
  }, [formData.department]);
  //modifying the formData with the data coming from teacherInfo.
  useEffect(() => {
    if (teacherInfo) {
      const departmentAbbreviation = departmentAbbrFunc(
        teacherInfo.department || ""
      );
      setFormData((prevData) => ({
        id: teacherInfo.id,
        ...prevData,
        Name: teacherInfo.Name || prevData.Name,
        email: teacherInfo.email || prevData.email,
        phone: teacherInfo.phone || prevData.phone,
        level: teacherInfo.level || prevData.level,
        department: teacherInfo.department || prevData.department,
        departmentAbbreviation: departmentAbbreviation || "",
      }));
    }
  }, [teacherInfo]);

  const handleOnsubmit = (e) => {
    e.preventDefault();
    const errorMsg = {};
    console.log(error);
    if (!formData.Name.trim()) {
      errorMsg.names = "Name is required";
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
    if (!formData.department.trim()) {
      errorMsg.department = "Department required";
    } else if (formData.department.trim() === "Choose Department") {
      errorMsg.department = "Please select a department";
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
      EditStudentData();
      console.log(formData);
      setFormData({
        Name: "",
        email: "",
        phone: "",
        semester: "",
        level: "",
        department: "",
      });
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="logo">
          <h5> All student is required. </h5>
          <h1> Edit student Information </h1>
        </div>
        <form onSubmit={handleOnsubmit} className="form">
          <h5> Student personal information </h5>
          <div className="name form-group">
            <label>
              {" "}
              Full Names <span style={{ color: "red" }}> * </span>{" "}
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              onChange={handleOnChange}
              name="Name"
              value={formData.Name}
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
          <h5>School Information </h5>
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
              {combinedDepartments.map((dep, index) => {
                return <option key={index}> {dep} </option>;
              })}
            </select>
          </div>
          {error.department && (
            <p style={{ color: "red" }}> {error.department} </p>
          )}
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

export default StudentForm;
