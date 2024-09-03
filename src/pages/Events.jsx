import { useGetEvents } from "../../utilities/customHooks";
import { EventTile } from "../assets/components/Components";

const Events = () => {
  const { eventsData, isLoading, error } = useGetEvents("/api/get_events");
  if (isLoading) return <p>Loading events...</p>; // Display loading state
  if (error) return <p>Error loading events: {error.message}</p>; // Display error state

  return (
    <div className="bg-black text-white py-8">
      <div className="w-11/12 m-auto">
        {Array.isArray(eventsData) && eventsData.length > 0 ? ( // Check if eventsData is an array and not empty
          eventsData.map(
            (
              currentItem,
              index // Return JSX elements correctly
            ) => (
              <EventTile
                key={index}
                date={currentItem.date}
                start_time={currentItem.start_time}
                title={currentItem.title}
                city={currentItem.city}
                action={"ADD TO CALENDAR"}
                generals={"tile_event_page grid grid-cols-3	"}
                dateInfo={"m-auto"}
                generalDetails={"text-left  "}
                buttonArea={"m-auto"}
              />
            )
          )
        ) : (
          <p>No events available.</p> // Fallback if there are no events
        )}
      </div>
    </div>
  );
};

export default Events;
