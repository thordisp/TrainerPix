import React from 'react';
import Helmet from 'react-helmet';
import { Route, Switch, withRouter } from 'react-router-dom';

import Header from './components/header/Header';

import Home from './routes/home/Home';
import About from './routes/about/About';
import NewProgram from './routes/newProgram/NewProgram';
import Register from './routes/register/Register';
import Login from './routes/login/Login';

import NotFound from './routes/system-pages/NotFound';

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
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route component={NotFound} />
          </Switch>
        </main>

      </div>
    </React.Fragment>
  );
}

export default withRouter(App);
