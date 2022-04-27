import React, { Component } from 'react';

import Ball from './Ball';

class Field extends Component {

    ball;

    constructor(props) {
        super(props);
        this.ball = React.createRef();
        this.velocityIndicator = React.createRef();
        this.speedIndicator = React.createRef();
        this.state = {
            width: 50,
            height: 50
        };
    }

    clickField = () => {
        this.ball.current.changeVelocityToRandomDirection();
    }

    setVelocityIndicator = () => {
        if(this.velocityIndicator.current) {
          this.velocityIndicator.current.value = `(${
              this.ball.current.state.velocity.vx.toPrecision(2)
            },${
                this.ball.current.state.velocity.vy.toPrecision(2)
            })`;
          this.speedIndicator.current.value = `${this.ball.current.getSpeed()} %/s`;

        }
    }

    render() {
        let {height} = this.state;

        let css = {
            field: {
                backgroundColor: 'black', 
                height: `${height}vh`,
                position: 'relative',
                border: '2px solid black',
                marginTop: '100px' 
            },
            velocityInput: {
                position: 'relative',
                color: 'white',
                backgroundColor: 'transparent', 
                border: '0px solid'
            }
        };
        return (
            <div className = "field col-12" style={css.field}  onClick={this.clickField}>
                <Ball
                    setVelocityIndicator = {this.setVelocityIndicator}
                    ref={this.ball}
                />
                <div>
                    <span style={css.velocityInput}>Speed: </span><input style={css.velocityInput} type="text" defaultValue='' ref={this.speedIndicator} />
                </div>
                <div>
                    <span style={css.velocityInput}>Velocity vector: </span><input style={css.velocityInput} type="text" defaultValue='' ref={this.velocityIndicator} />
                </div>

            </div>
        )
    }
}

export default Field;