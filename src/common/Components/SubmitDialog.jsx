import React from 'react'
import RegistrationPage from '../../pages/Auth/Registration/RegistrationPage'
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

function SubmitDialog({open = false, setOpen}) {

      const handleClose = () => {
        setOpen(false);
      };

    return (
        <Dialog
          fullScreen
          open={open}
          onClose={handleClose}
          TransitionComponent={Transition}
        >
            <RegistrationPage />
        </Dialog>
    )
}

export default SubmitDialog;