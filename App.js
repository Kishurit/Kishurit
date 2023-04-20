import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import {NotificationContainer } from 'react-notifications';
import { useOnlineNotification } from './hooks/useOnline'

import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Menu from './Components/Menu';
import './App.css'
import "./style.css"
import OrgForm from './Components/orgform/OrgForm.jsx';

export default function App(props) {
  
  const history = createBrowserHistory();
  useOnlineNotification();

  return (
      <Router forceRefresh={false} basename='/' history={history}>
        <NotificationContainer/>
        <Menu/>
        <div style={{marginTop: "50px"}}>
        <Route render = {({ location }) => (
        <Switch location = { location }>
          <Route exact path='/' component={()=>{return <Home />}}/>
          <Route exact path='/neworg' component={()=>{return <OrgForm />}}/>
          <Route exact path='/About' component={()=>{return <About />}}/>
          <Route path='*' component={()=>{return <p>Null</p> }} status={404}/>
        </Switch>
        )} />
        </div>
      </Router>
  )
}


