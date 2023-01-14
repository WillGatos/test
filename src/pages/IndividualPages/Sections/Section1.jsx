import React from 'react'

function Section1({
    individualService,
    setOpenImageModal,
    setModalImage,
    searchIcon,
}) {
    const {
        name,
        principalImage,
    } = individualService;
  return (
    <>
        <div>
                    <div 
                        style={{marginBottom: "2vh", objectFit:"cover"}}
                        className='principalImageContainer'
                    >
                    <img onClick={()=>{
                        setOpenImageModal(true); 
                        setModalImage(principalImage);
                    }}
                    className="individualImage"
                    src={principalImage}
                    alt="Great Place"/>
                    </div>
                    <p className="font-size-25">{name}</p>
                    <p 
                        className="typeIndividualPage font-color-secondary" 
                        style={{marginBottom: "15px"}}
                    >
                        <img src={searchIcon(individualService)} alt="d"/></p>
                    {individualService.description &&
                    <div className='d-f f-d-c j-c-f-s' 
                    style={{
                        textAlign: "start",
                        background: "white",
                        color: "black",
                        minHeight: "200px",
                        paddingLeft: "15px",
                    }}>
                        
                        <>
                            <p className='font-size-20' style={{margin: "15px 0 15px 1rem"}}>
                                Descripción
                            </p>
                            <p className='descriptionIndividualPage' style={{marginLeft: "30px"}}>
                                {individualService.description}
                            </p>
                        </>
                        
                        
                        {individualService.typeOfMusicPlayed!=="Ninguno"&&
                        <div>
                            <p className='t-a-c'>Música: <span>{individualService.typeOfMusicPlayed}</span></p>
                        </div>}
                    </div>
                    }
                </div>
    </>
  )
}

export default Section1