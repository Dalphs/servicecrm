import React from 'react';
import { Button } from '@material-ui/core';
import ExitToApp from '@material-ui/icons/ExitToApp';
import AuthService from "../../services/auth.service"
import {useHistory } from "react-router-dom";
import './styles.css'

function Navbar(props) {
    const history = useHistory(); 
    let logout = () => {
        AuthService.logout()
        history.push("/login");
    }

    return (
        <div className="navbar df-fdr">
            <div><Button
                    variant="contained"
                    color="primary"
                    size="large"
                    startIcon={<ExitToApp />}
                    onClick={logout}
                    >
                        Logout
                </Button></div>
            <div><h3>Uge: {props.weeknumber}</h3></div>
            <div id="lastNavbarItem"><button onClick={() => props.editUser()} className="newCustomerButton">Opret kunde</button></div>
        </div>
    );
}

export default Navbar;