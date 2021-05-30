import React from 'react';
import './styles.css'

function CustomerCard(props) {

    return (

        <div class="df-fdr customerCard">
            <div className="customerCardText"><p>{props.customer.nextvisit}</p></div>
            <div className="customerCardText"><p>{`${props.customer.firstname} ${props.customer.lastname}`}</p></div>
            <div className="customerCardText"><p>{`${props.customer.street} ${props.customer.streetnumber}, ${props.customer.zip} ${props.customer.city}`}</p></div>
            <div className="customerCardText"><p>{props.customer.phone}</p></div>
            <div className="customerCardText"><p>{props.customer.email}</p></div>
            <div className="customerCardText"><p>{`${props.customer.intervalOutside} / ${props.customer.intervalOutside}`}</p></div>
            <div className="customerCardText"><p>{`${props.customer.priceOutside} / ${props.customer.priceInside}`}</p></div>
            <div className="customerCardText"><p>{props.customer.visits[props.customer.visits.length]}</p></div>
            <div className="customerCardText"><p>{props.customer.note}</p></div>
        </div>

    );
}

export default CustomerCard;