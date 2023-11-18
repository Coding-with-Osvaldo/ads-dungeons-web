import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export function BasicSelect({
  character,
  handleChange,
}: {
  character: string;
  handleChange:
    | ((event: SelectChangeEvent<string>, child: React.ReactNode) => void)
    | undefined;
}) {
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Classe</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={character}
          label="classe"
          onChange={handleChange}
        >
          <MenuItem value={"Mago"}>Mago</MenuItem>
          <MenuItem value={"Guerreiro"}>Guerreiro</MenuItem>
          <MenuItem value={"Atirador"}>Atirador</MenuItem>
          <MenuItem value={"Sacerdote"}>Sacerdote</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
