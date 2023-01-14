import {useState, useEffect} from "react";
import RegistrationForm from "./Components/RegistrationForm";
import Verification from "./Components/Verification";
import { gapi } from 'gapi-script';
import {GoogleOAuthProvider} from '@react-oauth/google';

function RegistrationPage() {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
    verificationCode: "",
  })
  const [changeOfPage, setChangeOfPage] = useState(true)

 useEffect(()=>{
    /*global google*/
    function start() {
      gapi.client.init({
        clientId: '817378467594-gtmls3s1qe9896q1gj93begc7hqi995f.apps.googleusercontent.com',
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);

  },[])

  return (
    <GoogleOAuthProvider 
      clientId='817378467594-gtmls3s1qe9896q1gj93begc7hqi995f.apps.googleusercontent.com' 
    >
    <>
    {changeOfPage?
    <RegistrationForm
        formValues    ={formValues}
        setFormValues ={setFormValues}
        setChangeOfPage={setChangeOfPage}
    />
    :
    <Verification
            formValues    ={formValues}
            setFormValues={setFormValues}
            setChangeOfPage={setChangeOfPage}
    />
    }
    </>
    </GoogleOAuthProvider>
  );
}

export default RegistrationPage;
/*  */
/*  */