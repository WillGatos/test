import React from 'react'

import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import ShareButtons from './ShareButtons';
function ShareModal({quote, url, hashtag, open, onClose}) {
  const currentUrl = window.location.href;
  const handleClose = () => {
    onClose();
  };

  const handleListItemClick = () => {
    onClose();
  };
    
    return (
  <>
    <Dialog onClose={handleClose} open={open} id="dialog">
      <div style={{background: "black", color: "white", border: "1px solid", width: "99%"}}>
      <DialogTitle>Compartir en:</DialogTitle>
      <DialogContent>
        <div onClick={handleListItemClick} id="shareButtons">
          <ShareButtons
          quote = {quote}
          currentUrl = {currentUrl}
          url = {url}
          hashtag= {hashtag}
          />
        </div>
      </DialogContent>
      </div>
    </Dialog>
  </>
    )
}

export default ShareModal;
