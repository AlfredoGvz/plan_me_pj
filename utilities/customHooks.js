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

export function useGetEventById(event_id, endpoint) {
  const [eventByIdData, setEventByIdData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchEventById = async () => {
      try {
        const response = await axios.get(
          `https://sql-be-test.onrender.com${endpoint}/${event_id}`
        );
        if (response && response.data && response.data.event) {
          setEventByIdData(response.data.event); // Correctly set the data from response
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEventById();
  }, [event_id]);
  return { eventByIdData, isLoading, error };
}

// export function useLogIn(endpoint, credentials, send) {
//   const [userLogged, setUserLogged] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const signUserIN = async () => {
//       try {
//         const logger = await axios.post(
//           `https://sql-be-test.onrender.com${endpoint}`,
//           credentials
//         );

//         setUserLogged(logger.data.user);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     signUserIN();
//   }, [send]);

//   return { userLogged, isLoading, error };
// }

export function useLogIn(endpoint, credentials, send, setSend) {
  const [userLogged, setUserLogged] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (send) {
      const signUserIn = async () => {
        setIsLoading(true);
        try {
          const logger = await axios.post(
            `https://sql-be-test.onrender.com${endpoint}`,
            credentials
          );
          setUserLogged(logger.data.user);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
          setSend(false); // Reset send to false after request
        }
      };
      signUserIn();
    }
  }, [send, credentials, endpoint, setSend]);

  return { userLogged, isLoading, error };
}

export async function logOut() {
  try {
    await axios.post(`https://sql-be-test.onrender.com/api/sign_out`);
    window.location.reload();
    localStorage.removeItem("user");
  } catch (error) {
    console.log(error);
  }
}
