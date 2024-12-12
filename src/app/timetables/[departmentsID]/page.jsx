"use client";

import style from "../styles/page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const TimeTables = ({ params }) => {
  const { departmentsID } = React.use(params);
  const [excludedDegreeDepartment, setExcludedDegreeDepartment] =
    React.useState(true);
  const [excludedHNDDepartment, setExcludedHNDDepartment] =
    React.useState(true);
  //Logic to redirect to 404 page if a wrong dynamic link is entered.
  const router = useRouter();
  if (
    ![
      "SWE",
      "BFI",
      "MKT",
      "PM",
      "MGT",
      "HRM",
      "HWM",
      "CNSM",
      "LTM",
      "ACY",
    ].includes(departmentsID.toUpperCase())
  ) {
    React.useEffect(() => {
      router.push("/404");
    }, [departmentsID]);
  }

  //excluding departments which are not found in either HND (levels one and two) or degree
  React.useEffect(() => {
    if (departmentsID.toUpperCase() === "CNSM") {
      setExcludedDegreeDepartment(false);
    }
    if (departmentsID.toUpperCase() === "HWM") {
      setExcludedHNDDepartment(false);
    }
  }, [departmentsID]);

  return (
    <>
      <main className={style.main}>
        <Link href="/timetables" className={`btn btn-primary ${style.btn}`}>
          <FaAngleLeft size={20} />
          Back
        </Link>
        <h3 style={{ textAlign: "center" }}>
          Viewing timetables for {departmentsID}
        </h3>
        <div className={style.container}>
          <div className={style.row}>
            {excludedDegreeDepartment && (
              <>
                <Link
                  href={`/timetables/${departmentsID}/level-one`}
                  className={style.card}
                >
                  <h3> {departmentsID} </h3>
                  <p> Available timetables: L1</p>
                  <p>
                    View Level One &nbsp;&nbsp;
                    <FaArrowRight size={15} />
                  </p>
                </Link>
                <Link
                  href={`/timetables/${departmentsID}/level-two`}
                  className={style.card}
                >
                  <h3> {departmentsID} </h3>
                  <p> Available timetables: L2</p>
                  <p>
                    View Level Two &nbsp;&nbsp;
                    <FaArrowRight size={15} />
                  </p>
                </Link>
              </>
            )}
            {excludedHNDDepartment && (
              <Link
                href={`/timetables/${departmentsID}/degree`}
                className={style.card}
              >
                <h3> {departmentsID} </h3>
                <p> Available timetables: Degree</p>
                <p>
                  View Degree &nbsp;&nbsp;
                  <FaArrowRight size={15} />
                </p>
              </Link>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default TimeTables;
