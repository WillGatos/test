import Facebook from "../SVG/Facebook.svg"
import Instagram from "../SVG/Instagram.png"
import Twitter from "../SVG/Twitter.svg"
import Mail from "../SVG/Mail"
import PhoneIcon from "../SVG/phone.jsx"
import React from 'react'
import WhatsApp from "../SVG/WhatsApp.svg"

function PagesFooter({
    individualService,
    children,
}) {
    const { 
    pageFootersName = "PERXINS",
    facebookLink = "",
    TwitterLink = "",
    InstagramLink = "",
    phone = "",
    email = "",
    whatsApp = "",
    } = individualService.contact;

    const footerRightContentArray = [
        {Link:TwitterLink, Icon:Twitter},

        {Link:facebookLink, Icon:Facebook},

        {Link:InstagramLink, Icon:Instagram},
    ]
    const areLinks = ()=>{
        return footerRightContentArray.some(e=> e.Link!=="")
    }

  return (
    <footer style={{paddingTop: "5px", background: "#0c0c0c"}}>
        <p className="t-a-c font-size-20 font-color-white" style={{ marginTop: "10px" }} >{pageFootersName}</p>
            <p className="t-a-c font-color-gray">Contactanos</p>
            <div className="d-f" style={{fontSize: "12px", minHeight: "20vh", justifyContent:"space-evenly"}}>
                <div className="d-f f-d-c font-color-white" style={{justifyContent:"space-evenly", alignItems: "flex-start"}}>
                    
                    {(phone && whatsApp) &&
                        <p >Contacto Directo</p>
                    }
                    
                    {phone &&
                    <a className="font-color-white" href={`tel:${phone}`}>
                        <div className="d-f t-a-c d-f j-c-c a-i-c">
                            <PhoneIcon /><span className="" style={{marginLeft: "10px"}}>{phone}</span> 
                        </div>
                    </a>
                    }
                    {console.log(whatsApp)}
                    {whatsApp &&
                    <div className="font-color-white" onClick={()=>{window.open("https://wa.me/" + whatsApp)}}>
                        <div className="d-f t-a-c d-f j-c-c a-i-c">
                            <img src={WhatsApp}alt=""/><span className="" style={{marginLeft: "10px"}}>{whatsApp}</span> 
                        </div>
                    </div>}
                    {email &&
                    <a className="font-color-white" href={`mailto:${email}`}>
                        <div className="d-f t-a-c d-f j-c-c a-i-c">
                            <Mail/><span className="" style={{marginLeft: "10px"}}>{email}</span> 
                        </div>
                    </a>}
                    <div style={{height: "19px"}}></div>
                </div>

              <div 
              className="d-f f-d-c font-color-white" 
              style={{alignItems: "flex-start", margin:"15px"}}>
                {areLinks()&&<p>Redes Sociales</p>}
                <div 
                className="d-f f-d-c j-c-s-b"
                style={{
                    marginTop: "15px",
                    height: "100px",
                }}
                >
                    {footerRightContentArray.map((e, key) =>
                    {return (e.Link !== "" &&
                    <div onClick={()=>window.open(e.Link)} key={key} className="font-color-white">
                        <div
                         style={{margin: "0px 0px 20px 0"}}
                         className="d-f t-a-c d-f j-c-c a-i-c">
                            <img src={e.Icon} alt=""/>
                        </div>
                    </div>)
                    })}
                </div>
              </div>
            </div>
            <div style={{ paddingBottom: "3vh"}}>
            {children}
            </div>
    </footer>
  )
}

export default PagesFooter