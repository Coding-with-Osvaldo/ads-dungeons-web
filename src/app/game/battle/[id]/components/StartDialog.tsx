import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function StartDialog({
  open,
  handleAccept,
  handleCancel,
}
  :
  {
    open: boolean,
    handleAccept: Function,
    handleCancel: Function,
  }
) {

  return (
    <>
      <Dialog
        open={open}
        onClose={() => { handleCancel() }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Iniciando nova batalha"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Sua partida começará em breve
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => { handleAccept() }}>Ok</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
