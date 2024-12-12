"use client";

import "../../../styles/time table.css";
import { MdPerson } from "react-icons/md";
import { useState, useEffect } from "react";
import getTeacherAvailability from "../../../../../lib/getTeacherAvailability";
import { arr, handleTableLogic } from "@/app/scripts/timetable-logic";
const SWE = () => {
  const [fetchedData, setFetchedData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getTeacherAvailability();
        !result.error ? setFetchedData(result) : console.log(result.error);
      } catch (err) {
        console.log("Error fetching data");
      }
    };
    fetchData();
  }, []);

 // Fetching the array data for dynamic rendering.
  useEffect(() => {
    const getData = async () => {
      await handleTableLogic();
      console.log(arr);
    };
    getData();
  }, []);
  return (
    <>
      <main>
        <h1 style={{ textAlign: "center" }}>
          {" "}
          Time table for Software Engineering Level One{" "}
        </h1>
        <table>
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
                8:00 - 10:00
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                8:00 - 10:00
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                8:00 - 10:00
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                8:00 - 10:00
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                8:00 - 10:00
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p>
                  <MdPerson size={30} />
                  (B):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                10:15 - 12:15
                <p className="course-title">
                  [101]
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                10:15 - 12:15
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                10:15 - 12:15
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                10:15 - 12:15
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                10:15 - 12:15
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
            </tr>
            <tr>
              <td>
                13:00 - 15:00
                <p className="course-title">
                  [101]
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                13:00 - 15:00
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                13:00 - 15:00
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                13:00 - 15:00
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
              <td>
                13:00 - 15:00
                <p className="course-title">
                  [101]{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p>
                  <i> ACY, BF, MGT, MKT, INS, LTM, PM, CNSM, SWE, EDU, HRM </i>
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (M):
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}
                </p>
                <p className="lecturer-info">
                  <MdPerson size={30} />
                  (B):{" "}
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === "Level One"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}>
                        {" "}
                        {teacher.backupTeacherNames}
                      </span>
                    ))}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
};

export default SWE;
