const updateStudent = async (formData, method) => {
  try {
    const response = await fetch("/api/user-update-delete", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) {
      const error = await response.json();
      return { error: error.message };
    }
    const res = await response.json();
    return { message: res.message };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};

export default updateStudent;
