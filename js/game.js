class Game {
  constructor(createDomElement, drawDomElement) {
    this.player = null;
    this.gameBoard = document.getElementById("gameboard");
    this.createDomElement = createDomElement;
    this.drawDomElement = drawDomElement;
    this.selectedLevel = 1;
    this.currentLevel = levels[this.selectedLevel];
    this.drawnLevel = drawnLevel;
    this.keysGrabbed = 0;
    this.exitBlock = null;
  }

  start() {
    this.heysGrabbed = 0;
    this.levelDesigner(this.currentLevel);

    let intervalId = setInterval(() => {
      if (this.keysGrabbed === 3 && this.player.positionX === this.exitBlock.positionX && this.player.positionY === this.exitBlock.positionY){
        this.selectedLevel ++;
        this.currentLevel = levels[this.selectedLevel];
        this.gameBoard.innerHTML = "";

        this.levelDesigner(this.currentLevel);
        console.log(this.drawnLevel);
        this.keysGrabbed = 0;
      }
    }, 10);
  
  }

  levelDesigner(currentLevel) {
    for (let row = 0; row < currentLevel.length; row++) {
      for (let column = 0; column < currentLevel.length; column++) {
        switch (currentLevel[row][column]) {
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
            this.exitBlock = new Exit();
            this.exitBlock.domElement = createDomElement("exit");
            this.exitBlock.positionX = column * 80;
            this.exitBlock.positionY = row * 80;
            drawDomElement(this.exitBlock);
            drawnLevel[row].splice(column, 0, this.exitBlock);
            break;
        }
      }
    }
  }

 

  pathingCollision(currentLevel, direction) {
    /* Get player coordinates based on the level grid
    instead of the dom position */
    let x = this.player.positionX / 80;
    let y = this.player.positionY / 80;
    switch (direction) {
      case "left":
        switch (currentLevel[y][x - 1]){
          case 1: return false;
          case 2:
            this.grabKey(this.drawnLevel[y][x - 1]);
            this.currentLevel[y][x - 1] = 0;
            return true;
          default: return true;
        }
      case "right":
        switch (currentLevel[y][x + 1]){
          case 1: return false;
          case 2:
            this.grabKey(this.drawnLevel[y][x + 1]);
            this.currentLevel[y][x + 1] = 0;
            return true;
          default: return true;
        }
      case "up":
        switch (currentLevel[y - 1][x]){
          case 1: return false;
          case 2:
            this.grabKey(this.drawnLevel[y - 1][x]);
            this.currentLevel[y - 1][x] = 0;
            return true;
          default: return true;
        }
      case "down":
        switch (currentLevel[y + 1][x]){
          case 1: return false;
          case 2:
            this.grabKey(this.drawnLevel[y + 1][x]);
            this.currentLevel[y + 1][x] = 0;
            return true;
          default: return true;
        }
    }
  }

  enemyCollision(){

  }

  grabKey(key){
    key.domElement.remove();
    this.keysGrabbed ++;
  }

  movePlayer(direction) {
    switch (direction) {
      case "left":
        if (this.pathingCollision(this.currentLevel, "left")) {
          this.player.moveLeft();
        }
        break;
      case "right":
        if (this.pathingCollision(this.currentLevel, "right")) {
          this.player.moveRight();
        }
        break;
      case "up":
        if (this.pathingCollision(this.currentLevel, "up")) {
          this.player.moveUp();
        }
        break;
      case "down":
        if (this.pathingCollision(this.currentLevel, "down")) {
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
