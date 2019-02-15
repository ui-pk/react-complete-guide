import React from 'react';
import './Person.css';
import Radium from 'radium';

const person = (props) => {
    const style = {
        '@media (min-width:700px)': {
            width: '500px'
        }
    }
    return (
        <div className="person" style={style}>
            <p onClick={props.click}>My name is {props.name} and my age is {props.age} yrs</p>
            <p>
                {props.children}
            </p>
            <input className="in" type="text" onChange={props.changed} value={props.name} />
        </div>
    )
}

export default Radium(person);