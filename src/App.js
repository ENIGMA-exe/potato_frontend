import React from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Login from './Pages/Login Page 2/Login2';
import HomePage from './Pages/home_page/HomePage';
import Profile from './Pages/profile/profile';
import Media from './Pages/Media Page/Media';
import Genres from './Pages/Generes Page/Genres';
import AboutUs from './Pages/About Page/About';


function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Login}/>
        <Route exact path='/home' component={HomePage}/>
        <Route exact path='/profile' component={Profile}/>
        <Route exact path='/media' component={Media}/>
        <Route exact path='/genres' component={Genres}/>
        <Route exact path='/aboutus/' component={AboutUs} />
      </Switch>
    </Router>
  );
}

export default App;
