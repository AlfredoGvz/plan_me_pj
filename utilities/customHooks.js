import axios from "axios";
import { useEffect, useState } from "react";

export function useGetEvents(endpoint) {
  const [eventsData, setEventsData] = useState([]); // Initialize as an empty array
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          `https://sql-be-test.onrender.com${endpoint}`
        );

        if (response && response.data && response.data.events) {
          setEventsData(response.data.events); // Correctly set the data from response
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [endpoint]);

  return { eventsData, isLoading, error };
}
