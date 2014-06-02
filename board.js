

(function (root) {
  var Snakey = root.Snakey = (root.Snakey || {});

  var Apple = Snakey.Apple = function() {
    var randX = Math.floor(Math.random() * (Snakey.SIZE - 1));
    var randY = Math.floor(Math.random() * (Snakey.SIZE - 1));
    this.position = [randX, randY];
  };


  var Board = Snakey.Board = function() {
    this.snake = new Snakey.Snake();
    this.apple = new Snakey.Apple();
    this.score = 0;
  };

  Board.BLANK_SYMBOL = " ";
  Board.APPLE_SYMBOL = "A";

  Board.blankGrid = function (dim) {
    return _.times(dim, function () {
      return _.times(dim, function () {
        return Board.BLANK_SYMBOL
      });
    });
  };


  Board.prototype.display = function() {
    var displayBoard = Board.blankGrid(Snakey.SIZE);

    _(this.snake.segments).each(function(segment) {
      displayBoard[segment[0]][segment[1]] = "S";
    });

    displayBoard[this.apple[0]][this.apple[1]] = "A";

    return displayBoard;
  };

  Board.prototype.run = function() {
    console.log("HELLO");
  };

})(this);
