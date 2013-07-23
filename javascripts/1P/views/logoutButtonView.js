// **logoutButtonView**: creates a logout button and deletes a login from cookies.
var logoutButtonView = Backbone.View.extend({
    el: $('#logoutButton'),

    events: {
        "click #logoutButton" : "logout"
    },

    initialize: function(logInFields,logInButtons){
        _.bindAll(this, 'render', 'logout'); // fixes loss of context for 'this' within methods
        this.render(logoutButton);
    },
    
    render: function(logInFields,logInButtons){
        console.log('lsls');
        var logoutButtonTemplate = new EJS({url:'/javascripts/1P/templates/logoutButton.ejs'}).render(logoutButton);
        this.$el.append(logoutButtonTemplate);
    },

    logout: function(e) {
        e.preventDefault();
        $.cookie('login', null);
    }
});