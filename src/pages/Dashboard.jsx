import { useContext } from "react";
import { MyContext } from "../App";
import LogInForm from "../assets/components/LogInForm";

async function pingServer() {
  console.log("response");
}

// Ping the server every 10 minutes to keep it active (10 minutes = 600,000 milliseconds)

const Dashbooard = () => {
  const { toggle, user } = useContext(MyContext);

  return (
    <div>
      <LogInForm
        className={toggle ? "block" : "hidden"}
        input_styles={"bg-black"}
      />

      <div>
        <div>Delete user</div>
        <div>Activate Calendar</div>
        <div>Log out</div>
        <div>All your attended events</div>
        <div>All your created events</div>
        <div>Create Events</div>
      </div>
    </div>
  );
};

export default Dashbooard;
