import React from "react";
import { useHistory } from 'react-router-dom';
// import { PDFDownloadLink } from "@react-pdf/renderer";
// import { PdfDocument } from "./Movie";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '../button/Button';

import './ListProgram.scss';

import { newPin } from '../../api';

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#455a64',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
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

export default function ListProgram(props) {

  let history = useHistory();

  let exercise = props.exercise;

  const classes = useStyles();

  async function onClick (e) {
    e.preventDefault();

    // Create a random number for link.
    const generatePin = Math.floor(1000 + (9999 - 1000) * Math.random());

    const create = await newPin(generatePin, props.clientId);

    if(!create.ok) {
      console.log('Villa vid ad uppfaera pin');
    } else (
      console.log('Pin uppfaert.')
    );

    // Redirect a "/program/:clientID/view"
      history.push(`/program/${props.clientId}/view`);
  }

  return (
    <div className="listContainer">
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
      <div>
        <Button onClick={onClick}>Submit</Button>
      </div>
    </div>
  );
}