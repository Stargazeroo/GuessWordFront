// **mainPageView instance**: Instantiate main app view.
var mainSectionView = Backbone.View.extend({
    el: $('body'),

    initialize: function(mainSection, sideBarSection, options){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(mainSection, sideBarSection);
    },

    render: function(mainSection, sideBarSection){
        this.$el.empty();  // delets all elements from 'body' element
        var mainSectionTemplate = new EJS({url:'/javascripts/1P/templates/mainSection.ejs'}).render(mainSection);
        this.$el.append(mainSectionTemplate);
    }
});
