"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, DialogContentText, Slide } from "@mui/material";

export default function BattleDialog({
  attack = 0,
  defense = 0,
  setAction,
  open,
  handleClose
}: {
  attack: number;
  defense: number;
  setAction: Function;
  open: boolean;
  handleClose: Function
}) {

  return (
    <>
      <Dialog
        open={open}
        onClose={() => {handleClose()}}
      >
        <DialogTitle className="bg-red-500">
          Escolha a próxima ação do seu Personagem:
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-center pt-3">
            Ataque = {attack} e Defesa = {defense}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex justify-center gap-5">
          <h1 onClick={() => { setAction("A");handleClose() }}>Atacar</h1>
          <h1 onClick={() => { setAction("X");handleClose() }}>Especial</h1>
          <h1 onClick={() => { setAction("P");handleClose() }}>Passar</h1>
        </DialogActions>
      </Dialog>
    </>
  );
}
