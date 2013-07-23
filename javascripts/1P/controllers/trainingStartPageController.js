var trainingStartPageController = Backbone.Model.extend({
    initialize: function(btn) {
        var mainPageModel = new mainPage(); //getting data from mainPage model
        var trainingStartPage = new trainingStartPageModel();
        var trainingStartPageElements = trainingStartPage.get('elements');

        var sideBarSection = mainPageModel.get('sideBarSection');
        var logoutButton = mainPageModel.get('logoutButton');

        new sideBarSectionView(sideBarSection);
        new trainingStartPageView(trainingStartPageElements);
        new userTrainingController();

        localStorage.reload=0;
        localStorage.state=0;
    }
});
