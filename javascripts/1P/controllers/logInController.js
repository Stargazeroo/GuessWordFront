var logInController = Backbone.Model.extend({
        initialize: function(){
            var mainPageModel = new mainPage(); //getting data from mainPage model
            var sideBarSection = mainPageModel.get('sideBarSection');
            new sideBarSectionView(sideBarSection);

            var mainLogIn = new logInModel();
            var logInFields = mainLogIn.get('fields');
            var logInButtons = mainLogIn.get('buttons');
    
            new logInView(logInFields,logInButtons);
        }
});