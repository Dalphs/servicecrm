import React, {useState} from 'react';
import './styles.css'
import CustomerCard from './CustomerCard'
import Navbar from './Navbar'
import UserForm from './UserForm'
import {Button, TextField} from '@material-ui/core';
let json = require('../customers.json')

const CustomerDashboard = () => {
    const [login, setLogin] = useState({username: "", password:""})
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

    const getWeekNumber = (unix) => {
        var date = new Date(unix);
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        var week1 = new Date(date.getFullYear(), 0, 4);
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
      }

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

    const sortCustomers = (sortBy) => {
        let customerArray = [...customers]
        customerArray.sort(function(a, b){
            if (typeof(a[sortBy]) === "number"){
                return a[sortBy] - b[sortBy]
            } else {
                console.log(a[sortBy] > b[sortBy])
                return a[sortBy] > b[sortBy] ? 1: -1
            }
        });
        console.log(customerArray)
        setCustomers(customerArray)
    }

    const jobDone = (id) => {
        let currentCustomers = [...customers];
        currentCustomers.forEach( customer => {
            if(customer.id === id){
                let nextVisit = new Date()
                let days = nextVisit.getDate() + customer.intervalOutside
                nextVisit.setDate(nextVisit.getDate() + Number(customer.intervalOutside) * 7)
                let nextVisitWeek = getWeekNumber(nextVisit.getTime())
                customer.nextvisit = nextVisitWeek
                customer.visits.push({timestamp: new Date().getTime()/1000})
            }
        })
        console.log(currentCustomers)
        setCustomers(currentCustomers)
    }
    let loggedIn = false;

    let handleSubmit = (e) => {
        e.preventDefault()
    }

    const onChange= (e) => {
        const value = e.target.value;
        console.log(`${e.target.name}: ${value}`)
        setLogin({
            ...login,
            [e.target.name]:value
        })
    }

    if (loggedIn){
    return (
        <div>
            <Navbar editUser={editUser} weeknumber={getWeekNumber(new Date())}></Navbar>
            <div className={`overlay ${showUserInfo ? "" : "hide"}`} onClick={() => editUser()}></div>
            <div id="editUserContainer" className={`${showUserInfo ? "" : "hide"}`}>
                <UserForm saveUser={saveUser} user={customerOnDisplay}></UserForm>
            </div>
            <div className="df-fdr dashboardHeader">
                <div className="customerCardText flex1" onClick={(() => sortCustomers("nextvisit"))}><p>{tableHeaders[0]}</p></div>
                <div className="customerCardText flex2" onClick={(() => sortCustomers("firstname"))}><p>{tableHeaders[1]}</p></div>
                <div className="customerCardText flex2"><p>{tableHeaders[2]}</p></div>
                <div className="customerCardText flex1"><p>{tableHeaders[3]}</p></div>
                <div className="customerCardText flex1"><p>{tableHeaders[4]}</p></div>
                <div className="customerCardText flex1"><p>{tableHeaders[5]}</p></div>
                <div className="customerCardText flex1"><p>{tableHeaders[6]}</p></div>
                <div className="customerCardText flex2"><p>{tableHeaders[7]}</p></div>
            </div>
            {customers.map((customer) => {
                return <CustomerCard customer={customer} editCustomer={editUser} jobDone={jobDone}></CustomerCard>
            })}
        </div>
    );
        } else {
            return(
            <div id="loginWrapper">
                <form onSubmit={handleSubmit}>
                    <TextField variant="outlined" label="Fornavn" name="username" onChange={onChange} value={login.firstname}/>
                    <TextField variant="outlined" label="Efternavn" name="password" type="password" onChange={onChange} value={login.lastname}/>
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
            )
        }
};

export default CustomerDashboard;