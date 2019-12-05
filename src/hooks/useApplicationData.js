import axios from "axios";
import { useEffect, useReducer } from "react";
import reducer, {
  SET_DAY,
  SET_APPLICATION_DATA,
  SET_INTERVIEW
} from "reducers/application";

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {day: "Monday", days: [], appointments: {}, interviewers: {}});

  const setDay = day => dispatch({type: SET_DAY, day});
  
  useEffect(() => {
    // Uses axios to retrieve all the data from the database and sends it to the reducer function.
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ]).then((all) => {
      dispatch({type: SET_APPLICATION_DATA, all});
    });
  }, [])
  
  const bookInterview = function(id, interview, isEdit) {
    // A function that takes in an id and an interview, then uses those values to make a axios put request.
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then((res) => {
        dispatch({type: SET_INTERVIEW, appointments, value: (isEdit ? 0 : -1)});
      });
  };
  
  const cancelInterview = function(id) {
    // A function that takes in an id and makes an axios delete request with that value.
    const appointments = {
      ...state.appointments,
      [id]: {...state.appointments[id], interview: null}
    };
    return axios.delete(`/api/appointments/${id}`)
      .then((res) => {
        dispatch({type: SET_INTERVIEW, appointments, value: 1});
      });
  };

  return { state, setDay, bookInterview, cancelInterview }
};