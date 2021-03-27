import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/header'
import CreateUser from './components/createUser'
import CreateNote from './components/createNote'
import Notes from './components/notes'
import "bootstrap/dist/css/bootstrap.min.css";
ReactDOM.render(
  <React.StrictMode>
       <Router>
      <Header/>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/createNote" component={CreateNote} />
        <Route path="/createUser" component={CreateUser} />
        <Route path="/notes" component={Notes} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
