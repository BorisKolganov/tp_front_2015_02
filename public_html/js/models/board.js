define([
    'backbone',
    'models/game'
], function(
    Backbone,
    gameModel
){

    var Board = Backbone.Model.extend({
    	initialize: function () {
    		this.listenTo(gameModel, "socket:message", this.step)
    		this.color = "";
    		this.id = "";
    	},
    	step: function (data) {
    		
    	}
    });

    return new Board();
});