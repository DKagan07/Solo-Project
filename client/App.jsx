import React, { Component } from 'react';
import { render } from 'react-dom';
// import { MainContainer }  from './components/MainContainer'

//the overall app
class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <h1>Your Medicaiton List:</h1>
                <MainContainer />
            </div>
        )
    }
}

//main container to hold everything
class MainContainer extends Component {
    constructor() {
        super();
    }

    render () {
        return (
            <div>
                <AddMed />
                <MedContainer />
            </div>
        )
    }
}

//the area of main container in which user inputs medication name
    //goal is to fetch the API for medicaiton name and add it to the medication area
class AddMed extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p>insert form here for people to put in their medication name</p>
            </div>
        );
    }
}

//container which holds each medication card
class MedContainer extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <Meds />
            </div>
        );
    }
}

//the individual card in which will render in the MedContainer
    //this will hold the medication info
class Meds extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <p>fancy work to make med cards with inputed information from API</p>
            </div>
        );
    }
}

export { App };