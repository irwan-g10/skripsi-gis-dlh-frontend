const BASE_URL = "http://localhost:5000";

async function getAllTitikTPA() {
  const response = await fetch(`${BASE_URL}/api/titik-tpa`);
  const responseJson = await response.json();

  if (responseJson.status !== "success") {
    alert("failed: " + responseJson.data);
    return { error: true, data: [] };
  }

  return { error: false, data: responseJson.data };
}

export { getAllTitikTPA };
