"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { MdPerson } from "react-icons/md";
import { MdCases } from "react-icons/md";
import styles from "./page.module.css";
import getTeacherAvailability from "../../../../../../lib/getTeacherAvailability";
import { MdDownload } from "react-icons/md";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const semesters = ({ params }) => {
  const { departmentsID, semester, levelID } = React.use(params);
  //fetching the teacher availabilities
  const [availabilities, setAvailabilities] = React.useState([{}]);

  React.useEffect(() => {
    const getAvailabilities = async () => {
      try {
        const response = await getTeacherAvailability();
        if (response.error) {
          console.log(response.error);
        } else {
          setAvailabilities(response);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getAvailabilities();
  }, []);
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
    if (
      "level-one".includes(levelID) &&
      ["semester-three", "semester-four"].includes(semester)
    ) {
      router.push("/404");
    }
    if (
      "level-two".includes(levelID) &&
      ["semester-one", "semester-two"].includes(semester)
    ) {
      router.push("/404");
    }
  }, [semester, departmentsID]);

  //convert each semester from the dynamic route from words to number.
  const [number, setNumber] = React.useState(null);
  const convertSemester = (data) => {
    if (data === "semester-one") {
      setNumber(1);
    } else if (data === "semester-two") {
      setNumber(2);
    } else if (data === "semester-three") {
      setNumber(3);
    } else if (data === "semester-four") {
      setNumber(4);
    } else if (data === "degree-one") {
      setNumber("Degree 1");
    } else {
      setNumber("Degree 2");
    }
  };
  React.useState(() => {
    convertSemester(semester);
  }, [semester]);

  //convert each level to the suitable form as in the database
  const [level, setLevel] = React.useState(null);
  const convertLevel = (level) => {
    if (level === "level-one") {
      setLevel("Level One");
    } else if (level === "level-two") {
      setLevel("Level Two");
    } else {
      setLevel("Degree");
    }
  };
  React.useState(() => {
    convertLevel(levelID);
  }, [levelID]);

  //download the time table as PDF
  const downloadTable = async () => {
    const timetableElement = document.getElementById("time-table");

    if (!timetableElement) {
      alert("Timetable not found!");
      return;
    }

    try {
      // Use html2canvas to capture the timetable as an image
      const canvas = await html2canvas(timetableElement, {
        scale: 2, // Higher scale for better quality
        useCORS: true, // Allow cross-origin if external images are used
      });

      // Convert the canvas to an image
      const imgData = canvas.toDataURL("image/png");

      // Create a new PDF document
      const pdf = new jsPDF("landscape", "mm", "a4"); // Landscape mode for wide tables

      // Calculate width and height of the image for the PDF page
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      // Add the image to the PDF
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save(`timetable-${departmentsID}-${semester}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return (
    <>
      <button
        href="#time-table"
        download={`${departmentsID}-${semester} time-table`}
        className="bg-blue-500 px-3 py-1 mx-5 ml-24 mt-8 flex items-center gap-1 justify-center rounded text-white text-base"
        onClick={downloadTable}
      >
        Download
        <MdDownload size={20} />
      </button>
      <section className={styles.container}>
        <h1>
          {departmentsID.toUpperCase()} {splittedLevelValue[0].toUpperCase()}{" "}
          {splittedLevelValue[1].toUpperCase()}{" "}
          {splittedSemesterValue[0].toUpperCase()}{" "}
          {splittedSemesterValue[1].toUpperCase()} time table
        </h1>
        <table className={styles.table} id="time-table">
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
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>8:00 - 10:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>8:00 - 10:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>8:00 - 10:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>8:00 - 10:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "8:00 - 10:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>10:15 - 12:15</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>10:15 - 12:15</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>10:15 - 12:15</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>10:15 - 12:15</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>10:15 - 12:15</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "10:15 - 12:15" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>13:00 - 15:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Monday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>13:00 - 15:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Tuesday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>13:00 - 15:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Wednesday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>13:00 - 15:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Thursday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
                <p>13:00 - 15:00</p>
                <p>
                  <i> {departmentsID.toUpperCase()}</i>
                </p>
                <p className="flex items-center">
                  {" "}
                  <MdCases size={20} /> &nbsp; &nbsp;{" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.course}</span>
                    ))}
                </p>
                <p className="lecturer-info flex items-center">
                  <MdPerson size={30} />
                  (M){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
                    )
                    .map((teacher) => (
                      <span key={teacher.id}> {teacher.names}</span>
                    ))}{" "}
                </p>
                <p className="flex items-center">
                  <MdPerson size={30} />
                  (B){" "}
                  {availabilities
                    .filter(
                      (teacher) =>
                        teacher.department === departmentsID.toUpperCase() &&
                        teacher.time === "13:00 - 15:00" &&
                        teacher.day === "Friday" &&
                        teacher.level === level &&
                        teacher.semester === number
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
      </section>
    </>
  );
};

export default semesters;
