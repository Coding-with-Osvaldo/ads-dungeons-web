import { SelectChangeEvent } from "@mui/material";
import React from "react";

export default function useBasicSelectHook(): [
  character: string,
  handleChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined
] {
  const [character, setCharacter] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setCharacter(event.target.value as string);
  };

  return [character, handleChange];
}
