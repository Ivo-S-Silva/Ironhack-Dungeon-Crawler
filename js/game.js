class Game {
  constructor(createDomElement, drawDomElement) {
    this.player = null;
    this.gameBoard = document.getElementById("gameBoard");
    this.createDomElement = createDomElement;
    this.drawDomElement = drawDomElement;
    this.selectedLevel = levelOne;
    this.drawnLevel = drawnLevel;
  }

  // criar arrray com o nível desenhado. Cada elemento do array tem o DomElement específico daquela posição
  // Quando o jogador carrega na tecla para seguir numa direção, verificar se naquela direção, 40px adiante
  // há algum elemento. Se houver, não avança.
  // Vai ser preciso fazer um forEach dentro da detectCollision para determinar qual objeto está logo ao lado do jogador

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
            drawnLevel[row].splice(column,0,path);
            break;
          case 1:
            const wall = new Wall();
            wall.domElement = createDomElement("wall");
            wall.positionX = column * 80;
            wall.positionY = row * 80;
            drawDomElement(wall);
            drawnLevel[row].splice(column,0,wall);
            break;
          case 2:
            const enemy = new Enemy();
            enemy.domElement = createDomElement("enemy");
            enemy.positionX = column * 80;
            enemy.positionY = row * 80;
            drawDomElement(enemy);
            // Mudar futuramente para em vez de wall ser o objeto enemy
            drawnLevel[row].splice(column,0,enemy);
            break;
          case 3:
            this.player = new Player();
            this.player.domElement = createDomElement("player");
            this.player.positionX = column * 80;
            this.player.positionY = row * 80;
            drawDomElement(this.player);
            drawnLevel[row].splice(column,0,this.player);
            break;
          case 4:
            const exit = new Exit();
            exit.domElement = createDomElement("exit");
            exit.positionX = column * 80;
            exit.positionY = row * 80;
            drawDomElement(exit);
            // Mudar futuramente para em vez de wall ser o objeto Exit
            drawnLevel[row].splice(column,0,exit);
            break;
        }
      }
    }
  }

  start() {
    this.levelDesigner(this.selectedLevel);
  }

  detectCollision(entity, drawnLevel) {
    console.log(drawnLevel);
    for (let row = 0; row < drawnLevel.length; row++) {
      for (let column = 0; column < drawnLevel.length; column++) {
        if (
          entity.positionX <
            drawnLevel[row][column].positionX + drawnLevel[row][column].width &&
          entity.positionX + entity.width > drawnLevel[row][column].positionX &&
          entity.positionY <
            drawnLevel[row][column].positionY +
              drawnLevel[row][column].height &&
          entity.height + entity.positionY >
            drawnLevel[row][column].positionY &&
          drawnLevel[row][column].domElement.className === "wall"
        ) {
          return true;
        }
      }
    }
  }

  movePlayer(direction) {
    switch (direction) {
      case "left":
        if (!this.detectCollision(this.player, this.drawnLevel)) {
          this.player.moveLeft();
        }
        break;
      case "right":
        if (!this.detectCollision(this.player, this.drawnLevel)) {
          this.player.moveRight();
        }
        break;
      case "up":
        if (!this.detectCollision(this.player, this.drawnLevel)) {
          this.player.moveUp();
        }
        break;
      case "down":
        if (!this.detectCollision(this.player, this.drawnLevel)) {
          this.player.moveDown();
        }
        break;
    }

    // Each time the player moves, the element is redrawn
    // Calls the drawElement function and says it's the player
    // that is moving.
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

class Enemy {
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
