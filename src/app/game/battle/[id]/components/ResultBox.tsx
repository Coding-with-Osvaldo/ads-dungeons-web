import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function ResultBox({
    open,
    handleClickOpen,
    handleClose,
    status
}: 
{
    open: boolean,
    handleClickOpen: Function,
    handleClose: Function,
    status: boolean
}
) {

  return (
    <>
      <Button variant="outlined" onClick={() => {handleClickOpen()}}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={() => {handleClose()}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {status ? "Você venceu" : "Você perdeu"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Você deseja recomeçar, ou voltar para o menu?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {handleClose()}}>Continuar</Button>
          <Button onClick={() => {handleClose()}}>Menu</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
