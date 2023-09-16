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
import DbCat from './DB-Mangaer/Categories/DbCat';
import DbSubCat from './DB-Mangaer/SubCat/DbSubCat';

import './App.css'
import "./style/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';
//import FadingLabel from './Components/FadingLabel';

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
        
        {/* <div style={{paddingTop: '50px'}}>
          <FadingLabel text="Pizdec" fadeDuration={10} />
          <div className="loader"></div>
        </div> */}
        
        <Route render = {({ location }) => (
        <Switch location = { location }>
          <Route exact path='/' component={()=>{return <Home />}}/>
          <Route exact path='/neworg' component={()=>{return <OrgForm />}}/>
          <Route exact path='/About' component={()=>{return <About />}}/>
          <Route path='/page' render={(match) => <Page />  } />
          {/* <Route path='/cat1234' render={(match) => <DbCat />  } />
          <Route path='/subcat1234' render={(match) => <DbSubCat />  } /> */}
          <Route path='*' component={()=>{return <p className='uicontainer'>Null</p> }} status={404}/>
        </Switch>
        )} />

        <Footer />
    </Router>
  )
}


