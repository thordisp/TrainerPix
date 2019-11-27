import React from 'react';
import { Redirect } from 'react-router-dom';
import ProgramForm from '../../components/programForm/ProgramForm';
import { Context } from '../../UserContext';

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
      <Context.Consumer>
        {({ authenticated }) => {
          return (
            <div>
              {authenticated && (
                <div className="form-container">
                  <ProgramForm
                    clients = {this.state.clients}
                    updateClients={this.updateClients}
                    updateClientId={this.updateClientId}
                  />
                </div>
              )}

              {!authenticated && (
                <Redirect to={{pathname: '/login', state: {from: this.props.location}}} />
              )}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default NewProgram