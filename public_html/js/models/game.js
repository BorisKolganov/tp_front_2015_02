define([
    'backbone'
], function(
    Backbone
){
    var self;
    var Game = Backbone.Model.extend({
        initialize: function () {
            this.data = {};
            self = this;
        },
        connect: function () {
            if (this.socket === undefined) {
                this.socket = new WebSocket("ws://localhost:8080/gameplay");
            }
            this.socket.onopen = this.open;
            this.socket.onmessage = this.message;
            this.socket.onclose = this.console;         
        },
        open: function() {
            self.trigger("socket:open");
        },
        close: function() {
            self.trigger("socket:close")
        },
        message: function(msg) {
            var data = JSON.parse(msg.data);
            console.log(data);
            if (data.status == "start") {
                self.trigger("game:start", data)
            }
            if (data.status == "finish") {
                self.trigger("game:stop")
            }
            if (data.status !== undefined) {
                self.trigger("socket:message", data);
            }
        },
        send: function(color) {
            this.socket.send(JSON.stringify({"color": color}))
        }
     });

    return new Game();
});