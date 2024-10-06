const BASE_URL = "http://localhost:5000/api/titik-tpa";

async function getAllTitikTPA() {
  const response = await fetch(`${BASE_URL}/api/titik-tpa`);
  const responseJson = await response.json;

  if (responseJson.status !== "success") {
    alert(responseJson.message);
    return { error: true, data: [] };
  }

  return { error: false, data: responseJson.data };
}
