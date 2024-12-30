import updateTeacherAvailability from "./updateTeacherAvailability";

const EditData = async (data) => {
  try {
    let method = data && data.id ? "PUT" : "POST";
    const res = await updateTeacherAvailability(data, method);
    if (!res.ok) throw new Error("Could not update lecturer");
    return res;
  } catch (err) {
    console.log("error submitting the data ", err);
  }
};

export default EditData;
