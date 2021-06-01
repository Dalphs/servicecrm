import React, {useState} from 'react';
import './styles.css'
import CustomerCard from './CustomerCard'
import Navbar from './Navbar'
import UserForm from './UserForm'
let json = require('../customers.json')

const CustomerDashboard = () => {
    const[showUserInfo, setShowUserInfo] = useState(false)
    const [customers, setCustomers] = useState(json)

    let tableHeaders = ["Næste besøg", "Navn", "Adresse", "phone", "Interval ude/inde", "Pris ude/inde", "Sidste besøg", "Bemærkninger"]

    let editUser = () => setShowUserInfo(!showUserInfo)

    const saveUser = (user) => {
        console.log("savingUser")
        let oldCustomers = [...customers]
        let customerFound = false
        customers.forEach(customer => {
            if(customer.id === user.id){
                customer = {...user};
                customerFound = true
            }
        })
        if(!customerFound) {
            oldCustomers = [...oldCustomers, {...user}]
        }
        setCustomers([
            ...oldCustomers
        ])
    }
    
    return (
        <div>
            <Navbar editUser={editUser}></Navbar>
            <div className={`overlay ${showUserInfo ? "" : "hide"}`} onClick={() => editUser()}></div>
            <div id="editUserContainer" className={`${showUserInfo ? "" : "hide"}`}>
                <UserForm saveUser={saveUser}></UserForm>
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
            {customers.map((customer) => {
                return <CustomerCard customer={customer}></CustomerCard>
            })}
        </div>
    );
};

export default CustomerDashboard;