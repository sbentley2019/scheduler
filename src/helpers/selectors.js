const getAppointmentsByDay = function(state, day) {
  // A function that returns an array of appointments for a specific day
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
  let availInterviewers = [];
  for (let value of state.days) {
    if (value.name === day) {
      availInterviewers = value.interviewers;
    }
  }

  const result = [];
  for (let index of availInterviewers) {
    result.push(state.interviewers[index]);
  }
  return result;
};

module.exports = {
  getAppointmentsByDay,
  getInterview,
  getInterviewersByDay
};