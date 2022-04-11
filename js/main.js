//Access DOM Object - GameBoard
const createDomElement = (className) => {
    const gameBoard = document.getElementById("gameboard");
    const newEntity = document.createElement("div");


    newEntity.className = className;
    gameBoard.appendChild(newEntity);
    
    return newEntity;
}


const drawDomElement = (element,row) => {
    element.domElement.style.left = element.positionX + "px";
    element.domElement.style.top = element.positionY + "px";

    element.domElement.style.width = element.width + "px";
    element.domElement.style.height = element.height + "px";
}


const game = new Game(createDomElement,drawDomElement);
game.start();

document.addEventListener("keydown", function (event) {
    /*Every time an event is fired, you can get the information about it in a variable 
  that can be passed inside the function of the event. Using developer tools it's possible to
  see all the properties it has to be able to interact with it.*/
  
    switch (event.key) {
      case "d":
      case "D":
        game.movePlayer("right");
        break;
      case "a":
      case "A":
        game.movePlayer("left");
        break;
      case "w":
      case "W":
        game.movePlayer("up");
        break;
      case "s":
      case "S":
        game.movePlayer("down");
        break;
    }
  });


