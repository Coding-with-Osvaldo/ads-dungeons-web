import { SelectChangeEvent, TextField } from "@mui/material";
import {BasicSelect} from "./BasicSelect";
import { ChangeEventHandler } from "react";
import Image from "next/image";

export function CaracterSelect
  ({
    characterClass,handleClassChange, characterName, handleNameChange}: {characterClass: string; handleClassChange: ((event: SelectChangeEvent<string>, child: React.ReactNode) => void) | undefined;characterName: string; handleNameChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined  
  }) {

  return (
    <div className="w-full">
      <div className="w-full pt-4 bg-gray-500">
        <Image
          alt="Character image"
          className="mx-auto bg-no-repeat bg-center flex-1 w-80 object-contain"
          src={characterClass ? "/" + characterClass + ".png" : "/Default.jpg"}
          width={characterClass ? 390 : 320}
          height={characterClass ? 390 : 240}
          priority
        />
      </div>
      <TextField
        value={characterName}
        onChange={handleNameChange}
        className="w-full pt-4 rounded-l-lg"
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
