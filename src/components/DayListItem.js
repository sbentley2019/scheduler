import React from "react";

import "components/DayListItem.scss";
import classNames from "classnames";

function formatSpots(num) {
  const spot = num === 1 ? "spot remaining" : "spots remaining";
  return `${num === 0 ? "no" : num} ${spot}`;
}

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {"day-list__item--selected": props.selected}, {"day-list__item--full": props.spots === 0});
  return (

    <li onClick={() => props.setDay(props.name)} className={dayClass} data-testid="day">
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}