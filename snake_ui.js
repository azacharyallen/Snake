(function (root) {
  var Snakey = root.Snakey = (root.Snakey || {});

  var KEY_MAPS = Snakey.KEY_MAPS = {
    37: 'w',
    38: 'n',
    39: 'e',
    40: 's'
  };

  var SPEED = Snakey.GAME_SPEED = 100;

  var View = Snakey.View = function($rootEl) {
    this.$el = $rootEl;
  };

  View.prototype.start = function() {
    this.board = new Snakey.Board();

    this.bindKeyHandlers();
    Snakey.INTERVAL = setInterval(this.step.bind(this), SPEED);
  };

  View.prototype.bindKeyHandlers = function() {
    $("body").on('keydown', this.handleKeyEvent.bind(this));
  };

  View.prototype.handleKeyEvent = function(event) {
    var keyPress = event.keyCode;
    if (KEY_MAPS[keyPress]) {
      this.board.snake.turn(KEY_MAPS[keyPress]);
    };
  };

  View.prototype.step = function() {
    this.board.snake.move();
    this.render();
  };

  View.prototype.render = function() {
    var view = this;
    var board = view.board;

    function buildSquaresMatrix () {
      return _.times(Snakey.SIZE, function () {
        return _.times(Snakey.SIZE, function () {
          return $('<div class="square"></div>');
        });
      });
    };

    var squaresMatrix = buildSquaresMatrix();
    _(board.snake.segments).each(function(segment){
      squaresMatrix[segment[0]][segment[1]].addClass("snake");
    });

    squaresMatrix[board.apple.position[0]][board.apple.position[1]].addClass("apple");

    this.$el.empty();
    _(squaresMatrix).each(function(row){
      var $rowEl = $('<div class="row"></div>');
      _(row).each(function($square){ $rowEl.append($square); });
      view.$el.append($rowEl);
    });

    $(".score").html(board.score);
  };


})(this);