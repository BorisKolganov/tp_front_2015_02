define([
    'backbone',
    'tmpl/scoreboard'
], function(
    Backbone,
    tmpl
){
    var top = {
        'name0': 10,
        'name1': 1,
        'name2': 2,
        'name3': 3,
        'name4': 4,
        'name5': 5,
        'name6': 6,
        'name7': 7,
        'name8': 8,
        'name9': 9
    };
    var View = Backbone.View.extend({

        template: tmpl,
        initialize: function () {
            this.$el.html( this.template(top) );
        },
        render: function () {
            // TODO
        },
        show: function () {
            // TODO
            this.$el.show();
        },
        hide: function () {
            // TODO
            this.$el.hide();
        }

    });

    return new View();
});