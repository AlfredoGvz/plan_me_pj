import { useContext, useState } from "react";
import { Button, InputField, TextArea } from "../assets/components/Components";
import { MyContext } from "../App";
import { useSender } from "../../utilities/customHooks";

const AddEvent = () => {
  const { user } = useContext(MyContext);
  const loggedUser = user.data.user.dataTosend.userInDB[0];
  const loggedUserName = loggedUser.user_name;

  // Event state management
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [price, setPrice] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");

  // State for tracking the form submission
  const [eventToPost, setEventToPost] = useState(null);

  // Using the hook only after "Post Event" is clicked
  const { isLoading, error } = useSender("/api/new_event", eventToPost);

  const handlePostEvent = (e) => {
    e.preventDefault();

    // Construct event object
    const newEvent = {
      title: eventTitle,
      description: eventDescription,
      start_time: startTime,
      end_time: endTime,
      date: date,
      venue: venue,
      price: price,
      address: address,
      post_code: postCode,
      city: city,
    };

    // Set the event to post, which triggers the useSender hook
    setEventToPost(newEvent);
  };

  return (
    <div>
      <form>
        <h1>Organizer: {loggedUserName}</h1>
        <div>
          <InputField
            labelvalue={"Event Title"}
            id={"name"}
            placeholder={"E.g. Classical Music Club"}
            onChange={(e) => setEventTitle(e.target.value)}
          />
        </div>
        <div>
          <TextArea
            labelvalue={"Event Description"}
            id={"event_description"}
            placeholder={"Please provide an event description here. "}
            onChange={(e) => setEventDescription(e.target.value)}
          />
        </div>
        <div>
          <InputField
            labelvalue={"Starts at"}
            id={"start_time"}
            type={"time"}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div>
          <InputField
            labelvalue={"Ends at"}
            id={"end_time"}
            type={"time"}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
        <div>
          <InputField
            labelvalue={"Date"}
            id={"date"}
            type={"date"}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div>
          <InputField
            labelvalue={"Venue"}
            id={"venue"}
            onChange={(e) => setVenue(e.target.value)}
          />
        </div>
        <div>
          <InputField
            labelvalue={"Price"}
            id={"price"}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <InputField
            labelvalue={"Address"}
            id={"address"}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <InputField
            labelvalue={"City"}
            id={"city"}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <InputField
            labelvalue={"Post Code"}
            id={"post_code"}
            onChange={(e) => setPostCode(e.target.value)}
          />
        </div>
        <Button inner_text={"Post Event"} onClick={handlePostEvent} />
      </form>

      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default AddEvent;
