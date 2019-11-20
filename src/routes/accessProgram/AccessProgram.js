import React from 'react';

import './AccessProgram.scss';
import PinView from '../../components/pinView/PinView';
import AllPrograms from '../../components/allPrograms/AllPrograms';

class ViewProgram extends React.Component {

  constructor(props) {
    super(props);

    this.updateClient = this.updateClient.bind(this);
    this.updateProgram = this.updateProgram.bind(this);
    this.updateProgramSelected = this.updateProgramSelected.bind(this);
    this.updatePinCorrect = this.updatePinCorrect.bind(this);
    this.updateSelectedProgram = this.updateSelectedProgram.bind(this);
    this.updateClientPrograms = this.updateClientPrograms.bind(this);

    this.state = {
      pinCorrect: false,
      selectedProgram: null,
      clientPrograms: [],
      exercise: [],
      programSelected: false,
      client: [],
      program: [],
    };
  }

  updateClient(id, name, email) {
    this.setState(state => {
      const client = state.client.concat({ id: id, name: name, email: email });
      return {
        client,
      };
    });
  }

  updateProgram(id, userId, clientId, name, link) {
    this.setState(state => {
      const program = state.program.concat({ id: id, userId: userId, clientId: clientId, name: name, link: link });
      return {
        program,
      };
    });
  }

  updateProgramSelected(selected) {
    this.setState({ programSelected: selected });
  }

  updateSelectedProgram(programId) {
    this.setState({ selectedProgram: programId });
  }

  updatePinCorrect(pinCorrect) {
    this.setState({ pinCorrect: pinCorrect });
  }

  updateClientPrograms(programId, name) {
    this.setState(state => {
      const clientPrograms = state.clientPrograms.concat({ programId: programId, name: name });
      return {
        clientPrograms,
      };
    });
  }

  render() {
    return (
      <div>
        {this.state.pinCorrect ? (
          <AllPrograms
            client={this.state.client}
            clientPrograms={this.state.clientPrograms}
            updateProgramSelected={this.updateProgramSelected}
            updateClientPrograms={this.updateClientPrograms}
            updateSelectedProgram={this.updateSelectedProgram}
          />
        ) : (
          <PinView
            updateClient={this.updateClient}
            updateProgram={this.updateProgram}
            updatePinCorrect={this.updatePinCorrect}
          />
        )}
      </div>
    )
  }
}

export default ViewProgram