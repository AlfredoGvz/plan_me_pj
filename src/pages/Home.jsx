import { useContext } from "react";
import { MyContext } from "../App";
import LogInForm from "../assets/components/LogInForm";

async function pingServer() {
  console.log("response");
}

// Ping the server every 10 minutes to keep it active (10 minutes = 600,000 milliseconds)

const HomePage = () => {
  const { toggle, user } = useContext(MyContext);

  return (
    <div>
      <LogInForm
        className={toggle ? "block" : "hidden"}
        input_styles={"bg-black"}
      />
    </div>
  );
};

export default HomePage;
