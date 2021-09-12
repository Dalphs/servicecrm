import './App.css';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard'
import Login from './components/login/Login'
import Register from './components/login/Register'
import { Switch, Route, Redirect} from "react-router-dom";
import AuthService from "./services/auth.service"

function App() {
  let isTokenValid = () => {
    let jwt = AuthService.getCurrentUser()
    let tokenIsValid = false
    if (jwt) { //
      let payload = JSON.parse(Buffer.from(jwt.accessToken.split('.')[1], 'base64')) // decoding payload in JWT
      const expiration = new Date(payload.exp*1000) //unix in miliseconds
      tokenIsValid = expiration > new Date() //returns true if valid
      if (!tokenIsValid) { // If token exists but is expired
        AuthService.logout()
      }

    }
    return tokenIsValid
  }

 
  return (
    <div className="App">
      <Switch>
        <Redirect exact from="/" to="/dashboard"/>
        <Route path="/dashboard" component={() => {return isTokenValid() ? <CustomerDashboard/> : <Redirect to="/login"/>}}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </div>
  );
}

export default App;
