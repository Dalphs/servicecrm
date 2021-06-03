import React, {useState} from 'react';
import './styles.css'
import CustomerCard from './CustomerCard'
import Navbar from './Navbar'
import UserForm from './UserForm'
let json = require('../customers.json')

const CustomerDashboard = () => {
    const[showUserInfo, setShowUserInfo] = useState(false)
    const[customerOnDisplay, setCustomerOnDisplay] = useState({})
    const [customers, setCustomers] = useState(json)
    const newUser = {
        "id":"",
        "firstname":"",
        "lastname":"",
        "street":"",
        "streetnumber":"",
        "zip":"",
        "city": "",
        "phone":"",
        "email":"",
        "intervalInside":"",
        "intervalOutside":"",
        "priceInside":"",
        "priceOutside":"",
        "nextvisit":"",
        "visits":[],
        "note":"",
        "created":""
    }

    let tableHeaders = ["Næste besøg", "Navn", "Adresse", "phone", "Interval ude/inde", "Pris ude/inde", "Sidste besøg", "Bemærkninger"]

    const getCustomer = (id) => {
        let result = false;
        customers.forEach(customer => {
            if(customer.id === id){
                result = {...customer}
            }
        })
        return result
    }
    console.log(getCustomer(1))
    let editUser = (id) =>{ 
        if (typeof id === "undefined") {
            setCustomerOnDisplay({...newUser})
        }else{
            setCustomerOnDisplay(getCustomer(id))
        }
        console.log(customerOnDisplay)
        setShowUserInfo(!showUserInfo)
    }

    const saveUser = (user) => {
        let oldCustomers = [...customers]
        let customerFound = false
        console.log(`looking for customer`)
        let newCustomers = []
        customers.forEach(customer => {
            if(customer.id === user.id){
                console.log(`found customer with id ${customer.id}`)
                customer = {...user};
                console.log(`new customer looks like this ${JSON.stringify(customers)}`)
                customerFound = true
            }
            newCustomers.push(customer)
        })
        if(!customerFound) {
            newCustomers = [...oldCustomers, {...user}]
        }
        setCustomers([
            ...newCustomers
        ])
    }
    
    
    return (
        <div>
            <Navbar editUser={editUser}></Navbar>
            <div className={`overlay ${showUserInfo ? "" : "hide"}`} onClick={() => editUser()}></div>
            <div id="editUserContainer" className={`${showUserInfo ? "" : "hide"}`}>
                <UserForm saveUser={saveUser} user={customerOnDisplay}></UserForm>
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
                return <CustomerCard customer={customer} editCustomer={editUser}></CustomerCard>
            })}
        </div>
    );
};

export default CustomerDashboard;