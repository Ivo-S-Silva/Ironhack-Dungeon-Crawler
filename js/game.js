class Game {
  constructor(createDomElement, drawDomElement) {
    this.player = null;
    this.gameBoard = document.getElementById("gameBoard");
    this.createDomElement = createDomElement;
    this.drawDomElement = drawDomElement;
    this.selectedLevel = levelOne;
    this.drawnLevel = drawnLevel;
    this.keysGrabbed = 0;
  }

  start() {
    this.heysGrabbed = 0;
    this.levelDesigner(this.selectedLevel);

    let intervalId = setInterval(() => {

    }, 10);
  
  }

  levelDesigner(selectedLevel) {
    for (let row = 0; row < selectedLevel.length; row++) {
      for (let column = 0; column < selectedLevel.length; column++) {
        switch (selectedLevel[row][column]) {
          case 0:
            const path = new Path();
            path.domElement = this.createDomElement("path");
            path.positionX = column * 80;
            path.positionY = row * 80;
            this.drawDomElement(path);
            drawnLevel[row].splice(column, 0, path);
            break;
          case 1:
            const wall = new Wall();
            wall.domElement = createDomElement("wall");
            wall.positionX = column * 80;
            wall.positionY = row * 80;
            drawDomElement(wall);
            drawnLevel[row].splice(column, 0, wall);
            break;
          case 2:
            const key = new Key();
            key.domElement = createDomElement("key");
            key.positionX = column * 80;
            key.positionY = row * 80;
            drawDomElement(key);
            // Mudar futuramente para em vez de wall ser o objeto enemy
            drawnLevel[row].splice(column, 0, key);
            break;
          case 3:
            this.player = new Player();
            this.player.domElement = createDomElement("player");
            this.player.positionX = column * 80;
            this.player.positionY = row * 80;
            drawDomElement(this.player);
            drawnLevel[row].splice(column, 0, this.player);
            break;
          case 4:
            const exit = new Exit();
            exit.domElement = createDomElement("exit");
            exit.positionX = column * 80;
            exit.positionY = row * 80;
            drawDomElement(exit);
            // Mudar futuramente para em vez de wall ser o objeto Exit
            drawnLevel[row].splice(column, 0, exit);
            break;
        }
      }
    }
  }

 

  pathingCollision(selectedLevel, direction) {
    /* Get player coordinates based on the level grid
    instead of the dom position */
    let x = this.player.positionX / 80;
    let y = this.player.positionY / 80;
    switch (direction) {
      case "left":
        switch (selectedLevel[y][x - 1]){
          case 1: return false;
          case 2:
            this.grabKey(this.drawnLevel[y][x - 1], this.drawnLevel);
            this.drawnLevel[y][x - 1] = 0;
            return true;
          default: return true;
        }
      case "right":
        switch (selectedLevel[y][x + 1]){
          case 1: return false;
          case 2:
            this.grabKey(this.drawnLevel[y][x + 1], this.drawnLevel);
            this.drawnLevel[y][x + 1] = 0;
            return true;
          default: return true;
        }
      case "up":
        switch (selectedLevel[y - 1][x]){
          case 1: return false;
          case 2:
            this.grabKey(this.drawnLevel[y - 1][x], this.drawnLevel);
            this.drawnLevel[y - 1][x] = 0;
            return true;
          default: return true;
        }
      case "down":
        switch (selectedLevel[y + 1][x]){
          case 1: return false;
          case 2:
            this.grabKey(this.drawnLevel[y + 1][x], this.drawnLevel);
            this.drawnLevel[y + 1][x] = 0;
            return true;
          default: return true;
        }
    }
  }

  enemyCollision(){

  }

  itemCollision(){

  }

  grabKey(key, drawnLevel){
    key.domElement.remove();
    this.keysGrabbed ++;
  }

  movePlayer(direction) {
    switch (direction) {
      case "left":
        if (this.pathingCollision(this.selectedLevel, "left")) {
          this.player.moveLeft();
        }
        break;
      case "right":
        if (this.pathingCollision(this.selectedLevel, "right")) {
          this.player.moveRight();
        }
        break;
      case "up":
        if (this.pathingCollision(this.selectedLevel, "up")) {
          this.player.moveUp();
        }
        break;
      case "down":
        if (this.pathingCollision(this.selectedLevel, "down")) {
          this.player.moveDown();
        }
        break;
    }
    this.drawDomElement(this.player);
  }
}

class Wall {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 80;
    this.width = 80;
    this.domElement = 0;
  }
}

class Path {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 80;
    this.width = 80;
    this.domElement = 0;
  }
}

class Exit {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 80;
    this.width = 80;
    this.domElement = 0;
  }
}

class Key {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 80;
    this.width = 80;
    this.domElement = 0;
  }
}

class Player {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 80;
    this.width = 80;
    this.domElement = 0;
  }

  moveRight() {
    this.positionX += 80;
  }

  moveLeft() {
    this.positionX -= 80;
  }

  moveUp() {
    this.positionY -= 80;
  }

  moveDown() {
    this.positionY += 80;
  }
}
