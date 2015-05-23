define([
    'backbone',
    'models/btn',
    'models/game'
], function(
    Backbone,
    Btn,
    game
){

    var BtnCollection = Backbone.Collection.extend({
    	model: Btn,
        gameModel: game,
        initialize: function () {
            this.add([
                {
                    "color": "red",
                    "id": 1
                },
                {
                    "color": "green",
                    "id": 2
                },
                {
                    "color": "blue",
                    "id": 3
                },
                {
                    "color": "yellow",
                    "id": 4
                },
                {
                    "color": "pink",
                    "id": 5
                }])
        }

    });

    return new BtnCollection();
});