
export function getAppointmentsForDay(state, day) {
  let appoints = [];
  for (let appDay of state.days) {
    if (appDay.name === day) {
      appoints = appDay.appointments;
    }
  }

  const result = [];
  for (let index of appoints) {
    result.push(state.appointments[index]);
  }
  return result;
}