import axios from "axios";

const BASE_URL = "http://localhost:5000";

async function getAllTitikTPA() {
  await axios
    .get(`${BASE_URL}/api/titik-tpa`)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      alert(error.message);
    });
  // const response = await fetch(`${BASE_URL}/api/titik-tpa`);
  // const responseJson = await response.json();

  // if (responseJson.status !== "success") {
  //   alert("failed: " + responseJson.data);
  //   return { error: true, data: [] };
  // }

  // return { error: false, data: responseJson.data };
}

export { getAllTitikTPA };
