import React, { Suspense } from 'react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';

import Loader from './Components/Loader/Loader';

//lazy Loading
const LandingPage = React.lazy(()=> import('./Pages/Landing_Page/Landing_page'))
const HomePage = React.lazy(()=> import('./Pages/home_page/HomePage'))
const Profile = React.lazy(()=> import('./Pages/profile/profile'))
const Media = React.lazy(()=> import('./Pages/Media Page/Media'))
const Genres = React.lazy(()=>import('./Pages/Generes Page/Genres'))
const AboutUs = React.lazy(()=>import('./Pages/About Page/About'))

function App() {
  return (
    <Suspense fallback={<Loader/>}>
      <Router>
        <Switch>
          <Route exact path='/' component={LandingPage}/>
          <Route exact path='/home' component={HomePage}/>
          <Route exact path='/profile' component={Profile}/>
          <Route exact path='/media' component={Media}/>
          <Route exact path='/genres' component={Genres}/>
          <Route exact path='/aboutus/' component={AboutUs} />
        </Switch>
      </Router>
    </Suspense>
  );
}

export default App;
