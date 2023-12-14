"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { DialogContent, DialogContentText, Slide } from "@mui/material";

export default function BattleDialog({
  setAction,
  open,
  handleClose,
  getCharacter
}: {
  setAction: Function;
  open: boolean;
  handleClose: Function,
  getCharacter: Function
}) {

  let character = getCharacter()

  return (
    <>
      <Dialog
        open={open}
        onClose={() => { setAction("P"); handleClose() }}
      >
        <DialogTitle className="bg-red-500">
          Escolha a próxima ação do seu Personagem:
        </DialogTitle>
        <DialogContent>
          <DialogContentText className="text-center pt-3">
            {`Personagem: ${character?.nome}, Classe: ${character?.type}`}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="flex justify-center gap-5">
          <h1 onClick={() => { setAction("A"); handleClose() }}>Atacar</h1>
          <h1 onClick={() => { setAction("X"); handleClose() }}>Especial</h1>
          <h1 onClick={() => { setAction("P"); handleClose() }}>Passar</h1>
        </DialogActions>
      </Dialog>
    </>
  );
}
