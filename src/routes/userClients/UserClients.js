import React from 'react';
import { Redirect } from 'react-router-dom';
import ListClients from '../../components/listClients/ListClients';
import { Context } from '../../UserContext';
import './UserClients.scss';

class UserClients extends React.Component {

  constructor(props) {
    super(props);

    this.updateClients = this.updateClients.bind(this);
    this.updateClientId = this.updateClientId.bind(this);

    this.state = {
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
            <div className="Container">
              {authenticated && (
                <div className="form-container">
                  <h2>Mínir Skjólstæðingar</h2>
                  <ListClients
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

export default UserClients