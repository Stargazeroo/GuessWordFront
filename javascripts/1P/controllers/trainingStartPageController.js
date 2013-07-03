var trainingStartPageController = Backbone.Model.extend({
    initialize: function(btn) {
        var mainPageModel = new mainPage(); //getting data from mainPage model
        var trainingStartPageM = new trainingStartPageModel();
        var trainingStartPage = trainingStartPageM.get('elements');


        var sideBarSection = mainPageModel.get('sideBarSection');
        var logoutButton = mainPageModel.get('logoutButton');

        new sideBarSectionView(sideBarSection);
        new trainingStartPageView(trainingStartPage);
        new userView();
    }
});