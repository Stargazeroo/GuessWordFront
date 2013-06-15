// **actionController instance**
var actionController = Backbone.Model.extend({
    initialize: function(button) {
        var btn = {name: button};
        new buttonClickView(btn);

        var mainPageModel = new mainPage(); //getting data from mainPage model
        var mainSection = mainPageModel.get('mainSection');
        var sideBarSection = mainPageModel.get('sideBarSection');
        new sideBarSectionView(mainSection, sideBarSection);
    }
});