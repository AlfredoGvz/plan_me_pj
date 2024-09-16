import { useGetEvents } from "../../utilities/customHooks";
import { EventTile } from "../assets/components/Components";
const Events = () => {
  const { eventsData, isLoading, error } = useGetEvents("/api/get_events");
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
    <div className="text-white py-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Events;
