import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export default function GeneralModal({
    title,
    modalOpenState=false,
    setModalOpenState,
    actionButton,
    children
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));


  const handleClose = () => {
    setModalOpenState(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={modalOpenState}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          {children}
        </DialogContent>
        <DialogActions>
          <button autoFocus style={{fontSize: "16px",
            background: "transparent",
            border: "0px"}}
             onClick={handleClose}>
            Cancelar
          </button>
          {actionButton&&
          <button  autoFocus onClick={handleClose}>
            Guardar
          </button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}