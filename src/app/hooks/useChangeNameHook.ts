import React, { ChangeEventHandler } from "react";

export default function useChangeNameHook(): [
  character: string,
  handleChange: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined
] {
  const [character, setCharacter] = React.useState("");

  const handleChange = (event: any) => {
    setCharacter(event.target.value as string);
  };

  return [character, handleChange];
}
