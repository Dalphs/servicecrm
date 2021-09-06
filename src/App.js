import './App.css';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard'
import Login from './components/login/Login'
import Register from './components/login/Register'
import { Switch, Route, Redirect } from "react-router-dom";
import AuthService from "./services/auth.service"

function requireAuth(nextState, replace, next) {
  if (!AuthService.getCurrentUser()) {
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
