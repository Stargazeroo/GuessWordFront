var ListView = Backbone.View.extend({
    el: $('body'),
    
    // `initialize()`: Automatically called upon instantiation. Where you make 
    //all types of bindings, _excluding_ UI events, such as clicks, etc.
    initialize: function(regModelInputFields, regModelButtons){
        
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(regModelInputFields, regModelButtons); // not all views are self-rendering. This one is.
    },
    // `render()`: Function in charge of rendering the entire view in `myDiv`. Needs to be manually called by the user.
    render: function(regModelInputFields, regModelButtons){
        
        var regForm = new EJS({url:'/javascripts/1P/templates/regPageTemplate.ejs'}).render(regModelInputFields);
        this.$el.append(regForm);
        var confirmButton = new EJS ({url:'/javascripts/1P/templates/regPageTemplate.ejs'}) .render(regModelButtons);
        this.$el.append(confirmButton);
    }
});
