import updateStudentAvailability from "./update-student";

const deleteStudent = async (data, method) => {
  try {
    method = data && data.id && "DELETE";
    await updateStudentAvailability(data, method);
    console.log(`successfully deleted ${data.Name}`);
  } catch (err) {
    console.log(`Error deleting record ${err}`);
  }
};

export default deleteStudent;
