export const SET_DAY = "SET_DAY";
export const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
export const SET_INTERVIEW = "SET_INTERVIEW";

export default function reducer(state, action) {
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
      return { 
        ...state, 
        days: newDays, 
        appointments: action.appointments
      };
    default:
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
  }
};