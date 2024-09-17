import axios from "axios";
import { useNavigate } from "react-router-dom";

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
export async function handleDeleteUser() {
  const navigate = useNavigate();

  await axios.delete(`https://sql-be-test.onrender.com/api/delete_user`);
  navigate("/events");
  logOut();
  localStorage.clear();
}
