var regViewController = Backbone.Model.extend({
    initialize: function(){
        var regViewModelObj = new registrationForm();
        var regModelInputFields = regViewModelObj.get('fields');
        var regModelButton = regViewModelObj.get('buttons');
        new ListView(regModelInputFields, regModelButton);
    }
});   
new regViewController();