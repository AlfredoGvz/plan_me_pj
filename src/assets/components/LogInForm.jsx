import { useState } from "react";
import { Button, InputField } from "./Components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogInForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [userRole, setUserRole] = useState("");
  const signInCredentials = {
    email,
    password,
  };
  const signUpCredentials = {
    user_email: email,
    password: password,
    user_name: name + " " + surname,
    user_role: userRole,
  };
  const [toggleForms, setToggleForms] = useState("sign in");

  const navigate = useNavigate(); // Call useNavigate inside the component

  const sendLogInCredentials = async (signInCredentials) => {
    try {
      const loggedUser = await axios.post(
        `https://sql-be-test.onrender.com/api/sign_in`,
        signInCredentials
      );
      localStorage.setItem("user", JSON.stringify(loggedUser));
      navigate("/"); // Redirect after successful login
      window.location.reload();
      console.log(loggedUser);
    } catch (error) {
      console.log(error);
    }
  };
  const sendSignUpCredentials = async (signUpCredentials) => {
    try {
      const loggedUser = await axios.post(
        `https://sql-be-test.onrender.com/api/new_user`,
        signUpCredentials
      );
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
        <div className={toggleForms === "sign in" ? "hidden" : "block"}>
          <InputField
            className={props.input_styles}
            labelvalue={"Name"}
            id={"name_input"}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputField
            labelvalue={"Surname"}
            id={"surname_input"}
            onChange={(e) => {
              setSurname(e.target.value);
            }}
          />
          <div>
            <input
              type="radio"
              id="option1"
              name="choice"
              value="attendee"
              onClick={(e) => {
                const value = e.target.value;
                setUserRole(value);
              }}
            />
            <label htmlFor="option1">Attendee</label>
            <br />
            <input
              type="radio"
              id="option2"
              name="choice"
              value="organizer"
              onClick={(e) => {
                const value = e.target.value;
                setUserRole(value);
              }}
            />{" "}
            <label htmlFor="option2">Organizer</label>
          </div>
        </div>

        <InputField
          className={props.input_styles}
          id={"email_input"}
          labelvalue={"Email"}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <InputField
          type={"password"}
          id={"password_input"}
          labelvalue={"Password"}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      <Button
        className={"border_style border-2 px-5 py-3 whitespace-nowrap"}
        inner_text={toggleForms === "sign in" ? "Login" : "Sign Up"}
        onClick={() => {
          if (toggleForms === "sign in") {
            sendLogInCredentials(signInCredentials); // Send credentials and handle login
          } else {
            sendSignUpCredentials(signUpCredentials);
          }
        }}
      />
      <button
        to={"new_account"}
        onClick={(e) => {
          e.preventDefault();

          if (toggleForms === "sign in") {
            setToggleForms("sign up");
          } else if (toggleForms === "sign up") {
            setToggleForms("sign in");
          }
        }}
      >
        {toggleForms === "sign in"
          ? "Create Account"
          : "Sign in to your account "}
      </button>
    </form>
  );
};

export default LogInForm;
