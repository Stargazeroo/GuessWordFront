// **mainPageView instance**: Instantiate main app view.
var sideBarSectionView = Backbone.View.extend({
    el: $('body'),

    initialize: function(mainSection, sideBarSection){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(mainSection, sideBarSection);
    },

    events: {
        "click #sideBarSection": "changeLan"
    },

    changeLan: function(event) {
        var language_id = event.target.id; // id of the clicked button indicating the language
        jQuery.i18n.properties({
            name:'app',
            path:'/javascripts/1P/localization/',
            mode:'map',
            language: language_id,
        });
        console.log("Language changed to "+language_id);
        this.start();
    },

    render: function(mainSection, sideBarSection){
        this.$el.unbind(); //helps to avoid zombie views
        var sideBarSectionTemplate = new EJS({url:'/javascripts/1P/templates/sideBarSection.ejs'}).render(sideBarSection);
        this.$el.append(sideBarSectionTemplate);
    },

    close: function () {
        this.$el.empty();
        this.$el.unbind();
    },

    start: function() {
        this.close(); //closes a zombie view
        Backbone.history.loadUrl(Backbone.history.getFragment())
    }
});
