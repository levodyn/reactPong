import React, { Component } from 'react';
import { Animate } from 'react-move';
//import ballImage from '../data/images/ball.png';
import Vector from '../models/Vector';

class Ball extends Component {
    
    refreshRate = 25;
    maxTop = 95;

    constructor(props) {
        super(props);
        let velocity =  new Vector(1,1,40 * (this.refreshRate/1000));
        this.state = {
            left: 50,
            top: 50,
            velocity: velocity,
            ballWidth: 25,
            ballHeight: 25,
            duration: 300
        };
    }
    
    componentDidMount() {
       this.interval = setInterval(() => this.move(), this.refreshRate);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    move = () => {
        let {left, top, velocity} = this.state;

        if (this.isCollided()) {
          this.inverseVelocity()
        }

        left = this.maxMinAdjustment(
            left+(velocity.vx*velocity.length),
            0,
            100
        );        
        top = this.maxMinAdjustment(
            top-(velocity.vy*velocity.length),
            0,
            this.maxTop
        );       
        
        this.setState({
          left: left,
          top: top,
          velocity:velocity
        });

        
        this.props.setVelocityIndicator();
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

    isCollided()
    {
        let {left, top} = this.state;
        if(left <= 0 || left >= 100) {
            return true;
        } 
        if(top <= 0 || top >= this.maxTop) {
            return true;
        }

        return false;
    }

    inverseVelocity() {
        let {left, top, velocity} = this.state;
        if(left <= 0 || left >= 100) {
            velocity.inverse('x');
        } 
        if(top <= 0 || top >= this.maxTop) {
            velocity.inverse('y');
        } 
    }

    changeVelocityToRandomDirection() {
        let leftOrRight = Math.random() > 0.5 ? -1 : 1;
        let upOrDown = Math.random() > 0.5 ? -1 : 1;
        let newVelocity = new Vector(
            Math.random()*leftOrRight,
            Math.random()*upOrDown,
            this.state.velocity.length
        );
        
        this.setState({
          velocity: newVelocity
        });
    }

    getSpeed() {
        let {velocity} = this.state;
        return velocity.length / (this.refreshRate/1000)
    }

    setSpeed(speed) {
        let {velocity} = this.state;
        let newVelocity = new Vector(velocity.vx,velocity.vy,speed * (this.refreshRate/1000));
        this.setState({
            velocity: newVelocity
        });
    }

    render() {
      let { left, top, duration, ballWidth, ballHeight } = this.state;
      return (
            <Animate   
                duration={duration}
                easing='easeQuadIn' 
            >
                {data => (
                    <div
                        className = "ball"
                        style={{
                            top: `${top}%`,
                            left: `${left}%`,
                            position: 'relative',
                            width: `${ballWidth}px`,
                            height: `${ballHeight}px`,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            cursor: 'pointer',
                            backgroundColor: 'white'
                        }}
                    >
                    </div>
                )}
            </Animate>   
      );
    }
  }
  
  export default Ball;