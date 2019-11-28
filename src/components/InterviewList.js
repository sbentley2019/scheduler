import React, { useState } from 'react';
import InterviewListItem from "./InterviewerListItem";
import "components/InterviewList.scss"

export default function InterviewList(props) {
  const [value, onChange] = useState(props.value);
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {props.interviewers.map((interviewer) =>
        <InterviewListItem
          key={interviewer.id}
          name={interviewer.name}
          avatar={interviewer.avatar}
          selected={interviewer.id === value}
          setInterviewer={event => onChange(interviewer.id)} 
          />
        )}
      </ul>
    </section>
  );
}