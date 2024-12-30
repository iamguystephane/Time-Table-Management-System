const departmentAbbrFunc = (dep) => {
  let department;
  if (dep === "SWE") {
    department = "Software Engineering";
  } else if (dep === "BFI") {
    department = "Banking and Finance";
  } else if (dep === "HWM") {
    department = "Hardware Maintenance";
  } else if (dep === "MKT") {
    department = "Marketing";
  } else if (dep === "ACY") {
    department = "Accountancy";
  } else if (dep === "CNSM") {
    department = "Computer Network and System Maintenance";
  } else if (dep === "HRM") {
    department = "Human Resource Management";
  } else if (dep === "LTM") {
    department = "Logistics and Transport Management";
  } else if (dep === "PM") {
    department = "Project Management";
  } else if (dep === "MGT") {
    department = "Management";
  }
  return department;
};

export default departmentAbbrFunc;
