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
                <h1>Your Medication List:</h1>
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
            list: [],
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
        try {

            const url = "/" + medName;
            const data = await(fetch(url));
            const medData = await data.json()


            //getting generic_name and brand_name (string) and pharm_class (array), active_ingredients (array of objects);
            const { generic_name, brand_name, pharm_class } = medData.results[0];
            //getting dose ( array)
            const { strength } = medData.results[0].active_ingredients[0]
            //getting route (array)
            const route = medData.results[0].route[0]

            let activeIngArr = '';
            for (let i = 0; i < Object.values(medData.results[0].active_ingredients).length; i++) {
                activeIngArr += Object.values(medData.results[0].active_ingredients)[i].name + ', ';
            }

            const prevMed = {
                generic_name: generic_name,
                brand_name: brand_name,
                pharm_class: pharm_class,
                strength: strength,
                route: route,
                active_ingredients: activeIngArr,
            }

            const newList = [...this.state.list, prevMed ]

            //updating state
            this.setState({
                generic_name: generic_name,
                brand_name: brand_name,
                pharm_class: pharm_class,
                strength: strength,
                route: route,
                active_ingredients: activeIngArr,
                list: newList,
            })
        }
        catch{
            (err) => console.log('error for posting meds, ', err)
        }
            
    }

    render () {
        return (
            <div>
                <AddMed getMedicationInfo={this.getMedicationInfo} getValue={this.getValue} 
                generic_name={this.state.generic_name} brand_name={this.state.brand_name} pharm_class={this.state.pharm_class} strength={this.state.strength} route={this.state.route} listOfDrugs={this.state.listOfDrugs}/>
                <MedContainer 
                generic_name={this.state.generic_name} brand_name={this.state.brand_name} pharm_class={this.state.pharm_class} strength={this.state.strength} route={this.state.route} active_ingredients={this.state.active_ingredients} list={this.state.list}/>
            </div>
        )
    }
}

//the area of main container in which user inputs medication name
class AddMed extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <div>
                <label for='medName'>Brand name:</label> 
                <input type='text' id='medName' name='medName'></input>
                <button type='button' className='medSubmit' onClick={() => this.props.getMedicationInfo(this.props.getValue())}>Query Medication</button>
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

        const listOfMeds = [];
        for (let i = 0; i < this.props.list.length; i++){
            listOfMeds.push(<Meds generic_name={this.props.list[i].generic_name} brand_name={this.props.list[i].brand_name} pharm_class={this.props.list[i].pharm_class} 
                strength={this.props.list[i].strength} route={this.props.list[i].route} active_ingredients={this.props.list[i].active_ingredients} />)
        }

        return (
            <div>
                {listOfMeds}
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
        return (
            <div>
                <h3>{brand_name}</h3>
                <div>
                    <ul>
                        <li>Generic Name: {generic_name}</li>
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