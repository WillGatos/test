const installPrompt = (deferredPrompt,displayOfInstallButton) =>{
    // hide our user interface that shows our A2HS button
    // addBtn.style.display = 'none';
    console.log(deferredPrompt)
    // Show the prompt
    deferredPrompt.current.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.current.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        displayOfInstallButton.current = 'none'
      } else {
        console.log('User dismissed the A2HS prompt');
      }
      deferredPrompt.current = null;
    });
  }
export default installPrompt;