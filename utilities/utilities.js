import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";

export async function pingServer() {
  const response = await axios.get(
    "https://event-planing-project-api.onrender.com/api/ping"
  );
  console.log(response);
}

export async function logOut() {
  try {
    await axios.post(
      `https://event-planing-project-api.onrender.com/api/sign_out`
    );
    window.location.reload();
    localStorage.clear();
  } catch (error) {
    console.log(error);
  }
}
export async function handleDeleteUser() {
  const navigate = useNavigate();

  await axios.delete(
    `https://event-planing-project-api.onrender.com/api/delete_user`
  );
  navigate("/");
  logOut();
  localStorage.clear();
}

export function handleNextTen(setSearchParams) {
  setSearchParams({ page: 3 });
}

export function handlePreviousTen() {}
