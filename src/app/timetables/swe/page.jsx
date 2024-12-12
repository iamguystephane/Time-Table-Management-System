import style from "../styles/page.module.css";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const TimeTables = () => {
  return (
    <>
      <main className={style.main}>
        <Link href="/" className={`btn btn-primary ${style.btn}`}>
          <FaAngleLeft size={20} />
          Back
        </Link>
        <h3 style={{ textAlign: "center" }}>
          {" "}
          Viewing timetables for Software Engineering department.{" "}
        </h3>
        <div className={style.container}>
          <div className={style.row}>
            <Link href="/timetables/swe/level-one" className={style.card}>
              <h3> SWE </h3>
              <p> Available timetables: L1</p>
              <p>
                {" "}
                View Level One &nbsp;&nbsp;
                <FaArrowRight size={15} />{" "}
              </p>
            </Link>
            <Link href="/timetables/swe/level-two" className={style.card}>
              <h3> SWE </h3>
              <p> Available timetables: L2</p>
              <p>
                {" "}
                View Level Two &nbsp;&nbsp;
                <FaArrowRight size={15} />{" "}
              </p>
            </Link>
            <Link href="/timetables/swe/degree" className={style.card}>
              <h3> SWE </h3>
              <p> Available timetables: Degree</p>
              <p>
                {" "}
                View Degree &nbsp;&nbsp;
                <FaArrowRight size={15} />{" "}
              </p>
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default TimeTables;
