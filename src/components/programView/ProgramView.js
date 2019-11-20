import React, { useEffect } from "react";
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import './ProgramView.scss';
import { getExercises } from './../../api';

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

  const classes = useStyles();

  let exercise = props.exercise;

  // Get all exercises for selected program.
  useEffect(() => {
    async function fetchData() {
      const result = await getExercises(props.clientId, props.programId);

      if(!result.ok) {
        console.log('Villa vid ad saekja aefingar');
      } else {
        for(let i = 0; i < result.data.length; i++) {
          props.updateExercise(
            props.programId,
            result.data[i].setnumber,
            result.data[i].repsnumber,
            result.data[i].workoutdescription,
            result.data[i].image1,
            result.data[i].image2 );
        }
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  window.onbeforeunload = function() {
    localStorage.removeItem('pin');
    return '';
  };


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
    </div>
  );
}