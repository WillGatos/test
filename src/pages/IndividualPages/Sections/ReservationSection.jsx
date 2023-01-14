import React from 'react'

function ReservationSection({
    individualService,
    reservationInput,
}) {
    const {
        allowReservation,
        contact,
    } = individualService;

  return (
    <>
        {allowReservation && contact.whatsApp &&
                    <div onClick={()=>{
                        reservationInput.current.scrollIntoView();
                    }}
                    className="p-2vw margin-top-3vh">
                        <button
                         onClick={()=>{
                            window.open("https://wa.me/" 
                            + individualService.contact.whatsApp 
                            + "?text=Esto es de Perxins")
                        }}
                        className='footerButton ReservationButton'>
                        Reservar ya mismo
                        </button>
                    </div>
                }
    </>
  )
}

export default ReservationSection