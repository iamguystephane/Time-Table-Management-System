import {
  SE_semester1,
  SE_semester3,
  SE_semester5,
} from "../src/app/scripts/Software_Courses";
import {
  ACC_semester1,
  ACC_semester3,
  ACC_semester5,
} from "../src/app/scripts/Accountancy_Courses";
import {
  BF_semester1,
  BF_semester3,
  BF_semester5,
} from "../src/app/scripts/Banking_Courses";
import {
  HM_semester1,
  HM_semester3,
} from "../src/app/scripts/Hardware_Courses";
import {
  MAR_semester1,
  MAR_semester3,
  MAR_semester5,
} from "../src/app/scripts/Marketing_Courses";
import {
  HRM_semester1,
  HRM_semester3,
  HRM_semester5,
} from "../src/app/scripts/HumanResource_Courses";
import {
  LTM_semester1,
  LTM_semester3,
  LTM_semester5,
} from "../src/app/scripts/TransportAndLogistics_Courses";
import {
  PM_semester1,
  PM_semester3,
  PM_semester5,
} from "../src/app/scripts/ProjectManagement_Courses";
const UpdateCourses = (department, semester, setDepartmentAbbr) => {
  let courses = [];
  if (department === "SWE") {
    if (semester === 1) {
      courses = SE_semester1;
    } else if (semester === 3) {
      courses = SE_semester3;
    } else if (semester === "Degree 1") {
      courses = SE_semester5;
    } else {
      courses = ["Please select a level"];
    }
    setDepartmentAbbr("Software Engineering");
  } else if (department === "ACY") {
    if (semester === 1) {
      courses = ACC_semester1;
    } else if (semester === 3) {
      courses = ACC_semester3;
    } else if (semester === "Degree 1") {
      courses = ACC_semester5;
    } else {
      courses = ["Please select a level"];
    }
    setDepartmentAbbr("Accountancy");
  } else if (department === "BFI") {
    if (semester === 1) {
      courses = BF_semester1;
    } else if (semester === 3) {
      courses = BF_semester3;
    } else if (semester === "Degree 1") {
      courses = BF_semester5;
    } else {
      courses = ["Please select a level"];
    }
    setDepartmentAbbr("Banking and Finance");
  } else if (department === "HWM") {
    if (semester === 1) {
      courses = HM_semester1;
    } else if (semester === 3) {
      courses = HM_semester3;
    } else if (semester === "Degree 1") {
      courses = ["Department doesn't exist for degree."];
    } else {
      courses = ["Please select a level"];
    }
    setDepartmentAbbr("Hardware Maintenance");
  } else if (department === "MKT") {
    if (semester === 1) {
      courses = MAR_semester1;
    } else if (semester === 3) {
      courses = MAR_semester3;
    } else if (semester === "Degree 1") {
      courses = MAR_semester5;
    } else {
      courses = ["Please select a level"];
    }
    setDepartmentAbbr("Marketing");
  } else if (department === "HRM") {
    if (semester === 1) {
      courses = HRM_semester1;
    } else if (semester === 3) {
      courses = HRM_semester3;
    } else if (semester === "Degree 1") {
      courses = HRM_semester5;
    } else {
      courses = ["Please select a level"];
    }
    setDepartmentAbbr("Human Resource Management");
  } else if (department === "LTM") {
    if (semester === 1) {
      courses = LTM_semester1;
    } else if (semester === 3) {
      courses = LTM_semester3;
    } else if (semester === "Degree 1") {
      courses = LTM_semester5;
    } else {
      courses = ["Please select a level"];
    }
    setDepartmentAbbr("Logistics and Transport Management");
  } else if (department === "PM") {
    if (semester === 1) {
      courses = PM_semester1;
    } else if (semester === 3) {
      courses = PM_semester3;
    } else if (semester === "Degree 1") {
      courses = PM_semester5;
    } else {
      courses = ["Please select a level"];
    }
    setDepartmentAbbr("Project Management");
  }
  return courses;
};

export default UpdateCourses;
