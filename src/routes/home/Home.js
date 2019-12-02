import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { Context } from '../../UserContext';
import Login from '../login/Login';
import ProgramForm from '../../components/programForm/ProgramForm';

import './Home.scss';

const styles = () => ({
  root: {
    padding: '20px',
    width: '40%',
  },
  login: {
    position: 'absolute',
  }
});

class Home extends React.Component {

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
    const { classes } = this.props;
    return (

      <Context.Consumer>
      {({ authenticated }) => {
        return (
          <div>
            {authenticated && (
              <div className="home-background">
                <Paper className={classes.root}>
                  <ProgramForm
                    clients = {this.state.clients}
                    updateClients={this.updateClients}
                    updateClientId={this.updateClientId}
                  />
                </Paper>
              </div>
            )}

            {!authenticated && (
              <div className="home-background">
                <Paper className={classes.root}>
                  <Login className={classes.login}/>
                </Paper>
              </div>
            )}
          </div>
        )
      }}
    </Context.Consumer>
    )
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);