import React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';

import ProgramView from '../../components/programView/ProgramView';

class ViewProgram extends React.Component {

  constructor(props) {
    super(props);

    const { match: { params } } = this.props;

    this.updateExercise = this.updateExercise.bind(this);

    this.state = {
      programId: params.programId,
      clientId: params.clientId,
      exercise: [],
    };
  }

  updateExercise(programId, sets, reps, description, image1, image2) {
    this.setState(state => {
      const exercise = state.exercise.concat({ programId: programId, sets: sets, reps: reps, description: description, image1: image1, image2: image2 });
      return {
        exercise,
      };
    });
  }

  render() {
    return (
      <div>
        {localStorage.getItem('pin') ? (
          <ProgramView
          programId={this.state.programId}
          clientId={this.state.clientId}
          exercise={this.state.exercise}
          updateExercise={this.updateExercise}
        />
        ) : (
          <div>
            <h2>Þú hefur ekki aðgang að þessari síðu, pin vantar.</h2>
            <NavLink exact to="/client/programs">
              <Button color="secondary">Skoða Æfingarprógramm</Button>
            </NavLink>
          </div>
        )}

      </div>
    )
  }
}

export default ViewProgram