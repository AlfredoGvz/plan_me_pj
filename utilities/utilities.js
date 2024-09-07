import axios from "axios";

export async function pingServer() {
  const response = await axios.get("https://sql-be-test.onrender.com/api/ping");
  console.log(response);
}

// Ping the server every 10 minutes to keep it active (10 minutes = 600,000 milliseconds)
