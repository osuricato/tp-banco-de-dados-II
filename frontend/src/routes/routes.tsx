import { Switch, Route, BrowserRouter } from 'react-router-dom'

// import Route from './Route'

import Welcome from '../pages/Welcome'
import Home from '../pages/Home';
import Login from '../pages/Login'
import Register from '../pages/Register'
import Listening from '../pages/Listing'
import Schedule from '../pages/Schedule'
import Profile from '../pages/Profile';
import Details from '../pages/Details';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Welcome} path="/" exact />
        <Route component={Home} path="/home" />
        <Route component={Login} path="/login" />
        <Route component={Register} path="/register" />
        <Route component={Listening} path="/listing" />
        <Route component={Schedule} path="/schedule" />
        <Route component={Profile} path="/profile" />
        <Route component={Details} path="/details/:id" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes