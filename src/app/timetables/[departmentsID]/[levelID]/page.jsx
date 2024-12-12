"use client";

import style from "../../styles/page.module.css";
import Link from "next/link";
import { useRouter } from 'next/navigation'
import * as React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const TimeTables = ({ params }) => {
  const { levelID, departmentsID } = React.use(params);
  const [semester, setSemester] = React.useState([]);
  const router = useRouter();
  //handling the display of various semesters since I'm dealing with dynamic routes.
  React.useEffect(() => {
    if (levelID === "level-one") {
      setSemester(["semester-one", "semester-two"]);
    } else if (levelID === "level-two") {
      setSemester(["semester-three", "semester-four"]);
    } else if (levelID === "degree") {
      setSemester(["degree-one", "degree-two"]);
    } else {
      setSemester(["Invalid semester", "Invalid semester"]);
    }
  }, [levelID]);

  if(!["level-one", "level-two", "degree"].includes(levelID)) {
    React.useEffect(() => {
      router.push("/404");
    }, [levelID]);
  }
  return (
    <>
      <main className={style.main}>
        <Link
          href={`/timetables/${departmentsID}`}
          className={`btn btn-primary ${style.btn}`}
        >
          <FaAngleLeft size={20} />
          Back
        </Link>
        <h3 style={{ textAlign: "center" }}>
          Viewing timetables for {departmentsID} level {levelID}
        </h3>
        <div className={style.container}>
          <div className={style.row}>
            <Link
              href={`/timetables/${departmentsID}/${levelID}/${semester[0]}`}
              className={style.card}
            >
              <h3> {departmentsID} </h3>
              <p>
               {semester[0]} &nbsp;&nbsp;
                <FaArrowRight size={15} />
              </p>
            </Link>
            <Link
              href={`/timetables/${departmentsID}/${levelID}/${semester[1]}`}
              className={style.card}
            >
              <h3> {departmentsID} </h3>
              <p>
                {semester[1]} &nbsp;&nbsp;
                <FaArrowRight size={15} />
              </p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default TimeTables;
