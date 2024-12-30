//regex definition for password and email
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const hasLowercase = /[a-z]/;
const hasUppercase = /[A-Z]/;
const hasNumber = /\d/;
const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

const errorMessages = async (data, err) => {
  if (!data.age) err.age = "Age is required.";
  if (!data.department || !data.department.trim())
    err.department = "Department is required.";
  if (!data.phone || !data.phone.trim()) {
    err.phone = "Phone is required";
  } else if (data.phone.trim().length != 9) {
    err.phone = "Phone must be 9 digits";
  } else if (data.phone.trim().slice(0, 1) != 6) {
    err.phone = "Phone number must begin with 6";
  }
  if (data.status === "Student") {
    if (!data.level || !data.level.trim()) {
      err.level = "Level is required";
    } else if (data.level.trim() === "Select Level") {
      err.level = "Please select a level";
    }
  }
  if (!data.email || !data.email.trim()) {
    err.email = "Email is required";
  } else if (!emailRegex.test(data.email)) {
    err.email = "Invalid email format";
  }
  if (!data.department || !data.department.trim()) {
    err.department = "Department required";
  } else if (
    !data.department ||
    data.department.trim() === "Choose Department"
  ) {
    err.department = "Please select a department";
  }
  if (!data.gender || !data.gender.trim()) err.gender = "Gender is required";
  if (!data.dob || !data.dob.trim()) err.dob = "Date of Birth is required";
  if (!data.names || !data.names.trim()) err.names = "Names is required";
  if (!data.status || !data.status.trim()) err.status = "Status is required";

  if (!data.password) {
    err.password = "Password is required";
  } else if (data.password.length < 8) {
    err.password = "Password must be at least 8 characters";
  } else if (!hasLowercase.test(data.password)) {
    err.password = "Password must have at least one lowercase letter";
  } else if (!hasUppercase.test(data.password)) {
    err.password = "Password must contain at least one uppercase letter";
  } else if (!hasSpecialChar.test(data.password)) {
    err.password = "Password must contain a special character";
  } else if (!hasNumber.test(data.password)) {
    err.password = "Password must contain a number";
  }

  if (!data.confirmPassword) {
    err.confirmPassword = "Please confirm password";
  } else if (data.password !== data.confirmPassword) {
    err.passwordError = "Passwords do not match.";
  }
};

let strength = "";
function passwordStrength(password) {
  if (password.length < 8) {
    strength = "Poor";
  } else if (
    password.length >= 8 &&
    (!hasUppercase.test(password) || !hasNumber.test(password))
  ) {
    strength = "Very weak";
  } else if (
    password.length >= 8 &&
    hasUppercase.test(password) &&
    hasNumber.test(password) &&
    !hasSpecialChar.test(password)
  ) {
    strength = "Weak";
  } else if (
    password.length >= 8 &&
    password.length < 12 &&
    hasUppercase.test(password) &&
    hasNumber.test(password) &&
    hasSpecialChar.test(password) &&
    hasLowercase.test(password)
  ) {
    strength = "Good";
  } else if (
    password.length >= 12 &&
    hasUppercase.test(password) &&
    hasLowercase.test(password) &&
    hasNumber.test(password) &&
    hasSpecialChar.test(password)
  ) {
    strength = "Very Good";
  }

  return strength;
}

export { passwordStrength, errorMessages };
