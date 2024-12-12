const updateStudentAvailability = async (formData, method = "POST") => {
  try {
    let url;
    if (method === "PUT" && formData.id) {
      url = `http://localhost:4000/student/${formData.id}`;
    } else if (method === "DELETE" && formData.id) {
      url = `http://localhost:4000/student/${formData.id}`;
    } else {
      url = `http://localhost:4000/student`;
    }
    const response = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw Error("Couldn't modify database");
    console.log(response.body);
  } catch (err) {
    console.log(err);
  }
};

export default updateStudentAvailability;