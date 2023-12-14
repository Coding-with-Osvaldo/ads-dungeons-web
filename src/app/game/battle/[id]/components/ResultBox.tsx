"use client"
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useRouter } from "next/navigation";

export function ResultBox({
    open,
    handleClose,
    status,
    handleVictory,
    handleDefeat
}: 
{
    open: boolean,
    handleClose: Function,
    status: boolean,
    handleVictory: Function,
    handleDefeat: Function
}
) {

  const router = useRouter()

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {handleClose(); handleDefeat();router.replace("/")}}
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
          <Button onClick={() => {handleClose(); handleDefeat();router.replace("/")}}>Desistir</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
