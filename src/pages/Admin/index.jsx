import React,{ useState } from "react";
import WrapperSection from "./WrapperSection";
import ServicesAccordion from "../../Components/Accordion/ServicesAccordion";
import UsersAccordion from "../../Components/Accordion/UsersAccordion";

function Admin() {
  const [adminWindow, setAdminWindow] = useState(0)
  const [allServices, setServices] = useState([])
  const [searchBarValue, setSearchBarValue] = useState("")

  const eventsRoutes = {
    getAllRoute: "https://api.perxins.com/events/findForAdmin",
    perxinsGiftRoute: "https://api.perxins.com/events/perxinsGift/",
    isPayingRoute: "https://api.perxins.com/events/isPaying/",
    updateRoute: '/updateevent/',
    deleteRoute : "https://api.perxins.com/events/admin/",
    getCountRoute: "https://api.perxins.com/events/count",
  }

  const servicesRoutes = {
    getAllRoute: "https://api.perxins.com/services/findForAdmin",
    perxinsGiftRoute: "https://api.perxins.com/services/perxinsGift/",
    isPayingRoute: "https://api.perxins.com/services/isPaying/",
    updateRoute: '/updateservice/',
    deleteRoute : "https://api.perxins.com/services/admin/",
    getCountRoute: "https://api.perxins.com/services/count",
  }

  const usersRoutes = {
    getAllRoute: "https://api.perxins.com/user/findForAdmin/",
    isAuthRoute: "https://api.perxins.com/user/changeAuth/",
    isAdminRoute: "https://api.perxins.com/user/changeAdmin/",
    getCountRoute: "https://api.perxins.com/user/count/",
  }

  const handleWindowChange = () =>{
    switch(adminWindow){
      case 0:
        return (<div>
        <WrapperSection
              routes={eventsRoutes}
              searchBarValue={searchBarValue}
              setAllEvents={setServices}
              setSearchBarValue={setSearchBarValue}
            >
            <ServicesAccordion
              services={allServices}
              routes={eventsRoutes}
              searchBarValue={searchBarValue}
            />
          </WrapperSection>
        </div>)

      case 1:
        return (
          <>
             <WrapperSection
                routes={servicesRoutes}
                searchBarValue={searchBarValue}
                setAllEvents={setServices}
                setSearchBarValue={setSearchBarValue}
                >
                  <ServicesAccordion
                   services={allServices}
                   routes={servicesRoutes}
                   searchBarValue={searchBarValue}
                />
                  </WrapperSection> 
          
          </>)

      case 2:
        return (
          <div>
            <WrapperSection
              routes={usersRoutes}
              searchBarValue={searchBarValue}
              setAllEvents={setServices}
              setSearchBarValue={setSearchBarValue}
            >
              <UsersAccordion
                users={allServices}
                routes={usersRoutes}
                searchBarValue={searchBarValue}
              />
            </WrapperSection>
          </div>
        )

      default:
        return <div>
                <p>Error en los Pasos a seguir</p>
               </div>
           }
    }

    const handleButtonOptions = (page) => {
      console.log("page" ,adminWindow)
      
      setAdminWindow(page)}

  return (
    <div style={{paddingTop: "65px"}}>
      <div className="d-f j-c-s-e">
        <button onClick={()=> handleButtonOptions(0)}>Eventos</button>
        <button onClick={()=> handleButtonOptions(1)}>Locales</button>
        <button onClick={()=> handleButtonOptions(2)}>Usuarios</button>
      </div>
      {handleWindowChange()}
    </div>
  )
}

export default Admin
/*
  ; */