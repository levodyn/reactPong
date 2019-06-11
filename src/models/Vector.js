class Vector {
    vx;
    vy;
    length;

    constructor (vx, vy, length) {
        //length needed for normalization
        let vectorLength = Math.sqrt(vx*vx+vy*vy);
        this.vx = vx / vectorLength;
        this.vy = vy / vectorLength;

        this.length = length;
    }

    inverse(axis) {
        if(axis === 'x') {
            this.vx *= -1;
        } else if(axis === 'y') {
            this.vy *= -1;
        }
    }

}

export default Vector;