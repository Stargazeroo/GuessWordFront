// **mainPageController instance**
var mainPageRouter = Backbone.Router.extend({
    
    routes:{
        ""            : "home",
        "registration": "registration",
        "login"       : "login",
        "training"    : "training",
        "trainingOn"  : "trainingOn",
        ":button"     : "action",
    },

    home: function() {
        new mainPageController();
    },

    action: function(button) {
        new actionController(button);
    },

    registration: function() {
        new regViewController();
    },

    login: function() {
        new logInController();
    },

    training: function() {
        new trainingStartPageController();
    },

    trainingOn: function(){
        new trainingGameController();
    }
});

$(window).load(function() {
    jQuery.i18n.properties({
        name:'app',
        path:'/javascripts/1P/localization/',
        mode:'map',
        language: (localStorage['language'])? JSON.parse(localStorage['language']):"en_EN"
    });
    var mainPageApp = new mainPageRouter();  //Start the new automatic router
    Backbone.history.start(); //Call Backbone's default component
});
