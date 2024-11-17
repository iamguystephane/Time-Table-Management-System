import updateTeacherAvailability from "./updateTeacherAvailability";

const EditData = async (data) => {
  try {
    let method = data && data.id ? "PUT" : "POST";
    await updateTeacherAvailability(data, method);
    console.log("successfully updated ");
  } catch (err) {
    console.log("error submitting the data " + err);
  }
};

export default EditData;