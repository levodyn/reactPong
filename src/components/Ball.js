import React, { Component } from 'react';
import { Animate } from 'react-move';
import ballImage from '../data/images/ball.png';
import Vector from '../models/Vector';

class Ball extends Component {
    
    refreshRate = 25;

    constructor(props) {
        super(props);
        let velocity =  new Vector(1,1,1000 * (this.refreshRate/1000));
        this.state = {
            left: 250,
            top: 250,
            velocity: velocity,
            ballWidth: 50,
            ballHeight: 50,
            duration: 300,
        };
    }
    
    componentDidMount() {
        this.interval = setInterval(() => this.move(), this.refreshRate);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    move = () => {
        let {left, top, ballWidth, ballHeight, velocity} = this.state;

        velocity = this.calcNewVelocity(velocity);

        left = this.maxMinAdjustment(
            left+(velocity.vx*velocity.length),
            0,
            this.props.FieldWidth-ballWidth
        );        
        top = this.maxMinAdjustment(
            top-(velocity.vy*velocity.length),
            0,
            this.props.FieldHeight-ballHeight
        );       
        
        this.setState({
          left: left,
          top: top,
          velocity:velocity
        });
    }

    maxMinAdjustment(value, min, max) {
        if (value < min) {
            return min;
        } else if (value > max) {
            return max;
        } else {
            return value;
        }
    }

    calcNewVelocity(velocity) {
        let {left, ballWidth, top, ballHeight} = this.state;
        if(left <= 0 || left >= this.props.FieldWidth-ballWidth) {
            velocity.inverse('x');
        } 
        if(top <= 0 || top >= this.props.FieldHeight-ballHeight) {
            velocity.inverse('y');
        } 
        return velocity;
    }

    changeDirection() {
        let newVelocity = new Vector(
            Math.random(),
            Math.random(),
            this.state.velocity.length
        );
        
        this.setState({
          velocity: newVelocity
        });
    }

    render() {
      let { left, top, duration } = this.state;
      return (
        <div className="ball">
            <Animate   
                duration={duration}
                easing='easeQuadIn' 
            >
                {data => (
                    <div
                        style={{
                            transform: `translate(${left}px, ${top}px)`,
                            position: 'relative',
                            width: 50,
                            height: 50,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer'
                        }}
                    >
                        <img src={ballImage} alt=""/>
                    </div>
                )}
            </Animate>   
        </div>
      );
    }
  }
  
  export default Ball;