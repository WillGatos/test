import axios from "axios"

function notifyMe(title, body) {
    // Let's check if the browser supports notifications
    if (!("Notification" in window)) {
      alert("Su Navegador no permite Notificaciones");
    }
  
    // Let's check whether notification permissions have already been granted
    else if (Notification.permission === "granted") {
    }
  
    // Otherwise, we need to ask the user for permission
    else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(function (permission) {
        // If the user accepts, let's create a notification
        if (permission === "granted") {}
      });
    }
  
    // At last, if the user has denied notifications, and you
    // want to be respectful there is no need to bother them any more.
  }

export function getSubscription(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.getRegistration().then(
      async function(reg){
          const sub = await reg.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: 'BCLxpiLhNfddxSFJTU7MxHI8k4Ch4iaW6nfVeO1zTK_qPxOij9BX10ho20-BnupLGkXQnlgadJFHfgtqfriScrU'
          })
          const userId = localStorage.getItem("userId");
          await axios.patch(
            'http://localhost:3001/user/userNotificationSubscription',
            {userId, sub})
            .catch((e)=>console.log(e))
          }
        ).catch(e=>console.log(e))
  } else {
    alert("Su navegador no permite esta funcionalidad.")
  }
}


export default notifyMe