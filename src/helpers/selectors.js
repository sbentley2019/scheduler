const getAppointmentsByDay = function(state, day) {
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

const getInterview = function(state, interview) {
  if (!interview) {
    return null;
  }
  const appointment = {"student": interview.student,
    "interviewer": state.interviewers[interview.interviewer]};
  return appointment;
}

const getInterviewersByDay = function(state, day) {
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
}

module.exports = {
  getAppointmentsByDay,
  getInterview,
  getInterviewersByDay
};