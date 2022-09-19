const canvas = document.getElementById("canvas");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const c = canvas.getContext("2d"); // create a context

let mouse = {
  x: undefined,
  y: undefined,
};

document.addEventListener("mousemove", (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

// arc class
class AnimatedArc {
  constructor({
    xValue = 200,
    yValue = 200,
    acceleration = 1,
    yAcceleration = 1,
    radius = 40,
    color = "#000",
  }) {
    this.acceleration = acceleration;
    this.yAcceleration = yAcceleration;
    this.radius = radius;
    this.prevRadius = radius;
    this.color = color;
    this.yValue = yValue;
    this.xValue = xValue;
    this.animateNextFrame = true;
  }
  animate() {
    // check if the acceleration is correct
    if (
      this.xValue + this.radius > innerWidth ||
      this.xValue - this.radius < 0
    ) {
      if (this.xValue - this.radius < 0 && Math.sign(this.acceleration) == 1) {
        // pass
      } else {
        this.acceleration = -this.acceleration;
      }
    }
    if (
      this.yValue + this.radius > innerHeight ||
      this.yValue - this.radius < 0
    ) {
      this.yAcceleration = -this.yAcceleration;
    }
    // // calculate the x/yValue for the next frame
    this.xValue = this.xValue + this.acceleration;
    this.yValue = this.yValue + this.yAcceleration;
    // edit the radius if the mouse is close to the circle
    if (
      mouse.x <= this.xValue + 100 &&
      mouse.x >= this.xValue - 100 &&
      mouse.y <= this.yValue + 100 &&
      mouse.y >= this.yValue - 100
    ) {
      // increase the size of the circle
      if (this.radius < 50) {
        this.radius = this.radius + 5;
      }
      this.drawCircle();
    } else if (this.radius > this.prevRadius) {
      if (Math.sign(this.radius - 1) == -1) {
        this.radius = this.prevRadius;
      } else {
        this.radius = this.radius - (10 * this.radius) / 100;
      }

      this.drawCircle();
    } else {
      this.drawCircle();
    }
  }
  drawCircle() {
    // clear the canvas

    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.xValue, this.yValue, this.radius, Math.PI * 2, false);
    c.fill();
  }
  stopAnimation() {
    this.animateNextFrame = !this.animateNextFrame;
  }
}
// random colors
var colors = [
  "aqua",
  "black",
  "blue",
  "fuchsia",
  "gray",
  "green",
  "lime",
  "maroon",
  "navy",
  "olive",
  "orange",
  "purple",
  "red",
  "silver",
  "teal",
  "white",
  "yellow",
];
// background circles array
const circleArry = [];
let currentColor = 0;
// circles creator
for (var i = 0; i < 800; i++) {
  circleArry.push(
    new AnimatedArc({
      xValue: Math.random() * innerWidth,
      yValue: Math.random() * innerHeight,
      color: colors[currentColor],
      acceleration: Math.random() * 2,
      yAcceleration: Math.random() * 1,
      radius: Math.random() * 10 + 2,
    })
  );
  if (currentColor === 16) {
    currentColor = 0;
  }
  currentColor++;
}
// update animation
const startAnimation = () => {
  c.clearRect(0, 0, innerWidth, innerHeight);
  // create the rect
  for (var i = 0; i < circleArry.length; i++) {
    circleArry[i].animate();
  }
  requestAnimationFrame(startAnimation);
};
//start animation
startAnimation();
