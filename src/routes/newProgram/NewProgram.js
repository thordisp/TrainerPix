import React from 'react';
import ProgramForm from '../../components/programForm/ProgramForm';

import './NewProgram.scss';

class NewProgram extends React.Component {

  constructor(props) {
    super(props);

    this.updateClients = this.updateClients.bind(this);
    this.updateClientId = this.updateClientId.bind(this);

    this.state = {
      programId: 1,
      clients: [],
      clientId: 0
    };
  }

  updateClients(id, username) {
    this.setState(state => {
      const clients = state.clients.concat({ id: id, username: username });
      return {
        clients,
      };
    });
  }

  updateClientId(id) {
    this.setState({ clientId: id });
  }

  render() {
    return (
      <div className="form-container">
        <ProgramForm
          clients = {this.state.clients}
          updateClients={this.updateClients}
          updateClientId={this.updateClientId}
        />
      </div>
    )
  }
}

export default NewProgram