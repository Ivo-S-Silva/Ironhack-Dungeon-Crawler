class Game {
  constructor(createDomElement, drawDomElement) {
    this.gameboard = document.getElementById("gameboard");
    this.currentLevelDom = document.getElementById("current-level");
    this.createDomElement = createDomElement;
    this.drawDomElement = drawDomElement;
    this.selectedLevel = 2;
    this.currentLevel = levels[this.selectedLevel];
    this.drawnLevel = drawnLevel;
    this.keysGrabbed = 0;
    this.keysArray = [];
    this.player = null;
    this.exitBlock = null;
    this.enemiesArray = [];
    this.exitArea = [];
    this.teleportArray = [];
  }

  start() {
    this.keysGrabbed = 0;
    this.levelDesigner(this.currentLevel);

    let moveCounter = 0;

    let intervalId = setInterval(() => {
      //function to change the exit display to open and exit functionality
      if (this.keysGrabbed >= 6) {
        this.exitArea.forEach((element) => {
          element.domElement.className = "exit-open";
        });

        // Function to transfer to the next level
        this.exitArea.forEach((element) => {

             if (
              this.player.positionX < element.positionX + element.width &&
              this.player.positionX + this.player.width >element.positionX &&
              this.player.positionY < element.positionY + element.height &&
              this.player.height + this.player.positionY >element.positionY
            ) {
              this.selectedLevel++;
              this.resetBoard();
            }
        });
      }

      // Time management for enemy movement
      if (moveCounter === 10) {
        this.enemiesArray.forEach((enemy) =>{
          this.moveEnemy(enemy, this.currentLevel);
        }
        );
        moveCounter = 0;
      }
      moveCounter++;

      // enemy-player collision detection - function calling
      this.enemiesArray.forEach((enemy) =>{
        this.playerEnemyCollision(enemy);
      }
      );

      // player-teleport location detection and functionality
      this.teleportPlayer();
      
    }, 10);
  }

  resetBoard() {
    this.currentLevel = levels[this.selectedLevel];
    this.gameboard.innerHTML = "";
    this.drawnLevel = drawnLevel;
    this.enemiesArray = [];
    this.exitArea = [];
    this.keysGrabbed = 0;
    //resetting key position and availability
    this.keysArray.forEach(key => {
      this.currentLevel[key.positionY / 40][key.positionX / 40] = 2;
    })
    this.keysArray = [];
    this.levelDesigner(this.currentLevel);
  }

  playerEnemyCollision(enemy){
    if (
      this.player.positionX < enemy.positionX + enemy.width &&
      this.player.positionX + this.player.width >enemy.positionX &&
      this.player.positionY < enemy.positionY + enemy.height &&
      this.player.height + this.player.positionY >enemy.positionY
    ) { this.resetBoard() }
  }

  levelDesigner(currentLevel) {
    this.currentLevelDom.innerText = this.selectedLevel;
    
    for (let row = 0; row < currentLevel.length; row++) {
      for (let column = 0; column < currentLevel.length; column++) {
        switch (currentLevel[row][column]) {
          case 0:
            const path = new Path();
            path.domElement = this.createDomElement("path");
            path.positionX = column * 40;
            path.positionY = row * 40;
            this.drawDomElement(path);
            this.drawnLevel[row].splice(column, 0, path);
            break;
          case 1:
            const wall = new Wall();
            wall.domElement = createDomElement("wall");
            wall.positionX = column * 40;
            wall.positionY = row * 40;
            this.drawDomElement(wall);
            this.drawnLevel[row].splice(column, 0, wall);
            break;
          case 2:
            const key = new Key();
            key.domElement = createDomElement("key");
            key.positionX = column * 40;
            key.positionY = row * 40;
            this.drawDomElement(key);
            this.drawnLevel[row].splice(column, 0, key);
            this.keysArray.push(key);
            break;
          case 3:
            this.player = new Player();
            this.player.domElement = createDomElement("player");
            this.player.positionX = column * 40;
            this.player.positionY = row * 40;
            this.drawDomElement(this.player);
            this.drawnLevel[row].splice(column, 0, this.player);
            break;
          case 4:
            this.exitBlock = new Exit();
            this.exitBlock.domElement = createDomElement("exit-closed");
            this.exitBlock.positionX = column * 40;
            this.exitBlock.positionY = row * 40;
            this.drawDomElement(this.exitBlock);
            this.drawnLevel[row].splice(column, 0, this.exitBlock);
            this.exitArea.push(this.exitBlock);
            break;
          case 5:
            const enemy = new Enemy();
            enemy.domElement = this.createDomElement("enemy");
            enemy.positionX = column * 40;
            enemy.positionY = row * 40;
            this.drawDomElement(enemy);
            this.drawnLevel[row].splice(column, 0, enemy);
            this.enemiesArray.push(enemy);
            break;
          case 6:
            const teleport = new Teleport();
            teleport.domElement = this.createDomElement("teleport");
            teleport.positionX = column * 40;
            teleport.positionY = row * 40;
            this.drawDomElement(teleport);
            this.drawnLevel[row].splice(column, 0, teleport);
            this.teleportArray.push(teleport);
            break;
        }
      }
    }
  }

  playerPathing(entity, currentLevel, direction) {
    /* Get player coordinates based on the level grid
    instead of the dom position */
    let x = entity.positionX / 40;
    let y = entity.positionY / 40;

    switch (direction) {
      case "left":
        switch (currentLevel[y][x - 1]) {
          case 1:
            return false;
          case 2:
            this.grabKey(this.drawnLevel[y][x - 1]);
            this.currentLevel[y][x - 1] = 0;
            return true;
          default:
            return true;
        }
      case "right":
        switch (currentLevel[y][x + 1]) {
          case 1:
            return false;
          case 2:
            this.grabKey(this.drawnLevel[y][x + 1]);
            this.currentLevel[y][x + 1] = 0;
            return true;
          default:
            return true;
        }
      case "up":
        switch (currentLevel[y - 1][x]) {
          case 1:
            return false;
          case 2:
            this.grabKey(this.drawnLevel[y - 1][x]);
            this.currentLevel[y - 1][x] = 0;
            return true;
          default:
            return true;
        }
      case "down":
        switch (currentLevel[y + 1][x]) {
          case 1:
            return false;
          case 2:
            this.grabKey(this.drawnLevel[y + 1][x]);
            this.currentLevel[y + 1][x] = 0;
            return true;
          default:
            return true;
        }
    }
  }

  grabKey(key) {
    key.domElement.remove();
    this.keysGrabbed++;
    key.keyGrabSound.play();
    if(this.keysGrabbed === 6) key.openDoorSound.play();
  }

  movePlayer(direction) {
    switch (direction) {
      case "left":
        if (this.playerPathing(this.player, this.currentLevel, "left")) {
          this.player.moveLeft();
        }
        break;
      case "right":
        if (this.playerPathing(this.player, this.currentLevel, "right")) {
          this.player.moveRight();
        }
        break;
      case "up":
        if (this.playerPathing(this.player, this.currentLevel, "up")) {
          this.player.moveUp();
        }
        break;
      case "down":
        if (this.playerPathing(this.player, this.currentLevel, "down")) {
          this.player.moveDown();
        }
        break;
    }
    this.drawDomElement(this.player);
  }

  moveEnemy(enemy, currentLevel) {
    /* Get player coordinates based on the level grid
    instead of the dom position */
    let x = enemy.positionX / 40;
    let y = enemy.positionY / 40;

    if (enemy.direction === "left") {
      if (currentLevel[y][x - 1] !== 1 && currentLevel[y][x - 1] !== 2) {
        currentLevel[y][x - 1] = 5;
        currentLevel[y][x] = 0;
        enemy.moveLeft();
        this.drawDomElement(enemy);
      } else if (currentLevel[y][x - 1] === 1 || currentLevel[y][x - 1] === 2) {
        enemy.direction = "right";
        this.drawDomElement(enemy);
      }
    }

    if (enemy.direction === "right") {
      if (currentLevel[y][x + 1] !== 1 && currentLevel[y][x + 1] !== 2) {
        currentLevel[y][x + 1] = 5;
        currentLevel[y][x] = 0;
        enemy.moveRight();
        this.drawDomElement(enemy);
      } else if (currentLevel[y][x + 1] === 1 || currentLevel[y][x + 1] === 2) {
        enemy.direction = "left";
        this.drawDomElement(enemy);
      }
    }
  }

  teleportPlayer(){
    this.teleportArray.forEach((teleport,index) => {
      if (this.player.positionX === teleport.positionX && this.player.positionY === teleport.positionY){
        switch(index){
          case 0:
            this.player.positionX = this.teleportArray[5].positionX;
            this.player.positionY = this.teleportArray[5].positionY;
            this.drawDomElement(this.player);
            teleport.sound.play();
            break;
          case 3:
            this.player.positionX = this.teleportArray[2].positionX;
            this.player.positionY = this.teleportArray[2].positionY;
            this.drawDomElement(this.player);
            teleport.sound.play();
            break;
          case 4:
            this.player.positionX = this.teleportArray[2].positionX;
            this.player.positionY = this.teleportArray[2].positionY;
            this.drawDomElement(this.player);
            teleport.sound.play();
            break;
        }
    }
  });
  }
}

class Wall {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 40;
    this.width = 40;
    this.domElement = 0;
  }
}

class Path {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 40;
    this.width = 40;
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
    this.height = 40;
    this.width = 40;
    this.domElement = 0;
    this.keyGrabSound = new Audio('../resources/sounds/key-grab.wav');
    this.openDoorSound = new Audio('../resources/sounds/door-open.wav');
  }
}

class Player {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 40;
    this.width = 40;
    this.domElement = 0;
    this.dyingSound = new Audio('../resources/sounds/player-dies.wav');
  }

  moveRight() {
    this.positionX += 40;
  }

  moveLeft() {
    this.positionX -= 40;
  }

  moveUp() {
    this.positionY -= 40;
  }

  moveDown() {
    this.positionY += 40;
  }
}

class Enemy {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 40;
    this.width = 40;
    this.domElement = 0;
    this.direction = "left";
  }

  moveRight() {
    this.positionX += 40;
  }

  moveLeft() {
    this.positionX -= 40;
  }
}

class Teleport {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height = 40;
    this.width = 40;
    this.domElement = 0;
    this.sound = new Audio('../resources/sounds/teleport.flac');
  }
}