define([
    'backbone',
    'tmpl/game',
    'views/board',
    'models/board',
    'models/game',
    'collections/btns',
    'jquery'
], function(
    Backbone,
    tmpl,
    boardView,
    boardModel,
    gameModel,
    btns,
    $
){

    var View = Backbone.View.extend({

        template: tmpl,
        className: "game-view",
        board: boardView,
        game: gameModel,
        events: {
            "click .ready": 'ready',
            "click .game-button_1": 'click_red',
            "click .game-button_2": 'click_green',
            "click .game-button_3": 'click_blue',
            "click .game-button_4": 'click_yellow',
            "click .game-button_5": 'click_pink'
        },
        initialize: function () {
            console.log(btns);
            this.listenTo(boardModel, "board:updated", this.render)
            this.render();
            this.hide();
        },
        ready: function () {
            $.ajax({
                method: 'POST',
                url: "/game.html",
                dataType: 'json',
                context: this
            }).done(function() {
                this.game.connect();
            }).fail(function(data) {
                this.game.connect();
            });
        },
        click_red: function () {
            this.game.send(1)
        },
        click_green: function () {
            this.game.send(2)
        },
        click_blue: function () {
            this.game.send(3)
        },
        click_yellow: function () {
            this.game.send(4)
        },
        click_pink: function () {
            this.game.send(5)
        },
        
        render: function () {
            this.$el.html( this.template() );
            this.$el.append(this.board.render().$el)
        },
        show: function () {
            this.trigger("show", this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }
    });

    return new View();
});