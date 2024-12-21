const ErrorMessages = (data, err) => {
  if (!data.age) err.age = "Age is required.";
  if (!data.department) err.department = "Department is required.";
  if (!data.phone) err.phone = "Phone is required";
  if (!data.email) err.email = "Email is required";
  if (!data.gender) err.gender = "Gender is required";
  if (!data.dob) err.dob = "Date of Birth is required";
  if (!data.names) err.names = "Names is required";
  if (!data.status) err.status = "Status is required";
};

export default ErrorMessages;
