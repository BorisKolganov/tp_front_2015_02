define([
    'backbone',
    'tmpl/btn',
    'models/game',
    'jquery'
], function(
    Backbone,
    tmpl,
    gameModel,
    $
){
    var View = Backbone.View.extend({
        template: tmpl,
        className: "game-button",
        events: {
            "click": "send"
        },
        initialize: function () {
            this.listenTo(gameModel, "socket:message", this.check)
            this.$el.addClass("game-button_"+this.model.get("id"));
            this.$el.onclick = this.send;
        },
        render: function () {
            this.$el.html(this.template());
            return this;
        },
        check: function(data) {
            console.log("check")
            if (this.model.get("id") == data.color1 ||
                this.model.get("id") == data.color2) {
                    this.$el.addClass("game-button_disabled");
                } else {
                    this.$el.removeClass("game-button_disabled");
                }
                this.trigger("button:updated");

        },
        send: function (){
            alert("click")
            console.log("click")
            this.trigger("button:updated")
            //gameModel.send(this.model.get("id"));
        }
    });
    return View;
});