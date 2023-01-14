import weekDay from "./weekDay"
import months from './monthsArray';

export function parseDays(days){
  return new Date(days.replace(/-/g, '\/').replace(/T.+/, ''));
}

export function eventsDaysFormate(eventsDays){
  const actualDate = parseDays(eventsDays);
  return (
  <>
    <span className="font-size-20">{`${actualDate.getDate()}`}</span>
    <span style={{fontSize: "15px"}}>{months[actualDate.getMonth()]}</span>
  </>
  )
}
export function getDayFromDateFormat(eventsDays){
  const actualDate = parseDays(eventsDays);
  return actualDate.getDate();

}

export function getMonthFromDateFormat(eventsDays){
  const actualDate = parseDays(eventsDays);
  return actualDate.getMonth();

}

const eventsDaysRendering = (props) =>{
  const {
    startDays,
    endDays,
    eventsDays,
    weekDays,
    continuesEventsStartDay,
    continuesEventsEndDay 
  } = props;

  if( continuesEventsEndDay) {
    return <>
    <div style={{width: "55px"}}>
      <span>{new Date(continuesEventsStartDay).getDate()} </span>
      /
      <span> {new Date(continuesEventsEndDay).getDate()}</span>
    </div>
    <p>{months[new Date(continuesEventsEndDay).getMonth()]}</p>
    </>
  }
    if(startDays){
      return <><span>{startDays}</span><span>-</span><span>{endDays}</span></>
    }
    if(eventsDays){
      return eventsDaysFormate(eventsDays)
    }
    if(weekDay){
      return <div className="d-f f-d-c"><span style={{fontSize: "10px"}}>CADA</span> <span>{weekDay[+weekDays]}</span></div>
    }
  }
export default eventsDaysRendering;