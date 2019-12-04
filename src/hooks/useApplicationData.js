import axios from "axios";
import { useEffect, useReducer } from "react";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
// const SET_SOCKET = "SET_SOCKET";

const reducer = function(state, action) {
  // const send_data = data => {
  //   if (state.socket && !action.fromRemote) {
  //     state.socket.send(JSON.stringify({ data }));
  //   }
  // };
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.day};
    case SET_APPLICATION_DATA:
      const arr = action.all;
      return {...state, days: arr[0].data, appointments: arr[1].data, interviewers: arr[2].data};
    case SET_INTERVIEW:
      const newDays = state.days.map((day) => {
        if (day.name === state.day) {
          return {...day, spots: day.spots + action.value}
        }
        return day;
      })
      // send_data(action.appointment);
      return { 
        ...state, 
        days: newDays, 
        appointments: action.appointments
      };
    // case SET_SOCKET:
    //   return {
    //     ...state, socket: action.value
    //   };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}});

  const setDay = day => dispatch({type: SET_DAY, day});
  
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, all});
    });

    // const socket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);

    // socket.addEventListener("open", () => {
    //   console.log("connected");
    //   // dispatch({ type: SET_SOCKET, value: socket });
    // });

    // socket.addEventListener("message", msg => {
    //   console.log("msg", msg.data);
    //   const data = JSON.parse(msg.data);
    //   console.log(data);
    // });

    //   const appointments = {
    //     ...state.appointments,
    //     [data.id]: data.interview
    //   };
    //   dispatch({ type: data.type, appointments, value: (data.interview ? -1 : 1), fromServer: true});
    // });

    // return () => {
    //   socket.close();
    // }
  }, [])
  
  const bookInterview = function(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    console.log("bookInterview: ", id, interview);
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({type: SET_INTERVIEW, appointments, value: -1});
      });
      // dispatch({type: SET_INTERVIEW, appointment, appointments, value: -1});
  };
  
  const cancelInterview = function(id) {
    // const appointment = {
    //   ...state.appointments[id],
    //   interview: null
    // };
    const appointments = {
      ...state.appointments,
      [id]: {...state.appointments[id], interview: null}
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
      .then(() => {
        dispatch({type: SET_INTERVIEW, appointments, value: 1});
      });
    // dispatch({type: SET_INTERVIEW, appointment, appointments, value: 1});
  };

  return { state, setDay, bookInterview, cancelInterview }
};