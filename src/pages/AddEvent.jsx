import { useContext } from "react";
import { Button, InputField, TextArea } from "../assets/components/Components";
import { MyContext } from "../App";

// Take the name from the backend response
const AddEvent = () => {
  const { user } = useContext(MyContext);
  const loggedUser = user.data.user.dataTosend.userInDB[0];
  const loggedUserName = loggedUser.user_name;
  const loggedUserRole = loggedUser.user_role;

  console.log(loggedUserName, loggedUserRole);
  return (
    <div>
      <form action="">
        <h1>Organizer: {loggedUserName}</h1>
        <div>
          <InputField
            labelvalue={"Event Title"}
            id={"name"}
            placeholder={"E.g. Classical Music Club"}
          />
        </div>

        <div>
          <TextArea
            labelvalue={"Event Description"}
            id={"event_description"}
            placeholder={"Please provide an event description here. "}
          />
        </div>
        <div>
          <InputField
            labelvalue={"Starts at"}
            id={"start_time"}
            type={"time"}
          />
        </div>
        <div>
          <InputField labelvalue={"Ends at"} id={"end_time"} type={"time"} />
        </div>
        <div>
          <InputField labelvalue={"Date"} id={"date"} type={"date"} />
        </div>
        <div>
          <InputField labelvalue={"Venue"} id={"venue"} />
        </div>
        <div>
          <InputField labelvalue={"price"} id={"price"} />
        </div>
        <div>
          <InputField labelvalue={"Address"} id={"address"} />
        </div>
        <div>
          <InputField labelvalue={"City"} id={"city"} />
        </div>
        <div>
          <InputField labelvalue={"Post Code"} id={"post_code"} />
        </div>
        <Button inner_text={"Post Event"} />
      </form>
    </div>
  );
};

export default AddEvent;
