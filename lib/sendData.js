const sendData = async (formData) => {
  try {
    const existingResponse = await fetch(
      "http://localhost:5000/teacherAvailability"
    );
    const existingData = await existingResponse.json();
    if (!existingResponse.ok) throw Error("Couldn't fetch data");
    const nextID = `${existingData.length + 1}`; //converting the nextID to string using template literals;
    const dataWithID = { ...formData, id: nextID };
    const response = await fetch("http://localhost:5000/teacherAvailability", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dataWithID),
    });
    if (!response.ok) throw Error("Couldn't send data to the server");
  } catch (err) {
    console.log(err);
  }
};

export default sendData;
