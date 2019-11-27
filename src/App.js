import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/header/Header';

import Home from './routes/home/Home';
import About from './routes/about/About';
import NewProgram from './routes/newProgram/NewProgram';
import NewExercise from './routes/newExercise/NewExercise';
import AccessProgram from './routes/accessProgram/AccessProgram';
import ViewProgram from './routes/viewProgram/ViewProgram';
import NewClient from './routes/newClient/NewClient';
import Register from './routes/register/Register';
import Login from './routes/login/Login';

import Success from './routes/system-pages/Success';
import NotFound from './routes/system-pages/NotFound';
import NoAccess from './routes/system-pages/NoAccess';

import './App.scss';

type Props = {
  location: Location;
};

function App(props: Props) {

  return (
    <React.Fragment>
      <Helmet defaultTitle="TrainerPix" titleTemplate="%s – TrainerPix" />

      <Header />

      <div className="app">

        <main className="main__content">
          <Switch location={props.location}>
            <Route path="/" exact component={Home} />
            <Route path="/about" exact component={About} />
            <Route path="/program" exact component={NewProgram} />
            <Route path="/program/:programId/add/:clientId" exact component={NewExercise} />
            <Route path="/client/programs" exact component={AccessProgram} />
            <Route path="/client/programs/:clientId" exact component={AccessProgram} />
            <Route path="/client/programs/:clientId/:programId" exact component={ViewProgram} />
            <Route path="/register" exact component={Register} />
            <Route authed={props.authed} path="/login" exact component={Login} />
            <Route path="/newClient" exact component={NewClient} />
            <Route path="/success/:clientId" exact component={Success} />
            <Route path="/access_denied" exact component={NoAccess} />
            <Route component={NotFound} />
          </Switch>
        </main>

      </div>
    </React.Fragment>
  );
}

export default withRouter(App);
