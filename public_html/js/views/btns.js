define([
    'backbone',
    'tmpl/btns',
    'views/btn',
    'collections/btns',
    'jquery',
    'underscore'
], function(
    Backbone,
    tmpl,
    btnView,
    btnCollection,
    $,
    _
){
    var View = Backbone.View.extend({
        template: tmpl,
        className: "game-button-container",
        events: {"click": this.render},
        initialize: function () {
            alert("init")
            this.render();
            this.buttonsView = [];
            _.forEach(btnCollection.models, function(val) {
                var view = new btnView({"model": val})
                this.buttonsView.push(view)
                this.listenTo(view, "button:updated", this.update)
            }, this)

        },
        update: function (){
            this.trigger("buttons:updated");
        },
        render: function () {
            console.log(this.buttonsView)
            this.$el.html(this.template());
            _.forEach(this.buttonsView, function(val) {
                    this.$el.append(val.render().$el);
            }, this)
            return this;
        }
    });
    return new View ();
});