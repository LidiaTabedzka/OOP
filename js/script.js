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
            var $columnAddCard = $('<button>').addClass('add-card').text('Add a card').attr("id", randomString());
            var addCardButtonId = $columnAddCard.attr("id");

            var $inputElement = $('<input>').addClass('card-form').attr("placeholder", "Enter a card description").attr("id", randomString());
            var inputElementId = $inputElement.attr("id");

            var $inputAcceptCard = $('<button>').addClass('card-form btn accept-button').text('V').attr("id", randomString());
            var acceptButtonId = $inputAcceptCard.attr("id");

            var $inputDeleteCard = $('<button>').addClass('card-form btn delete-button').text('X').attr("id", randomString());
            var deleteButtonId = $inputDeleteCard.attr("id");

            var $cardAlert = $('<p>').addClass('card-alert');

            // ADDING EVENTS
            $columnDelete.click(function() {
                self.removeColumn();
            });
            $columnAddCard.click(function(){
                $("#" + inputElementId).val("");
                showHideButtons("none", "inline");               
            });
            $inputAcceptCard.click(function(){
                if (($("#" + inputElementId)).val() == "") {
                    $cardAlert.text("Please enter a card description!");
                } else {
                    self.addCard(new Card(($("#" + inputElementId)).val()));
                    showHideButtons("inline", "none");
                    $cardAlert.text("");
                }
            });
            $inputDeleteCard.click(function(){
                $cardAlert.text("");
                showHideButtons("inline", "none");
            });

            function showHideButtons (show, hide) {
                $('#' + addCardButtonId).css("display", show);
                $("#" + inputElementId).css("display", hide);
                $("#" + acceptButtonId).css("display", hide);
                $("#" + deleteButtonId).css("display", hide);
            }
            // CONSTRUCTION COLUMN ELEMENT
            $column.append($columnTitle).append($columnDelete).append($columnAddCard).append($inputElement).append($inputAcceptCard).append($inputDeleteCard).append($cardAlert).append($columnCardList);
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

    //usuwanie karty
    Card.prototype = {
        removeCard: function() {
            this.$element.remove();
        }
    }

    //przesuwanie kart między kolumnami
    function initSortable() {
        $('.column-card-list').sortable({
          connectWith: '.column-card-list',
          placeholder: 'card-placeholder'
        }).disableSelection();
    }

    //tworzenie nowych tablic
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

            var $boardAddColumn = $('<button>').addClass('create-column').text('Add a column').attr("id", randomString());
            var addColumnButtonId = $boardAddColumn.attr("id");

            var $inputElement = $('<input>').addClass('column-form').attr("placeholder", "Enter a column name").attr("id", randomString());
            var inputElementId = $inputElement.attr("id");

            var $inputAcceptColumn = $('<button>').addClass('column-form btn accept-button').text('V').attr("id", randomString());
            var acceptButtonId = $inputAcceptColumn.attr("id");

            var $inputDeleteColumn = $('<button>').addClass('column-form btn delete-button').text('X').attr("id", randomString());
            var deleteButtonId = $inputDeleteColumn.attr("id");

            var $columnAlert = $('<p>').addClass('column-alert');
            var $boardColumnContainer = $('<div>').addClass('column-container');

            // ADDING EVENTS
            $boardDelete.click(function() {
                self.removeBoard();
            });
            $boardAddColumn.click(function(){
                $("#" + inputElementId).val("");
                showHideButtons("none", "inline");
            });
            $inputAcceptColumn.click(function(){
                if (($("#" + inputElementId)).val() == "") {
                    $columnAlert.text("Please enter a column name!");
                } else {
                    self.addColumn(new Column(($("#" + inputElementId)).val()));
                    showHideButtons("inline", "none");
                    $columnAlert.text("");
                }
            });
            $inputDeleteColumn.click(function(){
                $columnAlert.text("");
                showHideButtons("inline", "none");
            });
            function showHideButtons (show, hide) {
                $('#' + addColumnButtonId).css("display", show);
                $("#" + inputElementId).css("display", hide);
                $("#" + acceptButtonId).css("display", hide);
                $("#" + deleteButtonId).css("display", hide);
            }
            // CONSTRUCTION BOARD ELEMENT
            $board.append($boardDelete).append($boardDescription).append($boardAddColumn).append($inputElement).append($inputAcceptColumn).append($inputDeleteColumn).append($columnAlert).append($boardColumnContainer);
            // RETURN OF CREATED BOARD
            return $board;
        }
    }

    //Funkcje tworzenia nowej kolumny i usuwania tablicy
    Board.prototype = {
        addColumn: function(column) {
            this.$element.children("div").append(column.$element);
            initSortable();  
        },
        removeBoard: function() {
            this.$element.remove();
        }
    }
    
    //Przycisk tworzenia nowej tablicy
    $(".create-board").click(function() {
        document.getElementById("boardInput").value = "";
        showHideBoardButtons("inline", "none");
    });
    
    //Pole do wpisania nazwy nowej tablicy - przycisk accept
    $("#boardInputAccept").click(function(){
        var name = document.getElementById("boardInput").value;

        if (name == "") {
            $(".board-alert").text("Please enter a board name!");
        } else {
            var board = new Board(name);

            $(".boards-container").append(board.$element);
            $(".board-alert").text("");
            showHideBoardButtons("none", "inline");
        }
    });

    //Pole do wpisania nazwy nowej tablicy - przycisk delete
    $("#boardInputDelete").click(function(){
        $(".board-alert").text("");
        showHideBoardButtons("none", "inline");
    });

    function showHideBoardButtons (show, hide) {
        $(".board-form").css("display", show); 
        $(".create-board").css("display", hide); 
    }
})