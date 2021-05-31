import React, {useState} from 'react';
import './styles.css'
import CustomerCard from './CustomerCard'
import Navbar from './Navbar'
import UserForm from './UserForm'

const CustomerDashboard = () => {
    const[showUserInfo, setShowUserInfo] = useState(false)

    let json = require('../customers.json')
    let tableHeaders = ["Næste besøg", "Navn", "Adresse", "phone", "Interval ude/inde", "Pris ude/inde", "Sidste besøg", "Bemærkninger"]

    let editUser = () => setShowUserInfo(!showUserInfo)
    
    return (
        <div>
            <Navbar editUser={editUser}></Navbar>
            <div class={`overlay ${showUserInfo ? "" : "hide"}`} onClick={() => editUser()}></div>
            <div id="editUserContainer" class={`${showUserInfo ? "" : "hide"}`}>
                <UserForm></UserForm>
            </div>
            <div className="df-fdr dashboardHeader">
                <div className="customerCardText flex1"><p>{tableHeaders[0]}</p></div>
                <div className="customerCardText flex2"><p>{tableHeaders[1]}</p></div>
                <div className="customerCardText flex2"><p>{tableHeaders[2]}</p></div>
                <div className="customerCardText flex1"><p>{tableHeaders[3]}</p></div>
                <div className="customerCardText flex1"><p>{tableHeaders[4]}</p></div>
                <div className="customerCardText flex1"><p>{tableHeaders[5]}</p></div>
                <div className="customerCardText flex1"><p>{tableHeaders[6]}</p></div>
                <div className="customerCardText flex2"><p>{tableHeaders[7]}</p></div>
            </div>
            {json.map((customer) => {
                return <CustomerCard customer={customer}></CustomerCard>
            })}
        </div>
    );
};

export default CustomerDashboard;