import { useState } from "react";
import { useGetEvents } from "../../utilities/customHooks";
import { EventTile, PaginationUI } from "../assets/components/Components";
import { useNavigate } from "react-router-dom";

const Events = () => {
  const navigate = useNavigate();
  let [indexLast, setIndexLast] = useState(0);
  const { eventsData, isLoading, error } = useGetEvents(
    "/api/get_events",
    indexLast
  );

  const handleNextTen = () => {
    let page = 0;
    const newIndexLast = eventsData.length;
    let nextTen = eventsData[newIndexLast - 1].eventId;
    console.log(nextTen);

    setIndexLast(nextTen);

    // Update the URL with the new pagination value (lastSeenId)
    navigate(`?last_item=${nextTen}`);
  };

  if (isLoading)
    return (
      <div className=" body-height flex justify-center items-center">
        <div>
          <div className="loader"></div>
        </div>
      </div>
    );
  if (error) return <p>Error loading events: {error.message}</p>; // Display error state

  return (
    <div className="text-white">
      <div className="laptop:w-11/12 m-auto">
        <div className="flex justify-center">
          <div className="w-[20%] my-2 py-5">
            <p className="text-[2.5rem] tablet:text-[3rem] vertical-text mx-[-1rem] laptop:mx-[0rem] fixed">
              EVENTS
            </p>
          </div>
          <div className="tablet:w-[60%] w-[67%] flex flex-col gap-4">
            {Array.isArray(eventsData) && eventsData.length > 0 ? ( // Check if eventsData is an array and not empty
              eventsData.map(
                (
                  currentItem,
                  index // Return JSX elements correctly
                ) => (
                  <EventTile
                    key={index}
                    eventId={currentItem.event_id}
                    date={currentItem.date}
                    start_time={currentItem.start_time}
                    title={currentItem.title}
                    city={currentItem.city}
                    action={"BOOK A SPOT"}
                  />
                )
              )
            ) : (
              <p>No events available.</p> // Fallback if there are no events
            )}
            <PaginationUI nextTen={handleNextTen} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
