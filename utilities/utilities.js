import axios from "axios";

export async function pingServer() {
  const response = await axios.get("https://sql-be-test.onrender.com/api/ping");
  console.log(response);
}

export async function logOut() {
  try {
    await axios.post(`https://sql-be-test.onrender.com/api/sign_out`);
    window.location.reload();
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
}
