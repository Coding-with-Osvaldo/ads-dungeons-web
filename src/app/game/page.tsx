"use client";
import CaracterSelect from "../components/CaracterSelect";
import { Button } from "@mui/material";
import useBasicSelectHook from "../hooks/useBasicSelectHook";
import useChangeNameHook from "../hooks/useChangeNameHook";
import handleSubmit from "../hooks/useSubmitCharacter";

export default function Game() {

  const [character1, handleChange1] = useBasicSelectHook();
  const [character2, handleChange2] = useBasicSelectHook();
  const [character3, handleChange3] = useBasicSelectHook();

  const [characterName1, handleNameChange1] = useChangeNameHook();
  const [characterName2, handleNameChange2] = useChangeNameHook();
  const [characterName3, handleNameChange3] = useChangeNameHook();

  return (
    <>
      <div className="bg-gray-100 h-screen md:overflow-y-hidden">
        <div className="flex flex-row gap-8 m-8">
          <CaracterSelect characterClass={character1} handleClassChange={handleChange1} characterName={characterName1} handleNameChange={handleNameChange1}/>
          <CaracterSelect characterClass={character2} handleClassChange={handleChange2} characterName={characterName2} handleNameChange={handleNameChange2}/>
          <CaracterSelect characterClass={character3} handleClassChange={handleChange3} characterName={characterName3} handleNameChange={handleNameChange3}/>
        </div>
        <div className="flex justify-end m-8 pt-8">
          <Button
            onClick={() => { handleSubmit(characterName1,characterName2, characterName3) }}
            className="px-16 py-4 rounded-full text-lg bg-gradient-to-tr 
                 from-green-500 to-green-800"
            variant="contained"
          >
            Jogar
          </Button>
        </div>
      </div>
    </>
  );
}
