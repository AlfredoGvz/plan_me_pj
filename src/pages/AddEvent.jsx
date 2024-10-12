import { useContext, useState } from "react";
import { Button, InputField, TextArea } from "../assets/components/Components";
import { MyContext } from "../App";
import { useSender } from "../../utilities/customHooks";

const AddEvent = (props) => {
  const { user } = useContext(MyContext);
  const loggedUser = user?.data?.user?.dataTosend?.userInDB?.[0] || {};

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
    <div className="">
      <div className="">
        <Button
          className={props.className}
          inner_text={"Add Event"}
          onClick={() => document.getElementById("add_event_modal").showModal()}
        />

        <dialog id={"add_event_modal"} className="modal ">
          <div className="modal-box tablet:w-[80%] laptop:w-[50%] max-w-5xl">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                ✕
              </button>
            </form>
            <div className="mx-auto flex p-4 text-stone-950 bg-[linear-gradient(to_right,_#6a4c93,_#4c447b,_#353a61,_#262f46,_#1d222b)] rounded-md">
              <h1 className="text-white tablet:text-[1.2rem]">
                Organizer: {loggedUserName}
              </h1>
            </div>
            <div className={"mt-8"}>
              <p>
                Important: All the fields need to be completed with the relevant
                information.
              </p>
            </div>
            <div className="my-8">
              <form>
                <div className="flex flex-col gap-4">
                  <div>
                    <InputField
                      labelvalue={"Event Title"}
                      id={"name"}
                      placeholder={"E.g. Classical Music Club"}
                      onChange={(e) => setEventTitle(e.target.value)}
                      className={
                        "flex input input-md input-bordered my-2 w-full "
                      }
                    />
                  </div>
                  <div>
                    <TextArea
                      labelvalue={"Event Description"}
                      id={"event_description"}
                      placeholder={"Please provide an event description here. "}
                      className={
                        "flex textarea textarea-bordered my-2 textarea-lg w-full h-[20rem]"
                      }
                      onChange={(e) => setEventDescription(e.target.value)}
                    />
                  </div>
                  <InputField
                    labelvalue={"Date"}
                    id={"date"}
                    type={"date"}
                    onChange={(e) => {
                      const dateValue = e.target.value; // "yyyy-mm-dd"
                      const [year, month, day] = dateValue.split("-"); // Split into year, month, day
                      const formattedDate = `${day}-${month}-${year}`; // Reformat to "dd/mm/yyyy"
                      setDate(formattedDate);
                    }}
                    className={"flex gap-2 input input-bordered my-2"}
                  />
                  <div className="flex galp-2 tablet:w-[50%]">
                    <InputField
                      labelvalue={"Starts at"}
                      id={"start_time"}
                      type={"time"}
                      onChange={(e) => setStartTime(e.target.value)}
                      className={"flex gap-2 input input-bordered my-2"}
                    />
                    <InputField
                      labelvalue={"Ends at"}
                      id={"end_time"}
                      type={"time"}
                      onChange={(e) => setEndTime(e.target.value)}
                      className={"flex gap-2 input input-bordered my-2"}
                    />
                  </div>

                  <div>
                    <InputField
                      labelvalue={"Venue"}
                      id={"venue"}
                      onChange={(e) => setVenue(e.target.value)}
                      className={"flex input input-bordered my-2  "}
                    />
                  </div>
                  <div>
                    <InputField
                      labelvalue={"Price"}
                      id={"price"}
                      onChange={(e) => setPrice(e.target.value)}
                      className={"flex input input-bordered my-2 "}
                    />
                  </div>
                  <div>
                    <InputField
                      labelvalue={"Address"}
                      id={"address"}
                      onChange={(e) => setAddress(e.target.value)}
                      className={"flex input input-bordered my-2 w-full "}
                    />
                  </div>
                  <div className="flex gap-4 flex-col tablet:flex-row">
                    <InputField
                      labelvalue={"City"}
                      id={"city"}
                      onChange={(e) => setCity(e.target.value)}
                      className={"flex input input-bordered my-2 w-full "}
                    />
                    <InputField
                      labelvalue={"Post Code"}
                      id={"post_code"}
                      onChange={(e) => setPostCode(e.target.value)}
                      className={"flex input input-bordered my-2 w-full "}
                    />
                  </div>
                  <div>
                    {!eventTitle ||
                    !eventDescription ||
                    !startTime ||
                    !endTime ||
                    !date ||
                    !venue ||
                    !price ||
                    !address ||
                    !city ||
                    !postCode ? (
                      <Button
                        inner_text={"Post Event"}
                        className={
                          "disabled_btn border-2 px-5 py-3 whitespace-nowrap"
                        }
                      />
                    ) : (
                      <Button
                        inner_text={"Post Event"}
                        onClick={handlePostEvent}
                        className={
                          "booking_spot_btn border-2 px-5 py-3 whitespace-nowrap"
                        }
                      />
                    )}

                    {isLoading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                  </div>
                </div>
              </form>
            </div>
            <div className={"flex justify-end px-3 py-4"}></div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default AddEvent;
