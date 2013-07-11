var regViewController = Backbone.Model.extend({
    initialize: function(){
        var mainPageModel = new mainPage(); //getting data from mainPage model
        var sideBarSection = mainPageModel.get('sideBarSection');
        new sideBarSectionView(sideBarSection);

        var regViewModelObj = new registrationForm();
        var regModelInputFields = regViewModelObj.get('fields');
        var regModelButton = regViewModelObj.get('buttons');
        new registrationView(regModelInputFields, regModelButton);
    }
});
//new regViewController();