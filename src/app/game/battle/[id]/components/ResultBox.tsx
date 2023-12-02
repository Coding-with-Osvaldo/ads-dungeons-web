import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export function ResultBox({
    open,
    handleClose,
    status,
    handleVictory
}: 
{
    open: boolean,
    handleClose: Function,
    status: boolean,
    handleVictory: Function
}
) {

  return (
    <>
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
          <Button onClick={() => {handleVictory(); handleClose()}}>Continuar</Button>
          <Button onClick={() => {handleClose()}}>Menu</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
