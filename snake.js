(function (root) {
  var Snakey = root.Snakey = (root.Snakey || {});

  var SIZE = Snakey.SIZE = 25;

  var DIRECTIONS = Snakey.DIRECTIONS = {
    'w': [0, -1],
    'e': [0, 1],
    'n': [-1, 0],
    's': [1, 0]
  };

  var Snake = Snakey.Snake = function() {
    this.dir = 'w';
    this.segments = [[Math.floor(SIZE / 2), Math.floor(SIZE / 2)]];
    this.segments.push([this.segments[0][0], this.segments[0][1] + 1]);
    this.segments.push([this.segments[1][0], this.segments[1][1] + 1]);

  };

  Snake.prototype.move = function() {
    var direction = DIRECTIONS[this.dir];
    var head = this.segments[0];
    var newHead = [head[0] + direction[0], head[1] + direction[1]];
    this.correctBounds(newHead);
    this.checkCollision(newHead);

    this.segments.unshift(newHead);

    var applePos = game.board.apple.position;
    if (newHead[0] === applePos[0] && newHead[1] === applePos[1]) {
      game.board.apple = new Snakey.Apple();
      game.board.score += 1;
    } else {
      this.segments.pop();
    };
  };

  Snake.prototype.checkCollision = function(newHead) {
    _(this.segments).each(function(segment){
      if (newHead[0] === segment[0] && newHead[1] === segment[1]) {
        clearInterval(Snakey.INTERVAL);
        $("body").append($("<h1>YOU DIED</h1>"));
      };
    });
  };

  Snake.prototype.turn = function(direction) {
    this.dir = direction;
  };

  Snake.prototype.correctBounds = function(newHead) {
    if (newHead[0] >= SIZE) {
      newHead[0] -= SIZE;
    } else if (newHead[0] < 0) {
      newHead[0] += SIZE;
    };
    if (newHead[1] >= SIZE) {
      newHead[1] -= SIZE;
    } else if (newHead[1] < 0) {
      newHead[1] += SIZE;
    };
  };


})(this);

