import React from 'react';
import InterviewListItem from "./InterviewerListItem";
import "components/InterviewList.scss"

export default function InterviewList(props) {
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) =>
        <InterviewListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={props.value && interviewer.id === props.value}
          setInterviewer={event => props.onChange(interviewer.id)} 
          />
        )}
      </ul>
    </section>
  );
};