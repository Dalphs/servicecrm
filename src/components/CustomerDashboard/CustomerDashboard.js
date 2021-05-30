import React from 'react';
import './styles.css'
import CustomerCard from './CustomerCard'

const CustomerDashboard = () => {
    let json = require('../customers.json')
    let tableHeaders = ["Næste besøg", "Navn", "Adresse", "Telefon", "E-mail", "Interval ude/inde", "Pris ude/inde", "Sidste besøg", "Bemærkninger"]
    
    console.log(json)
    return (
        <div>
            <div className="df-fdr dashboardHeader">
                {tableHeaders.map((header) => {
                    return (
                        <p>
                            {header}
                        </p>
                    )
                })}
            </div>
            {json.map((customer) => {
                return <CustomerCard customer={customer}></CustomerCard>
            })}
        </div>
    );
};

export default CustomerDashboard;