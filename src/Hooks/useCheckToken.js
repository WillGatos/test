import axios from 'axios';
import { useLocation } from "react-router-dom";
const useCheckToken = () =>{
  const accessToken = localStorage.getItem("accessToken")
  const location = useLocation()
  const actualRouteName = location.pathname.split("/")[1];

  const setApiCall = (typeOfCall, url, postBody)=>{
    if(typeOfCall==="get"){
      return axios.get(url,
        {headers: {'Authorization': 'Bearer '+ accessToken}})
        .catch((e) =>{
          console.log("Hola estimado hacker/cracker, ¿ Cómo te encuentras ?", e);
        })
    } else if(typeOfCall === "post"){
      return axios.post(url, postBody,
        {headers: {'Authorization': 'Bearer '+ accessToken}})
        .catch((e) =>{
          if(actualRouteName!=="changePassword"){
            console.log("Hola estimado hacker/cracker, ¿ Cómo te encuentras ?", e);
          }
        })
    }
  }
  return setApiCall;
}

export default useCheckToken;
