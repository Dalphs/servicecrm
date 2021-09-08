import './App.css';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard'
import Login from './components/login/Login'
import Register from './components/login/Register'
import { Switch, Route, Redirect } from "react-router-dom";
import AuthService from "./services/auth.service"

//Returns true if JWT is expired or has less than 1 hour before expiration
function changeJwt (jwt) {
  let payload = buffer.from(jwt.split('.')[1], 'base64')
  const expiration = new Date(payload)

  return null
}

function requireAuth(nextState, replace, next) {
  if (!AuthService.getCurrentUser()) {
    replace({
      pathname: "/login",
      state: {nextPathname: nextState.location.pathname}
    });
  } else if (changeJwt) {
    AuthService.logout()
    replace({
      pathname: "/login",
      state: {nextPathname: nextState.location.pathname}
    });
  }
  next();
}

function App() {
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/dashboard"/>
        <Route path="/dashboard" component={CustomerDashboard} onEnter={requireAuth}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </div>
  );
}

export default App;
