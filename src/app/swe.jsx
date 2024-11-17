"use client";

import "./styles/time table.css";
import { MdPerson } from "react-icons/md";
import { useState, useEffect } from "react";
import getTeacherAvailability from "../../lib/getTeacherAvailability";
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

  return (
    <>
      <main>
        <h1 style={{ textAlign: "center" }}>
          {" "}
          Time table for Software Engineering Department{" "}
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
                <p className="course-title">
                  [101]
                  {fetchedData
                    .filter(
                      (teacher) =>
                        teacher.department === "SWE" &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday"
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
                        teacher.day === "Monday"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
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
                        teacher.day === "Tuesday"
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
                        teacher.day === "Tuesday"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
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
                        teacher.day === "Wednesday"
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
                        teacher.day === "Wednesday"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
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
                        teacher.day === "Thursday"
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
                        teacher.day === "Thursday"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
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
                        teacher.day === "Friday"
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
                        teacher.day === "Friday"
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
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
