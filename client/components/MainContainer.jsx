import React, { Component } from 'react';
import { AddMed } from './AddMed.jsx';
import { MedContainer } from './MedContainer.jsx';


class MainContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div className='addMedContainer'>
                <AddMed />
                <div className='medCards'>
                    <MedContainer />
                </div>
            </div>
        )
    }
}

export { MainContainer };