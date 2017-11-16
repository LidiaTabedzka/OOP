$(function() {
    function randomString() {
        var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
        var str = '';
        for (var i = 0; i < 10; i++) {
            str += chars[Math.floor(Math.random() * chars.length)];
        }
        return str;
    }

    function Column(name) {
        var self = this;
        this.id = randomString();
        this.name = name;
        this.$element = createColumn();

        function createColumn() {
            // CREATING COMPONENTS OF COLUMNS
            var $column = $('<div>').addClass('column');
            var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
            var $columnCardList = $('<ul>').addClass('column-card-list');
            var $columnDelete = $('<button>').addClass('btn-delete').text('x');
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card');
            // ADDING EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function(){
                self.addCard(new Card(prompt("Enter the name of the card")));
            });
            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle).append($columnDelete).append($columnAddCard).append($columnCardList);
            // RETURN OF CREATED COLUMN
            return $column;
        }
    }

    Column.prototype = {
        addCard: function(card) {
            this.$element.children('ul').append(card.$element);
        },
        removeColumn: function() {
            this.$element.remove();
        }
    }

    function Card(description) {
        var self = this;

        this.id = randomString();
        this.description = description;
        this.$element = createCard();

        function createCard() {
            // CREATING COMPONENTS OF CARDS
            var $card = $('<li>').addClass('card');
            var $cardDescription = $('<p>').addClass('card-description').text(self.description);
            var $cardDelete = $('<button>').addClass('btn-delete-card').text('x');
            // ADDING EVENTS
            $cardDelete.click(function() {
                self.removeCard();
            });
            // CONSTRUCTION CARD ELEMENT
            $card.append($cardDelete).append($cardDescription);
            // RETURN OF CREATED CARD
            return $card;
        }
    }

    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    function initSortable() {
        $('.column-card-list').sortable({
          connectWith: '.column-card-list',
          placeholder: 'card-placeholder'
        }).disableSelection();
    }

    function Board(name) {
        var self = this;

        this.id = randomString()
        this.name = name;
        this.$element = createBoard();

        function createBoard() {
            // CREATING COMPONENTS OF BOARD
            var $board = $('<div>').addClass('board');
            var $boardDescription = $('<h1>').addClass('board-description').text(self.name);
            var $boardDelete = $('<button>').addClass('btn-delete-board').text('x');
            var $boardAddColumn = $('<button>').addClass('create-column').text('Add a column');
            var $boardColumnContainer = $('<div>').addClass('column-container');
            // ADDING EVENTS
            $boardDelete.click(function() {
                self.removeBoard();
            });
            $boardAddColumn.click(function(){
                self.addColumn(new Column(prompt("Enter a column name")));
            });
            // CONSTRUCTION BOARD ELEMENT
            $board.append($boardDelete).append($boardDescription).append($boardAddColumn).append($boardColumnContainer);
            // RETURN OF CREATED BOARD
            return $board;
        }
    }

    Board.prototype = {
        addColumn: function(column) {
            this.$element.children("div").append(column.$element);
            initSortable();
        },
        removeBoard: function() {
            this.$element.remove();
        }
    }
    
    $(".create-board").click(function() {
        var name = prompt("Enter a board name");
        var board = new Board(name);
       
        $(".boards-container").append(board.$element);
    });
})