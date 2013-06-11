// **mainPageController instance**
var mainPageController = Backbone.Model.extend({
    initialize: function(btn) {
        var main = new mainPage(); //getting data from mainPage model
        var mainSection = main.get('mainSection');
        var sideBarSection = main.get('sideBarSection');
        
        new mainPageView(mainSection, sideBarSection);
    }
});
