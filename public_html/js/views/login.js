define([
    'backbone',
    'tmpl/login',
    'jquery',
    'models/user'
], function(
    Backbone,
    tmpl,
    $,
    userm
){

    var View = Backbone.View.extend({
        model: userm,
        template: tmpl,
        className: "login-view",
        events: {'submit': 'submit'},
        submit: function (event) {
            event.preventDefault();
            var result = $(".login-form").serializeObject();
            userm.login(result);
        },
        initialize: function () {
            this.render();
            this.hide();
        },
        render: function () {
            this.$el.html( this.template() );
        },
        show: function () {
            this.trigger('show', this);
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    return new View();
});