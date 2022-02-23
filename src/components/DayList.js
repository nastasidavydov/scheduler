import React from "react";

import DayListItem from "./DayListItem";


export default function DayList(props) {
  const {days, day, setDay} = props;

  const daysList = days.map(dayInList => (
    <DayListItem 
    key={dayInList.id}
    name={dayInList.name}
    spots={dayInList.spots} 
    selected={dayInList.name === day}
    setDay={setDay}/>
  ));

 return (
   <ul>
     {daysList}
   </ul>
   );
}