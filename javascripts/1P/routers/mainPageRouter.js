// **mainPageController instance**
var mainPageRouter = Backbone.Router.extend({
    routes:{
        "":             "home",
        ":button":      "action"
    },

    home: function() {
        new mainPageController();
    },

    action: function(button) {
        new actionController(button);
    },
});

$(document).ready(function() {
    var mainPageApp = new mainPageRouter();  //Start the new automatic router
    Backbone.history.start(); //Call Backbone's default component
});
