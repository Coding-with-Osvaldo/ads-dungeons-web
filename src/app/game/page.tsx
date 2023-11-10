"use client";
import CaracterSelect from "./components/CaracterSelect";
import { Button } from "@mui/material";
import useBasicSelectHook from "../hooks/useBasicSelectHook";
import useChangeNameHook from "../hooks/useChangeNameHook";
import handleSubmit from "../hooks/useSubmitCharacter";

export default function Game() { 

  const [characterClass1, handleClassChange1] = useBasicSelectHook();
  const [characterClass2, handleClassChange2] = useBasicSelectHook();
  const [characterClass3, handleClassChange3] = useBasicSelectHook();

  const [characterName1, handleNameChange1] = useChangeNameHook();
  const [characterName2, handleNameChange2] = useChangeNameHook();
  const [characterName3, handleNameChange3] = useChangeNameHook();

  return (
    <>
      <div className="bg-gray-100 h-screen md:overflow-y-hidden">
        <div className="flex flex-row gap-8 m-8">
          <CaracterSelect characterClass={characterClass1} handleClassChange={handleClassChange1} characterName={characterName1} handleNameChange={handleNameChange1}/>
          <CaracterSelect characterClass={characterClass2} handleClassChange={handleClassChange2} characterName={characterName2} handleNameChange={handleNameChange2}/>
          <CaracterSelect characterClass={characterClass3} handleClassChange={handleClassChange3} characterName={characterName3} handleNameChange={handleNameChange3}/>
        </div>
        <div className="flex justify-end m-8 pt-8">
          <Button
            onClick={() => { handleSubmit([{name: characterName1, class: characterClass1}, {name: characterName2, class: characterClass2}, {name: characterName3, class: characterClass3}]) }}
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
