"use client";

import NavBar from "../../admin/nav";
import style from "../styles/admin.module.css";
import { useState, useEffect } from "react";
import getTeacherAvailability from "../../../../lib/getTeacherAvailability";
import Loading from "@/loading/loading";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import TimeTables from "@/app/timetables/page";

const Teachers = ({
  setTeacherInfo,
  checkTeacherClick,
  checkDeleteTeacher,
  setRecordToDelete,
}) => {
  const [dropDown, setDropDown] = useState(false);
  const [teacherAvailability, setTeacherAvailability] = useState([]);
  const [errMsg, setErrMsg] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const retrieveData = async () => {
      setIsLoading(true);
      const result = await getTeacherAvailability();
      if (result.error) {
        setErrMsg(result.error);
      } else {
        setTeacherAvailability(result);
      }
      setIsLoading(false);
    };
    retrieveData();
  }, []);

  // function to edit teacher record
  const handleEditTeacher = (teacherIndex) => {
    const teacher = teacherAvailability.find(teacher => teacher.id === teacherIndex);
    setTeacherInfo(teacher);
    checkTeacherClick(true);
  };

  // function to filter teachers by department and name
  const filter = (searchData, arrayData) => {
    const result = searchData
      ? arrayData.filter(
          (data) =>
            data.names?.toLowerCase().includes(searchData.toLowerCase()) ||
            data.department?.toLowerCase().includes(searchData.toLowerCase()) ||
            data.departmentAbbreviation
              ?.toLowerCase()
              .includes(searchData.toLowerCase())
        )
      : arrayData;

    return result;
  };
  const filteredData = filter(search, teacherAvailability);
  const handleRefresh = () => {
    window.location.reload();
  };
  // function to delete a teacher
  const confirmDelete = (teacherIndex) => {
    const teacher = teacherAvailability.find(teacher => teacher.id === teacherIndex);
    checkDeleteTeacher(true);
    setRecordToDelete(teacher);
    console.log(teacher);
  };
  return (
    <>
      <main className={style.main}>
        <nav className={style.nav}>
          <NavBar
            dropDown={dropDown}
            setDropDown={setDropDown}
            setSearch={setSearch}
            show="Show teachers"
            hide="Hide teachers"
          />
        </nav>

        {!dropDown ? (
          <div className={style.displayStudents}>
            {isLoading ? (
              <div className={style.loading}>
                <Loading />
              </div>
            ) : errMsg.length > 0 ? (
              <div className={style.fetchError}>
                {errMsg}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleRefresh}
                >
                  Refresh
                </button>
              </div>
            ) : filteredData.length > 0 ? (
              <table className={`table table-hover table-dark ${style.table}`}>
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Full Names</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">Department</th>
                    <th scope="col">Course</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{data.id}</th>
                      <td>{data.names}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.departmentAbbreviation}</td>
                      <td>{data.course}</td>
                      <td style={{ gap: "25px" }}>
                        <FaEdit
                          size={28}
                          className={style.pencilIcon}
                          onClick={() => handleEditTeacher(data.id)}
                        />
                        &nbsp; &nbsp; &nbsp; &nbsp;
                        <FaTrash
                          size={28}
                          className={style.trashIcon}
                          onClick={() => confirmDelete(data.id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : search ? (
              <div className={style.fetchError}>
                No search results found for {search}
              </div>
            ) : (
              <div className={style.noContent}>No teacher is registered</div>
            )}
          </div>
        ) : (
          <div className={style.noContent}>
            <TimeTables />
          </div>
        )}
      </main>
    </>
  );
};

export default Teachers;
