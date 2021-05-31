import React from 'react';
import './styles.css'

function Navbar(props) {
    return (
        <div className="navbar df-fdr">
            <div></div>
            <div></div>
            <div id="lastNavbarItem"><button onClick={() => props.editUser()} className="newCustomerButton">Opret kunde</button></div>
        </div>
    );
}

export default Navbar;