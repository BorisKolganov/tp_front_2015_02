define([
    'backbone',
    'tmpl/game',
    'models/game',
    'jquery'
], function(
    Backbone,
    tmpl,
    game,
    $
){

    var View = Backbone.View.extend({

        template: tmpl,
        className: "game-view",
        game: game,
        events: {
            "click .ready": 'ready',
            "click .control-buttons__button_red": 'click_red',
            "click .control-buttons__button_green": 'click_green',
            "click .control-buttons__button_blue": 'click_blue',
            "click .control-buttons__button_yellow": 'click_yellow',
            "click .control-buttons__button_pink": 'click_pink'
        },
        ready: function () {
            $.ajax({
                method: 'POST',
                url: "/game.html",
                dataType: 'json',
                context: this
            }).done(function() {
                this.game.start();
                console.log("gamestart");
            }).fail(function(data) {
                console.log("fail");
                console.log(data);
                this.game.start();
                console.log("gamestart");
            });
        },
        click_red: function () {
            this.game.send_color(1)
            // this.render({
            //     'score': "one billion", 
            //     'field': [[7,7,7,7],
            //               [7,7,7,7],
            //               [7,7,7,7],
            //               [7,7,7,7]],
            //     'h':4,
            //     'w':4});
        },
        click_green: function () {
            this.game.send_color(2)
        },
        click_blue: function () {
            this.game.send_color(3)
        },
        click_yellow: function () {
            this.game.send_color(4)
        },
        click_pink: function () {
            this.game.send_color(5)
        },
        initialize: function () {
            this.render({
                'score': "one billion", 
                'field': [[1,2,3,4],
                          [5,6,7,8],
                          [9,1,2,3],
                          [7,7,7,7]],
                'h':4,
                'w':4});
            this.hide();
            this.listenTo(this.game, "socket:open", this.start_game);
            this.listenTo(this.game, "socket:close", this.end_game);
            this.listenTo(this.game, "socket:message", this.message);
        },
        render: function (data) {
            this.$el.html( this.template(data) );
        },
        show: function () {
            this.trigger("show", this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },
        start_game: function() {
            //alert(this.game.data);
        },
        end_game: function() {

        },
        message: function() {
            console.log("message func")
            console.log(this.game.data)
            console.log(this.game.data.status)
            if (this.game.data.status == "start") {
                var obj = {
                    'score': 0,
                    'field': this.game.data.pole,
                    'h': this.game.data.pole.length,
                    'w': this.game.data.pole[0].length
                }
                console.log(obj)
                this.render(obj)
            } 
            if (this.game.data.status == "move") {
                this.render({
                    'score': this.game.data.score,
                    'field': this.game.data.field,
                    'h': this.game.data.field.length,
                    'w': this.game.data.field[0].length
                })
            }
            if (this.game.data.status == "finish") {
                alert("Game over "+ this.game.data.win?"winner":"looser")
                this.game.ws.close();
            }
        }
    });

    return new View();
});