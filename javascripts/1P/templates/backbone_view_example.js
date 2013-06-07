(function($){
// **ListView class**: Our main app view.
var logIn = Backbone.Model.extend({
    defaults: {
        fields: {    
            login: {
                type: "text",
                name: "login",
                id: "login"
            },
            password: {
                type: "password",
                name: "pass",
                id: "pass"
            },
        },				
        buttons: {
            logInButton: {
                type: "submit",
                name: "submitButton",
                value: "Enter",
                id: "submitButton"
            },
            regButton: {
                type: "submit",
                name: "regSubmitButton",
                value: "Registration",
                id: "regSubmitButton"
            }
        }
    }
});

var ListView = Backbone.View.extend({
	el:$('body'),
// `initialize()`: Automatically called upon instantiation. Where you make
//all types of bindings, _excluding_ UI events, such as clicks, etc.
initialize: function(){

_.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

this.render(); // not all views are self-rendering. This one is.
},
// `render()`: Function in charge of rendering the entire view in `myDiv`. Needs to be manually called by the user.
render: function(){
    var data = new logIn();
    var dict = data.get('fields');
    var dict2 = data.get('buttons');
    //this.$el.html(_.size(dict))
    var inputFields = new EJS({url:'/javascripts/1P/templates/template.ejs'}).render(dict);
    var inputButtons = new EJS({url:'/javascripts/1P/templates/template2.ejs'}).render(dict2);
    this.$el.append(inputFields).append(inputButtons);
}
});
var listView = new ListView();// **listView instance**: Instantiate main app view.
})(jQuery);
