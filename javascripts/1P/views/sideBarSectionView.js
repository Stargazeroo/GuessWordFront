// **mainPageView instance**: Instantiate main app view.
var sideBarSectionView = Backbone.View.extend({
    el: $('#language'),

    initialize: function(sideBarSection){
        _.bindAll(this, 'render', 'changeLan'); // fixes loss of context for 'this' within methods
        this.render(sideBarSection);
    },

    render: function(sideBarSection){
        this.$el.unbind(); //helps to avoid zombie views
        var sideBarSectionTemplate = new EJS({url:'/javascripts/1P/templates/sideBarSection.ejs'}).render(sideBarSection);
        if (!(this.$el.children("#sideBarSection")).length) {
            this.$el.append(sideBarSectionTemplate);
        }
    },

    events: {
        "click #sideBarSection input": "changeLan",
    },

    changeLan: function(event) {
        var language_id = event.target.id; // id of the clicked button indicating the language
        jQuery.i18n.properties({
            name:'app',
            path:'/javascripts/1P/localization/',
            mode:'map',
            language: language_id
        });
        this.start();
        localStorage.setItem('language', JSON.stringify(language_id));
    },

    close: function () {
        this.$el.empty();
        this.$el.unbind();
    },

    start: function(customBackbone) {
        var currentBackbone = customBackbone || Backbone;
        this.close(); //closes a zombie view
        currentBackbone.history.loadUrl(currentBackbone.history.getFragment());
    }

});