import React from 'react'

function GoogleMaps({principalStreet, secondaryStreet, province}) {
    const values = `${principalStreet}%20y%20${secondaryStreet},%20${province}`
    const valuesToLocation = values.replace(" ","%20") 
    return (
        <div className="mapouter">
{()=>{console.log("dwas",valuesToLocation)}}
                    <div className="gmap_canvas">
                        <iframe 
                            title='servicesMap'
                            width="100%"
                            height="500"
                            id="gmap_canvas"
                            src={`https://maps.google.com/maps?q=${valuesToLocation}&t=&z=13&ie=UTF8&iwloc=&output=embed`} 
                            frameBorder="0"
                            scrolling="no"
                            marginHeight="0"
                            marginWidth="0"></iframe>
                            <a href="https://putlocker-is.org">Anchors</a>
                            <br/>
                            <a href="https://www.embedgooglemap.net">how to copy and paste google maps</a>
                </div>
                </div>
    )
}

export default GoogleMaps
