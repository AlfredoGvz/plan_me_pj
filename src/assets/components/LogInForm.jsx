import { useContext, useState } from "react";
import { Button, InputField } from "./Components";
import axios from "axios";
import { MyContext } from "../../App";
import { useNavigate } from "react-router-dom";

const LogInForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const credentials = {
    email,
    password,
  };

  const navigate = useNavigate(); // Call useNavigate inside the component
  const { user, setUser } = useContext(MyContext);

  const sendLogInCredentials = async (credentials) => {
    try {
      const loggedUser = await axios.post(
        `https://sql-be-test.onrender.com/api/sign_in`,
        credentials
      );
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/"); // Redirect after successful login
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      action=""
      className={props.className}
      onSubmit={(e) => e.preventDefault()}
    >
      <div>
        <InputField
          className={props.input_styles}
          labelvalue={"Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputField
          type={"password"}
          labelvalue={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Button
        className={"border_style border-2 px-5 py-3 whitespace-nowrap"}
        inner_text={"Login"}
        onClick={() => {
          sendLogInCredentials(credentials); // Send credentials and handle login
        }}
      />
    </form>
  );
};

export default LogInForm;
