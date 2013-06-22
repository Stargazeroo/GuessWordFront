// **mainPageController instance**
var mainPageController = Backbone.Model.extend({
    initialize: function(btn) {
        var mainPageModel = new mainPage(); //getting data from mainPage model
        var mainSection = mainPageModel.get('mainSection');
        var sideBarSection = mainPageModel.get('sideBarSection');
        
        new sideBarSectionView(sideBarSection);
        new mainSectionView(mainSection);
    }
});