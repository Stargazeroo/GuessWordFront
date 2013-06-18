var logInController = Backbone.Model.extend({
        initialize: function(){
            var mainLogIn = new logIn();
            var logInFields = mainLogIn.get('fields');
            var logInButtons = mainLogIn.get('buttons');
    
            new logInView(logInFields,logInButtons); 
        }
});
var Controller = new logInController();