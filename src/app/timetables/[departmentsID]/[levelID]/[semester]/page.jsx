"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { MdPerson } from "react-icons/md";
import { MdCases } from "react-icons/md";
import styles from "./page.module.css";
import { arr, handleTableLogic } from "@/app/scripts/timetable-logic";

const semesters = ({ params }) => {
  const { departmentsID, semester, levelID } = React.use(params);

  //rerouting to the 404 page if the semester entered on the URL is not found.
  const router = useRouter();
  if (
    ![
      "semester-one",
      "semester-two",
      "semester-three",
      "semester-four",
      "degree-one",
      "degree-two",
    ].includes(semester)
  ) {
    React.useEffect(() => {
      router.push("/404");
    }, [semester]);
  }

  //splitting the semester and department routes to remove the hyphen from them
  const splitData = (semester) => {
    const splitvalue = semester.split("-");
    return splitvalue;
  };
  //calling the splitData function for both level and department
  let splittedSemesterValue = splitData(semester);
  let splittedLevelValue =
    levelID != "degree" ? splitData(levelID) : ["degree", ""];

  //renforcing routes
  React.useEffect(() => {
    if (
      "level".includes(splittedLevelValue[0]) &&
      "degree".includes(splittedSemesterValue[0])
    ) {
      router.push("/404");
    }
    if (
      "degree".includes(splittedLevelValue[0]) &&
      "semester".includes(splittedSemesterValue[0])
    ) {
      router.push("/404");
    }
  }, [semester, departmentsID]);

  //fetching lecturers availability with useEffect using the tableLogic function, which keeps the data in the arr variable being destructured alongside the tableLogic function on line 7
  React.useEffect(() => {
    const fetchAvailability = async () => {
      try {
        await handleTableLogic();
      } catch (err) {
        console.log(err);
      }
    };
    fetchAvailability();
  }, []);
  return (
    <>
      <div className={styles.container}>
        <h1>
          {departmentsID.toUpperCase()} {splittedLevelValue[0].toUpperCase()}{" "}
          {splittedLevelValue[1].toUpperCase()}{" "}
          {splittedSemesterValue[0].toUpperCase()}{" "}
          {splittedSemesterValue[1].toUpperCase()} time table
        </h1>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Monday</th>
              <th>Tuesday</th>
              <th>Wednesday</th>
              <th>Thursday</th>
              <th>Friday</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {arr
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {arr
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                  {arr
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.backupTeacher}</span>
                    ))}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
              <td>
                <p>8:00 - 10:00</p>
                <p>
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                </p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default semesters;
