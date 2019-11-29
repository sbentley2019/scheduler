import axios from "axios";
import { useEffect, useReducer } from "react";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

const reducer = function(state, action) {
  switch (action.type) {
    case SET_DAY:
      return {...state, day: action.day};
    case SET_APPLICATION_DATA:
      const arr = action.all;
      return {...state, days: arr[0].data, appointments: arr[1].data, interviewers: arr[2].data};
    case SET_INTERVIEW:
      return { ...state, appointments: action.appointments};
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
    return axios.put(`http://localhost:8001/api/appointments/${id}`, appointment)
    .then(() => {
      dispatch({type: SET_INTERVIEW, appointments});
    });
  };
  
  const cancelInterview = function(id) {
    const appointments = {
      ...state.appointments,
      [id]: {...state.appointments[id], interview: null}
    };
    return axios.delete(`http://localhost:8001/api/appointments/${id}`)
    .then(() => {
      dispatch({type: SET_INTERVIEW, appointments});
    })
  };

  return { state, setDay, bookInterview, cancelInterview }
};