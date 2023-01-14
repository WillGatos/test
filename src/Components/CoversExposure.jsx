import React from 'react'

export default function CoversExposure(props) {
  const {ForMen,
      ForWomen,
      WorkingWithUs,
      Regular,
      ForFEU} = props.cover;
  return (
    <>
        {console.log()}
        {ForMen !== 0&&<span className="font-bold" style={{ marginLeft: "5px" }} >Hombres/{ForMen}CUP</span>}
        {ForWomen !== 0 &&<span className="font-bold" style={{ marginLeft: "5px" }} >Chicas/{ForWomen}CUP</span>}
        {WorkingWithUs !== 0 &&<span className="font-bold" style={{ marginLeft: "5px" }} >PerxinsGift/{WorkingWithUs}CUP</span>}
        {Regular !== 0 &&<span className="font-bold" style={{ marginLeft: "5px" }} >Cover/{Regular}CUP</span>}
        {ForFEU !== 0 &&<span className="font-bold" style={{ marginLeft: "5px" }} >FEU/{ForFEU}CUP</span>}
    </>
  )
}