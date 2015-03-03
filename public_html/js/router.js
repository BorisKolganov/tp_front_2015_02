define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/login',
    'views/game',
    'views/registration'
], function(
    Backbone,
    mainView,
    scoreView,
    loginView,
    gameView,
    registrationView
){
    $(".page").append(mainView.el);
    $(".page").append(scoreView.el);
    $(".page").append(loginView.el);
    $(".page").append(gameView.el);
    $(".page").append(registrationView.el);


    function hideAll() {
        $("div.page > div").hide();
    }

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'back': 'defaultActions',
            'registration': 'registrationAction',
            '*default': 'defaultActions'
        },


        defaultActions: function () {
            hideAll();
            mainView.show();
        },
        scoreboardAction: function () {
            hideAll();
            scoreView.show();
        },
        gameAction: function () {
            hideAll();
            gameView.show();
        },
        loginAction: function () {
            hideAll();
            loginView.show();
        },
        registrationAction: function () {
            hideAll();
            registrationView.show();
        }

    });

    return new Router();
});