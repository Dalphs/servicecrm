import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@material-ui/core';
import AuthService from "../../services/auth.service";
import { useHistory } from "react-router-dom";
import '../CustomerDashboard/styles.css'

function Login(props) {
    let history = useHistory()
    const [user, setUser] = useState({username: "", password: "", loading: false, message: ""}) //{username: "", password: "", loading: false, message: ""};

    const onChangeUsername= function (e) {
        setUser({
            ...user, username: e.target.value
        });
    }

    const onChangePassword= function (e) {
        setUser({
            ...user, password: e.target.value
        });
    }

    const handleLogin= function (e) {
        e.preventDefault();

        setUser({...user,
            message: "",
            loading: true
        });
        AuthService.login(user.username, user.password).then(
            () => {
                history.push("/dashboard");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setUser({...user, 
                    loading: false,
                    message: resMessage,
                    loginFailed : true
                });
            }
        );
        
    }

    return (
        <div id="loginWrapper">
            <form onSubmit={handleLogin}>
                    <TextField variant="outlined" label="Brugernavn" name="username" onChange={onChangeUsername} value={user.username} error={user.loginFailed}/>
                    <TextField variant="outlined" label="Kodeord" name="password" type="password" onChange={onChangePassword} value={user.password} error={user.loginFailed}/>
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
export default Login;