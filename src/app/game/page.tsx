"use client";
import { CaracterSelect } from "./components/CaracterSelect";
import { Button, TextField } from "@mui/material";
import useBasicSelectHook from "../hooks/useBasicSelectHook";
import useChangeNameHook from "../hooks/useChangeNameHook";
import handleSubmit from "../hooks/useSubmitCharacter";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Game() { 

  const router = useRouter()

  const [characterClass1, handleClassChange1] = useBasicSelectHook();
  const [characterClass2, handleClassChange2] = useBasicSelectHook();
  const [characterClass3, handleClassChange3] = useBasicSelectHook();

  const [characterName1, handleNameChange1] = useChangeNameHook();
  const [characterName2, handleNameChange2] = useChangeNameHook();
  const [characterName3, handleNameChange3] = useChangeNameHook();

  const [name, setName] = useState("")

  return (
    <>
      <div className="bg-gray-100 h-screen md:overflow-y-hidden">
        <div className="flex flex-row gap-8 m-8">
          <CaracterSelect characterClass={characterClass1} handleClassChange={handleClassChange1} characterName={characterName1} handleNameChange={handleNameChange1}/>
          <CaracterSelect characterClass={characterClass2} handleClassChange={handleClassChange2} characterName={characterName2} handleNameChange={handleNameChange2}/>
          <CaracterSelect characterClass={characterClass3} handleClassChange={handleClassChange3} characterName={characterName3} handleNameChange={handleNameChange3}/>
        </div>
        <div className="flex justify-between m-8 pt-8">
          <TextField
            value={name}
            onChange={ (e) => { setName(e.target.value) }}
            className="w-70 pt-4 rounded-l-lg"
            id="filled-basic"
            label="Nome do usuário"
            variant="filled"
          />
          {/* Se possivel, mandar rotas pelo body ao inves da url */}
          <Button
            onClick={() => { handleSubmit(name,[{nome: characterName1, type: characterClass1.charAt(0)}, {nome: characterName2, type: characterClass2.charAt(0)}, {nome: characterName3, type: characterClass3.charAt(0)}]).then((id) => { router.replace(`/game/battle/${id}`) }) }}
            className="px-16 py-4 rounded-full text-lg bg-gradient-to-tr from-green-500 to-green-800"
            variant="contained"
          >
            Jogar
          </Button>
        </div>
      </div>
    </>
  );
}
