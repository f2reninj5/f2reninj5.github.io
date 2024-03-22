
class Snowflake {

    constructor() {

        this.radius = random(0, 5);
        this.x = random(width);
        this.y = random(height);
        this.z = random(width);
        this.xRotate = random(radians(360));
        this.yRotate = random(radians(360));
        this.zRotate = random(radians(360));
    }

    draw() {

        translate(-(width / 2), -(height / 2), -(width / 2));
        translate(this.x, this.y, this.z);

        rotateX(this.xRotate);
        rotateY(this.yRotate);
        rotateZ(this.zRotate);

        cylinder(this.radius, 1);
    }

    fall() {

        this.x += random(-5, 5);
        this.y += random(0, 10);
        this.z += random(-5, 5);

        this.x = (this.x > width ? 0 : this.x);
        this.x = (this.x < 0 ? width : this.x);

        this.y = (this.y > height ? 0 : this.y);

        this.z = (this.z > width ? 0 : this.z);
        this.z = (this.z < 0 ? width : this.z);
    }
}

let snowflakes = [];

function setup() {

    createCanvas(400, 400, WEBGL);

    for (i = 0; i < 160; i++) {

        snowflakes.push(new Snowflake());
    }
}

function draw() {

    background(75, 110, 160);
    orbitControl();
    lights();

    // snowman
    push();

    rotateX(radians(frameCount) * 2);
    rotateY(radians(frameCount) * 2);
    rotateZ(radians(frameCount) * 2);

    noStroke();
    fill(255, 255, 255/*, 64*/);

    translate(0, -40, 0);

    // head
    push();

    translate(0, -70, 0);
    sphere(40, 10, 10);

    // nose
    push();

    fill(225, 145, 45);
    translate(0, 0, 50);
    rotateX(radians(90));
    cone(5, 40);
    pop();

    // hat
    push();

    fill(50, 45, 40);
    translate(0, -35, 0);
    cylinder(40, 5);

    translate(0, -30, 0);
    cylinder(30, 60);
    pop();
    pop();

    // torso
    push();

    translate(0, 0, 0);
    sphere(60, 10, 10);
    pop();

    // body
    push();

    translate(0, 100, 0);
    sphere(80, 10, 10);
    pop();
    pop();

    // snow
    push();

    noStroke();
    fill(255, 255, 255);

    snowflakes.forEach(snowflake => {

        snowflake.fall();

        push();

        snowflake.draw();
        pop();
    });
    pop();
}
