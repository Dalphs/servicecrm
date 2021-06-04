import React from 'react';
import './styles.css'

function Navbar(props) {
    return (
        <div className="navbar df-fdr">
            <div></div>
            <div><h3>Uge: {props.weeknumber}</h3></div>
            <div id="lastNavbarItem"><button onClick={() => props.editUser()} className="newCustomerButton">Opret kunde</button></div>
        </div>
    );
}

export default Navbar;