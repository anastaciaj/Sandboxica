let overlookZoom = 1;
let overlooked = false;
let overlookedPos;
let overlookedZoom = 1;
function overlook() {
  if (!overlooked) {
    let mw = 1 + -mouse.wheel/10;
    overlookZoom *= mw;
    overlookZoom = constrain(overlookZoom, 1, 1.5);
  }

  push();

  let bSize = height/game.length*overlookZoom;
  let size = createVector(bSize*game.length, bSize*game[0].length);

  //mouse vars
  if (!overlooked) {
    mx = -((width/2 - mouseX)/(4 - 2*overlookZoom) + width/2 - size.x/2) + mouseX;
    my = -((height/2 - mouseY)/(4 - 2*overlookZoom) + height/2 - size.y/2) + mouseY;
  }
  else {
    mx = -((width/2 - overlookedPos.x)/(4 - 2*overlookZoom) + width/2 - size.x/2) + overlookedPos.x;
    my = -((height/2 - overlookedPos.y)/(4 - 2*overlookZoom) + height/2 - size.y/2) + overlookedPos.y;
  }

  if (!overlooked) {
    translate((width/2 - mouseX)/(4 - 2*overlookZoom), (height/2 - mouseY)/(4 - 2*overlookZoom));
    translate(width/2 - size.x/2, height/2 - size.y/2);
  } else {
    translate((width/2 - overlookedPos.x)/(4 - 2*overlookZoom), (height/2 - overlookedPos.y)/(4 - 2*overlookZoom));
    translate(width/2, height/2);
    scale(overlookedZoom);
    translate(-size.x/2, -size.y/2);
    overlookedZoom = pow(overlookedZoom, 1.1);
    print(overlookedZoom);
  }

  for (x = 0; x < game.length; x++) {
    for (y = 0; y < game[0].length; y++) {
      let b = game[x][y];
      noStroke();
      fill(b.color, 50, 90);
      if (dist(x*bSize, y*bSize, mx, my) < 8*bSize) fill(b.color, 100, 100);
      else if (dist(x*bSize, y*bSize, mx, my) < 10*bSize) fill(b.color, 50, 50);
      rect(x*bSize, y*bSize, bSize, bSize);
    }
  }

  pop();

  if (mouse.tap && !overlooked) {
    overlooked = true;
    overlookedPos = createVector(mouseX, mouseY);
    overlookedZoom = 1.01;
  }

  if (overlookedZoom > 40) {
    overlookZoom = 1;
    overlooked = false;
    overlookedPos;
    overlookedZoom = 1;

    gs++;
  }
}



let welcomeReset = 60;
let welcomeCountdown = welcomeReset;
function welcomeScreen() {
  backgroundColor = color(0, 0, 0);

  fill(100);
  textSize(width/20);
  text('Welcome to Sandboxica.', width/2, height/2);

  welcomeCountdown--;

  if (welcomeCountdown < 0) {
    welcomeCountdown = welcomeReset;
    gs++;
  }
}




function runGame() {

}
