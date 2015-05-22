define([
    'backbone'
], function(
    Backbone
){

    var Btn = Backbone.Model.extend({
    	initialize: function () {
    		this.color = "";
    		this.id = "";
    	}
    });

    return Btn;
});