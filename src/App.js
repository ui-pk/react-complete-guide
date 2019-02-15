import React, { Component } from 'react';
import './App.css';
import Radium, { StyleRoot } from 'radium';
import Person from './Person/Person';

class App extends Component {
	state = {
		persons: [
			{ id: 'sqwerr', name: 'Praveen', age: 28 },
			{ id: 'sqw23', name: 'Udit', age: 27 },
			{ id: 'saer4q3', name: 'Aditya', age: 26 }
		],
		otherState: 'Some other values',
		showPersons: false
	};

	switchNameHandler = (newName) => {
		// DON'T DO THIS: this.state.persons[0].name = 'Bhasker';
		this.setState({
			persons: [
				{ name: newName, age: 28 },
				{ name: 'Udit', age: 22 },
				{ name: 'Aditya', age: 26 }
			]
		})
	};

	nameChangeHandler = (event, id) => {
		// console.log(event.target);
		const personIndex = this.state.persons.findIndex(p => {
			return p.id === id; //boolean
		})

		const person = {...this.state.persons[personIndex]};
		// console.log(person);

		// const person = Object.assign({}, this.state.persons[personIndex]); ALternative to above code

		person.name = event.target.value;
		// console.log(person.name);

		const persons = [...this.state.persons];
		persons[personIndex] = person;
		// console.log(persons[personIndex]);

		this.setState({
			persons: persons
		})
		// console.log(persons);
	}

	togglePersonHandler = () => {
		const doesShow = this.state.showPersons;
		this.setState({
			showPersons: !doesShow
		})
	}

	deletePersonHandler = (personIndex) => {
		// const persons = this.state.persons.slice();
		const persons = [...this.state.persons];
		persons.splice(personIndex, 1);
		console.log(persons);
		this.setState({
			persons: persons
		});
	}

	render() {
		const style = {
			backgroundColor: 'green',
			border: '1px solid blue',
			padding: '8px',
			cursor: 'pointer',
			color: 'white',
			transition: '0.3s all ease',
			':hover': {
				backgroundColor: 'lightgreen',
				color: 'black'
			}
		}

		let persons = null;

		if(this.state.showPersons){
			persons= (
				<div>
					{this.state.persons.map((person,index) => {
						return <Person
							click={() => this.deletePersonHandler(index)}
							name={person.name}
							age={person.age}
							key={person.id} 
							changed={(event) => this.nameChangeHandler(event, person.id)} />
					})}

					{/* <Person 
						name={this.state.persons[0].name} 
						age={this.state.persons[0].age} /> */}

					{/* use bind syntax for best practices */}
					{/* <Person 
						name={this.state.persons[1].name} 
						age={this.state.persons[1].age}
						click={this.switchNameHandler.bind(this,"Bhasker!")}
						changed={this.nameChangeHandler}>
						My Hobbies: Bakchodi
					</Person> */}
					{/* <Person 
						name={this.state.persons[2].name} 
						age={this.state.persons[2].age} /> */}
				</div>
			)

			style.backgroundColor = 'red';
			style[':hover'] = {
				backgroundColor: 'salmon',
				color: 'black'
			}
		}

		let classes = [];

		if(this.state.persons.length <= 2) {
			classes.push('red'); // classes = ['red']
		}
		if(this.state.persons.length <= 1) {
			classes.push('bold'); // classes = ['red', 'bold']
		}

		return (
			<StyleRoot>
				<div className="App">
					<h1>Hi , I am react App</h1>
					<p className={classes.join(' ')}>This is really working</p>
					<button 
						style={style}
						onClick={this.togglePersonHandler}>Toggle Person</button>
					{ persons }
					
				</div>
			</StyleRoot>
		);
	}
}

export default Radium(App);
