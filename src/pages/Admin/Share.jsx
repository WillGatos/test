import axios from "axios"
import { useState,useEffect } from "react"
import Cards from "../../Components/Cards"
function Share() {

    const [todayCinemas, setTodayCinemas] = useState([])
    useEffect(()=>{
        const accessToken = localStorage.getItem("accessToken")
        axios.get( "http://localhost:3001/events/getEventsToday",
            {headers: {'Authorization': 'Bearer '+ accessToken}})
        .then((e)=>{
            setTodayCinemas(e.data)
        })
    },[])

    return (
        <div>
            <a target="_blank" href={`https://wa.me/+58419139?text=${todayCinemas.map(e=> {
                const startDate = new Date(e.time.continuesEventsStartDay);
                const endDate = new Date(e.time.continuesEventsEndDay);
                const eventDay = new Date(e.time.eventsDays)
                return (`🏛${e.exactDirection.placeToSetEvent}🏛%0a🎞${e.name}🎞%0a🕑${e.time.startHour}%0a📆${e.time.continuesEventsStartDay ? `${startDate.getDate()}/${startDate.getMonth() + 1} - ${endDate.getDate()}/${endDate.getMonth() + 1}` :`${eventDay.getDate()}/${eventDay.getMonth() + 1}`}%0a🧐Revisión%0a${e.reviewLink}%0a%0a`)
            })}`}>
                Share WhatsApp
            </a>
            
            <div>
                {todayCinemas.map(cine => (
                    <Cards
                        service={cine}
                        serviceOrEvent={"event"}
                    />
                ))}
            </div>
        </div>
    )
}

export default Share