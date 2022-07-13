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

        this.state = {
            generic_name: '',
            brand_name: '',
            pharm_class: [],
            strength: '',
            route: '',
            active_ingredients: [],
        }

        //binding methods
        this.getValue = this.getValue.bind(this);
        this.getMedicationInfo = this.getMedicationInfo.bind(this);
    }

    getValue () {
        let inputValue = document.getElementById('medName').value;
        return inputValue;
    }


    async getMedicationInfo (medName) {

        console.log('ya clicked me');
        //     https://api.fda.gov/drug/ndc.json?search=generic_name:${medName}&limit=1
        const medData = await (await fetch(`https://api.fda.gov/drug/ndc.json?search=generic_name:${medName}&limit=1`)).json()

        //getting generic_name and brand_name (string) and pharm_class (array), active_ingredients (array of objects);
        const { generic_name, brand_name, pharm_class } = medData.results[0];
        //getting dose ( array)
        const { strength } = medData.results[0].active_ingredients[0]
        //getting route (array)
        const route = medData.results[0].route[0]

        // console.log('active ingredient 1: ', medData.results[0].active_ingredients[0].name, 'active ingredient 2: ', medData.results[0].active_ingredients[1].name)
        // console.log('strength, ', strength, 'active_ingredients: ', active_ingredients )

        let activeIngArr = '';
        for (let i = 0; i < Object.values(medData.results[0].active_ingredients).length; i++) {
            activeIngArr += Object.values(medData.results[0].active_ingredients)[i].name + ', ';
        }
        console.log(activeIngArr);

        this.setState({
            generic_name: generic_name,
            brand_name: brand_name,
            pharm_class: pharm_class,
            strength: strength,
            route: route,
            active_ingredients: activeIngArr,
        })

        console.log('state: ', this.state);

    }

    render () {
        return (
            <div>
                <AddMed getMedicationInfo={this.getMedicationInfo} getValue={this.getValue} 
                generic_name={this.state.generic_name} brand_name={this.state.brand_name} pharm_class={this.state.pharm_class} strength={this.state.strength} route={this.state.route} />
                <MedContainer 
                generic_name={this.state.generic_name} brand_name={this.state.brand_name} pharm_class={this.state.pharm_class} strength={this.state.strength} route={this.state.route} active_ingredients={this.state.active_ingredients}/>
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
                {/* <p>insert form here for people to put in their medication name</p> */}
                <label for='medName'>Medication:</label> 
                <input type='text' id='medName' name='medName'></input>
                <button type='button' className='medSubmit' onClick={() => console.log(this.props.getMedicationInfo(this.props.getValue()))}>Query Medication</button>
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
        // console.log('props in MedContainer: ', this.props)

        return (
            <div>
                <Meds generic_name={this.props.generic_name} brand_name={this.props.brand_name} pharm_class={this.props.pharm_class} strength={this.props.strength} route={this.props.route} active_ingredients={this.props.active_ingredients} />
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
        //destructuring information from this.props
        const { generic_name, brand_name, pharm_class, strength, route, active_ingredients} = this.props
        // console.log('in meds active ingredients: ', active_ingredients)

        return (
            <div>
                <h3>{generic_name}</h3>
                <div>
                    <ul>
                        <li>Brand Name: {brand_name}</li>
                        <li>What does it do?: {pharm_class}</li>
                        <li>Active ingredients: {active_ingredients}</li>
                        <li>Dose per pill: {strength}</li>
                        <li>Form of the medication: {route}</li>
                    </ul>
                </div>
                {/* <p>fancy work to make med cards with inputed information from API</p> */}
            </div>
        );
    }
}

export { App };