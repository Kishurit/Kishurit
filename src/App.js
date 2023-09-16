import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import {NotificationContainer } from 'react-notifications';

import { fetchData } from './store/slices/data-slice';

import Home from './Components/Home'
import About from './Components/About'
import Menu from './Components/Menu';
import OrgForm from './Components/orgform/OrgForm';
import Page from './Components/Page/Page';
import Footer from './Components/Footer';

import './App.css'
import "./style/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function App(props) {
  const windowSize = useRef(window.innerWidth);
  const dispatch = useDispatch ();
  const history = createBrowserHistory();

  useEffect(() => {
    //console.clear ();
    dispatch(fetchData());
}, [dispatch])

return (
      <Router forceRefresh={false} basename='/' history={history}>
        <NotificationContainer/>
        <Menu/>
       
        <Route render = {({ location }) => (
        <Switch location = { location }>
          <Route exact path='/' component={()=>{return <Home />}}/>
          <Route exact path='/neworg' component={()=>{return <OrgForm />}}/>
          <Route exact path='/About' component={()=>{return <About />}}/>
          <Route path='/page' render={(match) => <Page />  } />
          <Route path='*' component={()=>{return <p className='uicontainer'>Null</p> }} status={404}/>
        </Switch>
        )} />

        <Footer />
    </Router>
  )
}


