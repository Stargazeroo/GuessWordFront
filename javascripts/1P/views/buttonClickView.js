// **buttonClickView instance**: Instantiate main app view.
var buttonClickView = Backbone.View.extend({
    el: $('body'),

    initialize: function(btn) {
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(btn);
    },
    
    render: function(btn) {
        this.$el.empty(); // delets all elements from 'body'
        var btnClickTemplate = new EJS({url:'/javascripts/1P/templates/buttonClick.ejs'}).render(btn);
        this.$el.append(btnClickTemplate);
    }
});
