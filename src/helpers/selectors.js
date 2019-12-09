const getAppointmentsByDay = function(state, day) {
  // A function that returns an array of appointments for a specific day
  let appoints = state.days.find(appDay => appDay.name === day);
  if (!appoints) {
    return [];
  }
  appoints = appoints.appointments;

  const result = [];
  appoints.map(index => result.push(state.appointments[index]));

  return result;
};

const getInterview = function(state, interview) {
  // A function that returns an interview object in proper form
  if (!interview) {
    return null;
  }
  const appointment = {"student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]};
  return appointment;
};

const getInterviewersByDay = function(state, day) {
  // A function that returns an array of interviewers for a specified day
  let availInterviewers = state.days.find(value => value.name === day);
  if (!availInterviewers) {
    return [];
  }
  availInterviewers = availInterviewers.interviewers;

  const result = [];
  availInterviewers.map(index => result.push(state.interviewers[index]));

  return result;
};

module.exports = {
  getAppointmentsByDay,
  getInterview,
  getInterviewersByDay
};