import React from 'react';
import "components/InterviewerListItem.scss"
import classNames from "classnames";

export default function InterviewerListItem(props) {
  const interviewClass = classNames("interviewers__item", {"interviewers__item--selected": props.selected});

  const imgClass = classNames("interviewers__item-image", {"interviewers__item--selected-image": props.selected});

  return (
    <li onClick={props.setInterviewer} className={interviewClass}>
      <img
        className={imgClass}
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );
}