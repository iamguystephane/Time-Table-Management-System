import Link from "next/link";
import style from "./page.module.css";
import Image from "next/image";
import citecImg from "../images/Citec.jpeg";
import customize from '../images/customizable.jpg'
import schedule from '../images/scheduling.png'
import userfriendly from '../images/userfriendly.webp'
export const metadata = {
  title: "TTMS Home",
};
export default function Home() {
  return (
    <>
      <header className={style.hero_section}>
        <nav className={style.nav}>
          <ul className={style.ul}>
            <li className={style.li}>
              <Link href="/">
                <Image src={citecImg} alt="CITEC LOGO" className={style.logo} />
              </Link>
            </li>
            <li className={style.li}>
              <Link href="/login" className={style.link}>
                Log in
              </Link>
            </li>
          </ul>
        </nav>
        <h1 className={style.hero_title}>Streamline Your Schedule</h1>
        <p className={style.hero_description}>
          Effortlessly organize and manage your timetable with our powerful
          system.
        </p>
        <a href="#features" className={style.ctaBtn}>
          Explore Features
        </a>
      </header>
      <main className={style.main}>
        <section id="features" className={style.features_section}>
          <div className={style.container}>
            <h2 className={style.section_title}>Features</h2>
            <div className={style.grid}>
              <div className={style.feature}>
                <Image src={schedule} alt="Automation Icon" className={style.img} />
                <h3 className={style.feature_heading}>Automatic Scheduling</h3>
                <p>Create and manage schedules automatically with ease.</p>
              </div>
              <div className={style.feature}>
                <Image src={userfriendly} alt="User-Friendly Icon" className={style.img} />
                <h3 className={style.feature_heading}>
                  User-Friendly Interface
                </h3>
                <p>Intuitive design to make scheduling simple for everyone.</p>
              </div>
              <div className={style.feature}>
                <Image src={customize} alt="Customization Icon" className={style.img} />
                <h3 className={style.feature_heading}>Customizable Options</h3>
                <p>Tailor your timetable to suit your specific needs.</p>
              </div>
            </div>
          </div>
        </section>
        <footer className={style.footer}>
          &copy; 2024 Time table management system. All rights reserved
        </footer>
      </main>
    </>
  );
}
