define([
    'backbone',
    'models/score'
], function(
    Backbone,
    score
){

    var UserCollection = Backbone.Collection.extend({
    	model: score,
        comparator: function(score) {
            return - score.get("score")
        }
    });

    return new UserCollection();
});