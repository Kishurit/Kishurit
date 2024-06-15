import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { fetchData } from './store/slices/data-slice';

import Home from './Components/Home'
import About from './Components/About'
import Menu from './Components/Menu';
import OrgForm from './Components/orgform/OrgForm';
import Page from './Components/Page/Page';
import Footer from './Components/Footer';
import DbCat from './DB-Mangaer/Categories/DbCat';
import DbSubCat from './DB-Mangaer/SubCat/DbSubCat'

import './App.css'
import "./style/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications/lib/notifications.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

export default function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.clear();
    dispatch(fetchData());
  }, [dispatch])

  return (
    <BrowserRouter basename="/">
      <NotificationContainer />
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/neworg" component={OrgForm} />
      <Route exact path="/about" component={About} />
      <Route path="/page" component={Page} />
      <Route path="/cat1234" component={DbCat} />
      <Route path="/subcat1234" component={DbSubCat} />
      <Route path="/*" render={() => <p className="uicontainer">Null</p>} />
      <Footer />
    </BrowserRouter>
  )
}


