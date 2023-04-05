import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Menu from './Components/Menu';
import './App.css'
import "./style.css"

export default function App(props) {
  
  const history = createBrowserHistory();

  return (
      <Router forceRefresh={false} basename={process.env.PUBLIC_URL} history={history}>
        <Menu/>
        <div style={{marginTop: "50px"}}>
        <Route render = {({ location }) => (
        <Switch location = { location }>
          <Route exact path='/' component={()=>{return <Home />}}/>
          <Route exact path='/About' component={()=>{return <About />}}/>
          <Route exact path='*' component={()=>{return <p>Null</p> }} status={404}/>
        </Switch>
        )} />
        </div>
      </Router>
  )
}


