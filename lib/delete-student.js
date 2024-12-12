import updateStudentAvailability from "./update-student-availability";

const deleteStudent = async (data, method = "POST") => {
  try {
    method = data && data.id ? "DELETE" : "POST";
    await updateStudentAvailability(data, method);
    console.log(`successfully deleted ${data.Name}`);
  } catch (err) {
    console.log(`Error deleting record ${err}`);
  }
};

export default deleteStudent;
