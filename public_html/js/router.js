define([
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/login',
    'views/game'
], function(
    Backbone,
    mainView,
    scoreView,
    loginView,
    gameView
){
    $(".page").append(mainView.el);
    $(".page").append(scoreView.el);
    $(".page").append(loginView.el);
    $(".page").append(gameView.el);

    function hideAll() {
        $("div.page > div").hide();
    }

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            'back': 'defaultActions',
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
        }

    });

    return new Router();
});