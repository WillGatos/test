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
            <div>
                Share WhatsApp
            </div>
            {`${todayCinemas.map(e=>e.name)}`}
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