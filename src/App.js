import './App.css';
import CustomerDashboard from './components/CustomerDashboard/CustomerDashboard'
import Login from './components/login/Login'
import Register from './components/login/Register'
import { Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/dashboard" component={CustomerDashboard}></Route>
        <Route path="/login" component={Login}></Route>
        <Route path="/register" component={Register}></Route>
      </Switch>
    </div>
  );
}

export default App;
