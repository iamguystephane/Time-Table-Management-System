import updateTeacherAvailability from "./updateTeacherAvailability";

const deleteData = async (data) => {
  try {
    const method = data && data.id ? "DELETE" : "POST";
    await updateTeacherAvailability(data, method);
    console.log("successfully deleted record");
  } catch (err) {
    console.log(`error deleting record ${err}`);
  }
};

export default deleteData;
