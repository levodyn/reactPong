import React, { Component } from 'react';

import Ball from './Ball';

class Field extends Component {

    constructor(props) {
        super(props);
        this.ball = React.createRef();
        this.state = {
            width: 1000,
            height: 500,
            ball: this.ball
        };
    }

    clickField = () => {
        this.ball.current.changeDirection();
    }

    getBallSpeed = () => {
        return this.ball.current.state.velocity.length
    }

    render() {
        let {width,height, ball} = this.state;

        let css = {
            field: {
                backgroundColor: 'black', 
                width: width,
                height: height,
                position: 'relative',
                border: '2px solid black',
                left: '25%'
            },
            velocityInput: {
                position: 'relative',
                color: 'white',
                top: -50,
                left: 0,
                backgroundColor: 'black', 
            }
        };
        return (
            <div className = "field" style={css.field}  onClick={this.clickField}>
                <Ball FieldWidth={width} FieldHeight = {height} ref={this.ball}/>
                <input style={css.velocityInput} type="text" defaultValue='' value={this.getBallSpeed} />
            </div>
        )
    }
}

export default Field;