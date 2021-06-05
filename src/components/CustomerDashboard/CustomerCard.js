import React, { useState } from 'react';
import './styles.css'
import { Button } from '@material-ui/core';

function CustomerCard(props) {
    const [show, setShow] = useState(false);
    let convertToDate = (unixTime) => {
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(unixTime * 1000).toLocaleDateString("da-DK", options);

    }
    console.log(props.customer)
    return (
        <div className="customerCard">

            <div className="df-fdr accordion" onClick={() => { setShow(!show) }}>
                <div className="customerCardText flex1"><p>{props.customer.nextvisit}</p></div>
                <div className="customerCardText flex2"><p>{`${props.customer.firstname} ${props.customer.lastname}`}</p></div>
                <div className="customerCardText flex2"><p>{`${props.customer.street} ${props.customer.streetnumber}, ${props.customer.zip} ${props.customer.city}`}</p></div>
                <div className="customerCardText flex1"><p>{props.customer.phone}</p></div>
                <div className="customerCardText flex1"><p>{`${props.customer.intervalOutside} / ${props.customer.intervalOutside}`}</p></div>
                <div className="customerCardText flex1"><p>{`${props.customer.priceOutside} / ${props.customer.priceInside}`}</p></div>
                <div className="customerCardText flex1"><p>{
                    props.customer.visits.length > 0 ? convertToDate(props.customer.visits[props.customer.visits.length - 1].timestamp) : "Ingen besøg"}
                </p></div>

                <div className="customerCardText flex2"><p>{props.customer.note}</p></div>
            </div>
            <div className={`df-fdr accordionContent ${show ? "" : "hide"}`}>
                <div className="customerCardText flex1"><p>{props.customer.email}</p></div>
                <div className="customerCardText flex1"><Button variant="contained" color="primary" onClick={() => {props.editCustomer(props.customer.id)}}>
                    Rediger kunde
                 </Button></div>
                 <div className="customerCardText flex1"><Button variant="contained" color="primary" onClick={() => {props.jobDone(props.customer.id)}}>
                    Job udført
                 </Button></div>

            </div>
        </div>

    );
}

export default CustomerCard;