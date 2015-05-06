define([
    'backbone',
    'underscore',
    'models/user',
    'tmpl/error'
], function(
    Backbone,
    _,
    usermodel,
    error_tmpl
){

    var View = Backbone.View.extend({
        model: usermodel,
        template: error_tmpl,
        application: $(".application"),
        events: {'click .error_message_close': 'hide'},
        add: function (views) {
            this.views = views;
            this.listenTo(this.model, "user:load", this.rerender);
            this.listenTo(this.model, "user:logout", this.rerender);
            this.listenTo(this.model, "user:error:login", this.login_error);
            this.listenTo(this.model, "user:error:create", this.create_error)
            _.forEach(this.views, function(val, i) {
                this.application.append(val.$el)
                this.listenTo(val, "show", this.hide_and_show);
            }, this)
        },
        render: function(args) {
            if (typeof(args)==='undefined') args = {};
            this.$el.html( this.template(args) );
        },
        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },
        initialize: function () {
            this.views = {};
            this.application.prepend(this.$el);
            
        },
        hide_and_show: function(arg) {
            _.forEach(this.views, function (arg) {
                arg.hide();
            });
        },
        rerender: function() {
            _.forEach(this.views, function (arg) {
                arg.render();
            });
        },
        login_error: function (data) {
            this.render(JSON.stryngify(data))
            this.show();
        },
        create_error: function (data) {
            this.render(JSON.stringify(data))
            this.show();
        }
    });

    return new View();
});