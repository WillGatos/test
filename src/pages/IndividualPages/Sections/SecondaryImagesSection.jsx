import React from 'react'
import { LazyLoadImage } from 'react-lazy-load-image-component';

function SecondaryImagesSection({
    serviceOrEvent,
    individualService,
    setOpenImageModal,
    setModalImage,
    ChangeURL,
    }) {

    return (
    <>
    {(
                serviceOrEvent==="service" 
                && individualService.secondaryImages.length !== 0)
                &&
                <div style={{marginBottom: "3vh"}}>
                <div className="t-a-s font-color-white">
                    <p style={{ 
                    display: "inline",
                    background: "#0F83C3",
                    padding: "5px 5px 0 5px",
                    borderTopRightRadius: "15px",
                    marginLeft: "auto"}} className="t-a-s">Imagenes Secundarias </p>
                    <hr style={{color:"#0F83C3", height: "3px", background: "rgb(15, 131, 195)"}}/>
                </div>
                <div className='d-f secondaryImagesIndividualPage'>
                    {individualService.secondaryImages.map((e, key) => (
                        <div key={key} onClick={()=>{
                                setOpenImageModal(true);
                                setModalImage(e)
                            }}>
                            <LazyLoadImage
                                src={`http://res.cloudinary.com/dolzgvsos/image/upload/c_scale,h_450,w_350/v1/${serviceOrEvent==="service"?"service":"events"}/${ChangeURL(e)}`}
                                effect="blur"
                                />
                            
                            </div>
                    ))}
                ​</div>
                </div>}
                </>
  )
}

export default SecondaryImagesSection