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

    });

    return new BtnCollection();
});