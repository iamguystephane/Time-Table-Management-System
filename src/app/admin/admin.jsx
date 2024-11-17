"use client";

import NavBar from "./nav";
import style from "./styles/admin.module.css";
import { useState, useEffect } from "react";
import getStudentData from "../../../lib/getStudentData";
import Loading from "@/loading/loading";
import AdminPage from "./page";

const MainPage = () => {
  const [dropDown, setDropDown] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [errMsg, setErrMsg] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const retrieveData = async () => {
      setIsLoading(true);
      const result = await getStudentData();
      if (result.error) {
        setErrMsg(result.error);
      } else {
        setStudentData(result);
      }
      setIsLoading(false);
    };
    retrieveData();
  }, []);

  const filter = (searchData, arrayData) => {
    const result = searchData
      ? arrayData.filter(
          (data) =>
            data.Name.toLowerCase().includes(searchData.toLowerCase()) ||
            data.department.toLowerCase().includes(searchData.toLowerCase()) ||
            data.departmentAbbreviation
              .toLowerCase()
              .includes(searchData.toLowerCase())
        )
      : arrayData;

    return result;
  };
  const filteredData = filter(search, studentData);
  const handleRefresh = () => {
    window.location.reload();
  };
  return (
    <>
      <main className={style.main}>
        <nav className={style.nav}>
          <NavBar
            dropDown={dropDown}
            setDropDown={setDropDown}
            setSearch={setSearch}
            show="View students"
            hide="Hide students"
          />
        </nav>
        {!dropDown ? (
          <div className={style.displayStudents}>
            {isLoading ? (
              <div className={style.loading}>
                {" "}
                <Loading />{" "}
              </div>
            ) : errMsg.length > 0 ? (
              <div className={style.fetchError}>
                {errMsg}
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={handleRefresh}
                >
                  {" "}
                  refresh{" "}
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
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((data, index) => (
                    <tr key={index}>
                      <th scope="row">{data.id}</th>
                      <td>{data.Name}</td>
                      <td>{data.email}</td>
                      <td>{data.phone}</td>
                      <td>{data.departmentAbbreviation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              search && (
                <div className={style.fetchError}>
                  No search results found for {search}
                </div>
              )
            )}
          </div>
        ) : (
          <div className={style.noContent}>
            Click view students to see all students registered
          </div>
        )}
      </main>
    </>
  );
};

export default MainPage;
