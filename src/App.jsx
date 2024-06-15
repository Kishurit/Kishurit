import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';

import { fetchData } from './store/slices/data-slice';

import Home from './Components/Home';
import About from './Components/About';
import Menu from './Components/Menu';
import NotFound from './Components/NotFound';
import OrgForm from './Components/orgform/OrgForm';
import Page from './Components/Page/Page';
import Footer from './Components/Footer';
import DbCat from './DB-Mangaer/Categories/DbCat';
import DbSubCat from './DB-Mangaer/SubCat/DbSubCat';

export default function App(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    console.clear();
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <>
      <NotificationContainer />
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/cat/:id" component={Home} />
          <Route exact path="/neworg" component={OrgForm} />
          <Route exact path="/about" component={About} />
          <Route path="/page" component={Page} />
          <Route path="/cat1234" component={DbCat} />
          <Route path="/subcat1234" component={DbSubCat} />
          <Route path="/*" component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </>
  );
}
