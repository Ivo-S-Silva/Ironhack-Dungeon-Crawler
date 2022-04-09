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
    const wall = new Wall();
    
    for (let row = 0; row < selectedLevel.length; row++) {
      for (let column = 0; column < selectedLevel.length; column++) {
        switch (selectedLevel[row][column]) {
          case 0:
            break;
          case 1:
            wall.domElement = createDomElement("wall");
            wall.positionX = column * 80;
            wall.positionY = row * 80;
            drawDomElement(wall);
            console.log(wall.domElement);
            this.drawnLevel[row].push(wall.domElement);
            break;
          case 2:
            wall.domElement = createDomElement("enemy");
            wall.positionX = column * 80;
            wall.positionY = row * 80;
            drawDomElement(wall);
            // Mudar futuramente para em vez de wall ser o objeto enemy
            this.drawnLevel[row].push(wall.domElement);
            break;
          case 3:
            this.player = new Player();
            this.player.domElement = createDomElement("player");
            this.player.positionX = column * 80;
            this.player.positionY = row * 80;
            drawDomElement(this.player);
            this.drawnLevel[row].push(this.player.domElement);
            break;
          case 4:
            wall.domElement = createDomElement("exit");
            wall.positionX = column * 80;
            wall.positionY = row * 80;
            drawDomElement(wall);
            // Mudar futuramente para em vez de wall ser o objeto Exit
            this.drawnLevel[row].push(wall.domElement);
            break;
        }
      }
    }
  }

  start() {
    this.levelDesigner(this.selectedLevel);
  }

  detectCollision(entity, obstacle) {
    for (let row = 0; row < selectedLevel.length; row++) {
      for (let column = 0; column < selectedLevel.length; column++) {
        if (
            entity.positionX < obstacle[row][column].positionX + obstacle[row][column].width &&
            entity.positionX + entity.width > obstacle[row][column].positionX &&
            entity.positionY < obstacle[row][column].positionY + obstacle[row][column].height &&
            entity.height + entity.positionY > obstacle[row][column].positionY
          ) {
            return true;
          }
      }
    }

    
  }

  movePlayer(direction) {
    switch (direction) {
      case "left":
          this.player.moveLeft();
        break;
      case "right":
        this.player.moveRight();
        break;
      case "up":
        this.player.moveUp();
        break;
      case "down":
        this.player.moveDown();
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
    this.height;
    this.width;
    this.domElement = 0;
  }
}

class Player {
  constructor() {
    this.positionX = 1;
    this.positionY = 1;
    this.height;
    this.width;
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
