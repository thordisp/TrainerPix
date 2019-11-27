import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { PdfDocument } from "./Movie";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import './ListProgram.scss';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#bbdefb',
    color: '#000000',
  },
  body: {
    fontSize: 14,
    whiteSpace: 'normal',
    overflowWrap: true,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
}));

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#4f83cc',
      main: '#002f6c',
      dark: '#01579b',
      contrastText: '#ffffff',
    },
    secondary: {
      light: '#eeffff',
      main: '#bbdefb',
      dark: '#8aacc8',
      contrastText: '#000000',
    },
  },
});

export default function ListProgram(props) {

  let history = useHistory();
  let exercise = props.exercise;

  const classes = useStyles();

  async function onClick (e) {
    e.preventDefault();

    // Senda notanda áfram á "/program/:clientID/view", ásamt pin skjólstæðings.
      history.push(`/success/${props.clientId}`);
  }

  return (
    <div className="listContainer">
      <ThemeProvider theme={theme}>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Lotur</StyledTableCell>
                <StyledTableCell align="center">Endurtekningar</StyledTableCell>
                <StyledTableCell align="center">Lýsing</StyledTableCell>
                <StyledTableCell align="center">Upphafsstaða</StyledTableCell>
                <StyledTableCell align="center">Lokastaða</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {exercise.map((element, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell align="left">{element.sets}</StyledTableCell>
                  <StyledTableCell align="left">{element.reps}</StyledTableCell>
                  <StyledTableCell align="left">{element.description}</StyledTableCell>
                  <StyledTableCell align="right"><img alt="firstImage" src={element.image1} /></StyledTableCell>
                  <StyledTableCell align="right"><img alt="secondImage" src={element.image2} /></StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      <div className="button-container">
        <Button variant="contained" color="secondary" onClick={onClick}>Submit</Button>
      </div>
      </ThemeProvider>
    </div>
  );
}