define([
    'backbone',
    'tmpl/registration'
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({

        template: tmpl,
        events: {
            "change #password": "validatePassword",
            "keyup #confirm_password": "validatePassword"
        },
        initialize: function () {
            this.$el.html( this.template() );
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
        },
        validatePassword: function () {
            var password = document.getElementById("password")
                , confirm_password = document.getElementById("confirm_password");
            if(password.value != confirm_password.value) {
                confirm_password.setCustomValidity("Passwords Don't Match");
            } else {
                confirm_password.setCustomValidity('');
            }
        }

    });

    return new View();
});