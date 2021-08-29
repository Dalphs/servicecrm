import React, {useState, useEffect} from 'react';
import { TextField, Button } from '@material-ui/core';

import AuthService from "../../services/auth.service";

function Register(props) {

  const [user, setUser] = useState({username: "", email: "", password: "", successful: false, message: ""}) 
    

  const onChangeUsername = function (e) {
    setUser({
      ...user, username: e.target.value
    });
  }

  const onChangeEmail = function (e) {
    setUser({
      ...user, email: e.target.value
    });
  }

  const onChangePassword = function (e) {
    setUser({
      ...user, password: e.target.value
    });
  }

  const handleRegister = function (e) {
    e.preventDefault();

    setUser({...user, 
      message: "",
      successful: false
    });
      AuthService.register(
        user.username,
        user.email,
        user.password
      ).then(
        response => {
          setUser({...user,
            message: response.data.message,
            successful: true
          });
        },
        error => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setUser({...user,
            successful: false,
            message: resMessage
          });
        }
      );
    }
  

  return (
    <div id="loginWrapper">
        <form onSubmit={handleRegister}>
                <TextField variant="outlined" label="Brugernavn" name="username" onChange={onChangeUsername} value={user.username}/>
                <TextField variant="outlined" label="Kodeord" name="password" type="password" onChange={onChangePassword} value={user.password}/>
                <TextField variant="outlined" label="E-mail" name="email" onChange={onChangeEmail} value={user.email}/>
                <Button
                variant="contained"
                color="primary"
                size="large"
                type="submit"
                >
                    Log in
            </Button>
            </form>
    </div>
);
  
}

export default Register