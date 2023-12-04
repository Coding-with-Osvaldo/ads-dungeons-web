import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export function RankingPlayers({rows}:{rows: {name: string,score: number}[]}) {
  return (
    <TableContainer component={Paper} sx={{with: "400px"}} style={{ width: "50%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow style={{ backgroundColor: "gray" }}>
            <TableCell style={ { color: "white" } } align='center'>Usuario</TableCell>
            <TableCell style={ { color: "white" } } align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align='center' component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="center">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
