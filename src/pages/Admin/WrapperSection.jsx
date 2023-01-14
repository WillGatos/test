import { useState, useEffect } from 'react'
import { TextField } from '@mui/material'
import axios from 'axios'

export default function WrapperSection({
  routes,
  setAllEvents,
  setSearchBarValue,
  searchBarValue,
  children
}) {
  const [countOfServices, setCountOfServices] = useState(0)

  const { getAllRoute, getCountRoute } = routes;

  useEffect(()=>{
    const accessToken = localStorage.getItem("accessToken")
        axios.get(getAllRoute,{
            headers: {'Authorization': 'Bearer '+ accessToken}
        })
        .then((response)=> {
            const visibleCombos = response.data
            setAllEvents     (visibleCombos)
        }).catch(e=> console.log(e))

      axios.get(getCountRoute)
      .then((response)=> {
          const visibleCombos = response.data
          setCountOfServices   (visibleCombos)
      }).catch(e=> console.log(e))
  },[])

  const handleData = (event) => setSearchBarValue(event.target.value);

  return (
    <div className='d-f j-c-c a-c-c f-d-c'>
      <div style={{margin: "15px"}} className='d-f j-c-s-b a-i-c'>
        <div>
        <p>Conteo:</p>
        <h1>{countOfServices}/300</h1>
        </div>

        <TextField 
          name={"nameOfTheCurrency"}
          sx={{ width : "300px" }}
          value={searchBarValue}
          label={"Filtrar Por Correo"}
          onChange={handleData}
          required
        />

        <h2></h2>
      </div>
      <div style={{width: "95%"}} className="flex justify-center align-center">
      {children}
      </div>



    </div>
  )
}