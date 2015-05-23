define([
    'backbone',
    'tmpl/game',
    'views/board',
    'models/board',
    'models/game',
    'collections/btns',
    'views/btns',
    'models/btn',
    'jquery'
], function(
    Backbone,
    tmpl,
    boardView,
    boardModel,
    gameModel,
    colBtns,
    btns,
    btn,
    $
){

    var View = Backbone.View.extend({

        template: tmpl,
        className: "game-view",
        board: boardView,
        game: gameModel,
        btns: btns,
        events: {
            "click .ready": 'ready',
            "click": this.render
        },
        initialize: function () {
            console.log(btns);
            this.listenTo(btns, "buttons:updated", this.render)
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
        render: function () {
            console.log("rerender")
            this.$el.html( this.template() );
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