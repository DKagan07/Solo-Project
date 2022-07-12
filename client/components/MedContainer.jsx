import React, { Component } from 'react';
import Meds from './Meds.jsx'


class MedContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='medCards'>
                <h1>List of Medications: </h1>
                <Meds />
            </div>
        )
    }
}




export { MedContainer };