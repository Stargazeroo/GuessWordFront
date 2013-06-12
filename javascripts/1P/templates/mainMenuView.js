var ListView = Backbone.View.extend({
    el: $('body'),
    formRegistr: $('#regFormDiv'),

    // `initialize()`: Automatically called upon instantiation. Where you make 
    //all types of bindings, _excluding_ UI events, such as clicks, etc.
    initialize: function(){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(); // not all views are self-rendering. This one is.
    },
    // `render()`: Function in charge of rendering the entire view in `myDiv`. Needs to be manually called by the user.
    render: function(){
        var data = new registrationForm();
        var inputFields = data.get('fields');
        var button = new registrationForm();
        var buttonGet = button.get('buttons');
        var regForm = new EJS({url:'/javascripts/1P/templates/regPageTemplate.ejs'}).render(inputFields);
        this.$el.append(regForm);
        var confirmButton = new EJS ({url:'/javascripts/1P/templates/regPageTemplate.ejs'}) .render(buttonGet);
        this.#el.append(confirmButton);
    }
});
