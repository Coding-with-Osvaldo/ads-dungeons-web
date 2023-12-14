import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './style.css'

export function RankingPlayers({ rows }: { rows: { name: string, score: number }[] }) {
  return (
    <TableContainer component={Paper} sx={{ with: "400px" }} style={{ width: "50%" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow className='rowConfig'>
            <TableCell className='textDecoration' align='center'>Posição</TableCell>
            <TableCell className='textDecoration' align='center'>Usuario</TableCell>
            <TableCell className='textDecoration' align="center">Score</TableCell>
          </TableRow>
        </TableHead>
        <TableBody className='tableConfig'>
          {rows.map((row, index) => (
            <TableRow className='rowConfig'
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className='scorePoints' align="center">{index + 1}</TableCell>
              <TableCell className='userNames' align='center' component="th" scope="row">{row.name}</TableCell>
              <TableCell className='scorePoints' align="center">{row.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
