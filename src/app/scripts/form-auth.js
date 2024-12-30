const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const errorMessages = async (data, err) => {
  if (!data.department || !data.department.trim())
    err.department = "Department is required.";
  if (!data.phone || !data.phone.trim()) {
    err.phone = "Phone is required";
  } else if (data.phone.trim().length != 9) {
    err.phone = "Phone must be 9 digits";
  } else if (data.phone.trim().slice(0, 1) != 6) {
    err.phone = "Phone number must begin with 6";
  }

  if (!data.email || !data.email.trim()) {
    err.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    err.email = "Invalid email format";
  }
  if (!data.time || !data.time.trim()) {
    err.time = "Time required";
  } else if (!data.time || data.time.trim() === "Select time") {
    err.time = "Please select available time";
  }
  if (!data.level || !data.level.trim()) {
    err.level = "Level required";
  } else if (!data.level || data.level.trim() === "Select level") {
    err.level = "Please select a level";
  }
  if (!data.department || !data.department.trim()) {
    err.department = "Department required";
  } else if (
    !data.department ||
    data.department.trim() === "Choose Department"
  ) {
    err.department = "Please select a department";
  }
  if (!data.day || !data.day.trim()) {
    err.day = "Day is required";
  } else if (!data.day || data.day.trim() === "Choose day") {
    err.day = "Please select available day";
  }
  if (data.semester === "Please select a level") {
    err.semester = "Select a level to fill this field";
  } else if (data.semester === "select level to apply") {
    err.semester = "Select a level to automatically get the semester";
  }
  if (!data.course || !data.course.trim()) {
    err.course = "Course required";
  } else if (data.course.trim() === "Select course") {
    err.course = "Please choose a course";
  } else if (data.course.trim() === "Please select a level") {
    err.course = "Please choose a course";
  } else if (data.course.trim() === "Department doesn't exist for degree.") {
    err.course =
      "The departmen of Hardware Maintenance is not available for degree. Did you mean CNSM?";
  }
  if (!data.names || !data.names.trim()) err.names = "Names is required";
};

export default errorMessages;
