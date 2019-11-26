import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "components/Button";

import DayListItem from "components/DayListItem";
import DayList from "components/DayList";
import InterviewerList from "components/InterviewList";
import InterviewerListItem from "components/InterviewerListItem";

storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

  storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} />
  ));

  const days = [
    {
      id: 1,
      name: "Monday",
      spots: 2,
    },
    {
      id: 2,
      name: "Tuesday",
      spots: 5,
    },
    {
      id: 3,
      name: "Wednesday",
      spots: 0,
    },
  ];
  
  storiesOf("DayList", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
    })
    .add("Monday", () => (
      <DayList days={days} day={"Monday"} setDay={action("setDay")} />
    ))
    .add("Tuesday", () => (
      <DayList days={days} day={"Tuesday"} setDay={action("setDay")} />
  ));


  const interviewer = {
    id: 1,
    name: "Sylvia Palmer",
    avatar: "https://i.imgur.com/LpaY82x.png"
  };
  
  storiesOf("InterviewerListItem", module)
    .addParameters({
      backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
    })
    .add("Unselected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
      />
    ))
    .add("Selected", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected
      />
    ))
    .add("Clickable", () => (
      <InterviewerListItem
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        setInterviewer={event => action("setInterviewer")(interviewer.id)}
      />
    ))


    storiesOf("Appointment", module)
    .addParameters({
      backgrounds: [{ name: "white", value: "#fff", default: true }]
    })
    .add("Appointment", () => <Appointment />)
    .add("Appointment with Time", () => <Appointment time="12pm" />)
    .add("Header", () => <Header time="12pm" />)
    .add("Empty", () => <Empty onAdd={action("onAdd")} />)
    .add("Show", () => {
    return (
      <Show 
        student="Lydia Miller-Jones"
        interviewer={interviewer}
        onEdit={action("onEdit")}
        onDelete={action("onDelete")}
      />
    );
  })
    .add("Confirm", () => {
      return(
      <Confirm 
        message="Delete the appointment?"
        onConfirm={action("onConfirm")}
        onCancel={action("onCancel")}
      />
      )
    })
    .add("Status", () => <Status message="Deleting" />)
    .add("Error", () => {
    return (
      <Error 
        message="Could not delete appointment." 
        onClose={action("onClose")} 
      />
    );
    })
    .add("Form Create", () => {
      return (
        <Form
          interviewers={interviewers}
          onSave={action("onSave")}
          onCancel={action("onCancel")} 
        />
      );
    })
    .add("Form Edit", () => {
      return(
      <Form 
        name={"Archie Cohen"} 
        interviewer={1}
        interviewers={interviewers}
        onSave={action("onSave")}
        onCancel={action("onCancel")}
        /> 
      )
    })
    .add("Appointment Empty", () => (
      <Fragment>
        <Appointment id={1} time="12pm" />
        <Appointment id="last" time="1pm" />
      </Fragment>
    )
    );
