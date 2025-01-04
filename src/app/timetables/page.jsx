import style from "../styles/time-tables.module.css";
import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
const TimeTables = () => {
  return (
    <>
      <main className={style.main}>
        {/* <Link href="/" className={`btn btn-primary ${style.btn}`}>
          <FaAngleLeft size={20} />
          Back
        </Link> */}
        <h3 style={{textAlign: 'center'}}> Viewing timetables for all departments. </h3>
        <div className={style.container}>
            <div className={style.row}>
              <Link href="/timetables/swe" className={style.card}>
                <h3> SWE </h3>
                <p> Available timetables: L1, L2, Degree</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
              <Link href="/timetables/hwm" className={style.card}>
                <h3> HWM </h3>
                <p> Available timetables: L1, L2</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
              <Link href="/timetables/cnsm" className={style.card}>
                <h3> CNSM </h3>
                <p> Available timetables: Degree</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
            </div>
            <div className={style.row}>
              <Link href="/timetables/bfi" className={style.card}>
                <h3> BFI </h3>
                <p> Available timetables: L1, L2, Degree</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
              <Link href="/timetables/mkt" className={style.card}>
                <h3> MKT </h3>
                <p> Available timetables: L1, L2</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
              <Link href="/timetables/acy" className={style.card}>
                <h3> ACY </h3>
                <p> Available timetables: Degree</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
            </div>
            <div className={style.row}>
              <Link href="/timetables/pm" className={style.card}>
                <h3> PM </h3>
                <p> Available timetables: L1, L2, Degree</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
              <Link href="/timetables/ltm" className={style.card}>
                <h3> LTM </h3>
                <p> Available timetables: L1, L2</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
              <Link href="/timetables/hrm" className={style.card}>
                <h3> HRM </h3>
                <p> Available timetables: Degree</p>
                <p> View all SWE timetables <FaArrowRight size={15} /> </p>
              </Link>
            </div>
        </div>
      </main>
    </>
  );
};

export default TimeTables;
