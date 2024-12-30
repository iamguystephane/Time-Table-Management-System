const sendData = async (formData) => {
  try {
    const response = await fetch("/api/availability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    if (!response.ok) throw new Error("Couldn't submit");
    return response;
  } catch (err) {
    console.log("Internal server error: ", err);
  }
};

export default sendData;
