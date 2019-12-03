import React from "react";
import "./styles.scss";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
    );
    
  const save = function(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(()=> {
        transition(SHOW);
      })
      .catch((err) => {
        transition(ERROR_SAVE, true);
      })
  }

  const deleteInterview = function(id){
    transition(DELETING, true);
    props.cancelInterview(id)
      .then(() => {
        transition(EMPTY);
      })
      .catch((err) => {
        transition(ERROR_DELETE, true);
      })
  }

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === SHOW && props.interview && <Show 
        student={props.interview.student} 
        interviewer={props.interview.interviewer}
        onDelete={() => transition(CONFIRM)}
        onEdit={() => transition(EDIT)}
      />
      }
      {mode === CONFIRM && <Confirm message={"Are you sure you would like to delete?"} onCancel={back} onConfirm={() => deleteInterview(props.id)}/>}
      {mode === DELETING && <Status message={DELETING} />}
      {mode === SAVING && <Status message={SAVING} />}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && 
      <Form 
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back} />}
      {mode === EDIT && 
      <Form
        name={props.interview.student}
        interviewer={props.interview}
        interviewers={props.interviewers}
        onSave={save}
        onCancel={back} />}
      {mode === ERROR_SAVE && <Error message={"Error could not save appointment"} onClose={back} />}
      {mode === ERROR_DELETE && <Error message={"Error could not cancel appointment"} onClose={back} />}
    </article>
  );
}