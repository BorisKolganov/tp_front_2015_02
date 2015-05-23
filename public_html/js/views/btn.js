define([
    'backbone',
    'tmpl/btn',
    'models/board',
    'jquery'
], function(
    Backbone,
    tmpl,
    btnModel,
    $
){

    var View = Backbone.View.extend({
        template: tmpl,
        className: "game-button",
        btn: btnModel,
        initialize: function () {
            this.$el.addClass(".game-button_"+this.btn.id);

        },
        render: function () {
            this.$el.html(this.template(this.board.toJSON()));
            return this;
        }
    });

    return View;
});