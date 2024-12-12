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
  }
  return department;
};

export default departmentAbbrFunc;
