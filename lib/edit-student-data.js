import updateStudentAvailability from "./update-student-availability";

const EditStudent = async (data) => {
  try {
    let method = data && data.id ? "PUT" : "POST";
    await updateStudentAvailability(data, method);
    console.log("successfully updated ");
  } catch (err) {
    console.log("error submitting the data " + err);
  }
};

export default EditStudent;
