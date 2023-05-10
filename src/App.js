import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { createBrowserHistory } from "history";
import {NotificationContainer } from 'react-notifications';

import { useOnlineNotification } from './hooks/useOnline'

import Home from './Components/Home.jsx'
import About from './Components/About.jsx'
import Menu from './Components/Menu';
import OrgForm from './Components/orgform/OrgForm.jsx';

import './App.css'
import "./style/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import Page from './Components/Page';
import { fetchData } from './store/slices/data-slice';
import Footer from './Components/Footer';


export default function App(props) {
  const windowSize = useRef(window.innerWidth);
  const dispatch = useDispatch ();
  const history = createBrowserHistory();
  useOnlineNotification();

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
          <Route path='/page/:cat/:subcat/:id' render={(match) => <Page {...match.match.params} />  } />
          <Route path='*' component={()=>{return <p className='uicontainer'>Null</p> }} status={404}/>
        </Switch>
        )} />

        <Footer />
    </Router>
  )
}


