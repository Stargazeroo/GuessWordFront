var logInModelInst = Backbone.Model.extend({
    initialize: function(){
        var mainLogIn = new logInModel();
        var logInFields = mainLogIn.get('fields');
        var logInButtons = mainLogIn.get('buttons');
        new logInView(logInFields,logInButtons); 
    }
});
