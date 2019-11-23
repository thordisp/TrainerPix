import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';

import { getProgram } from './../../api';

export default function ListProgram(props) {

  let history = useHistory();
  let programs = props.clientPrograms;

  async function handleListItemClick(e, programId) {
    props.updateSelectedProgram(programId);
    props.updateProgramSelected(true);
    history.push(`/client/programs/${props.client[0].id}/${programId}`);
  }

  // Get all clients to appear in select menu.
  useEffect(() => {
    async function fetchData() {
      const result = await getProgram(props.client[0].id);
      for(let i = 0; i < result.data.length; i++) {
        props.updateClientPrograms(result.data[i].id, result.data[i].name);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="listContainer">
      <List component="nav" aria-label="main mailbox folders">
        {programs.map((element, index) =>
          <ListItem
            button
            onClick={event => handleListItemClick(event, element.programId)}
            key={index}
          >
            <ListItemIcon>
              <FitnessCenterIcon />
            </ListItemIcon>
            <ListItemText primary={element.name} />
          </ListItem>
          )}
      </List>
    </div>
  );
}