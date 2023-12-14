import { SelectChangeEvent, TextField } from "@mui/material";
import { BasicSelect } from "./BasicSelect";
import { ChangeEventHandler } from "react";
import Image from "next/image";
import '@/app/game/components/caracter.css'

export function CaracterSelect
  ({
    characterClass, handleClassChange, characterName, handleNameChange }: {
      characterClass: string; handleClassChange: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined; characterName: string; handleNameChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
    }) {

  return (
    <div className="w-full">
      <div className="bodySelect w-full pt-4 bg-gray-500">
        <Image
          alt="Character image"
          className="bodyCaracter mx-auto bg-no-repeat bg-center flex-1 w-80 object-contain"
          src={characterClass ? "/" + characterClass + ".png" : "/Default.png"}
          width={characterClass ? 390 : 320}
          height={characterClass ? 390 : 240}
          priority
        />
      </div>
      <TextField
        sx={{ input: { color: 'white' } }}
        value={characterName}
        onChange={handleNameChange}
        className="inputCharacter w-full pt-4  mt-4 rounded-l-lg"
        id="filled-basic"
        label="Nome do personagem"
        variant="filled"
      />
      <div className="pt-4">
        <BasicSelect character={characterClass} handleChange={handleClassChange} />
      </div>
    </div>
  );
}
