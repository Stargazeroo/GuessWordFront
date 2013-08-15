// **userView instance**: Information about the user.
var userView = Backbone.View.extend({
    el: $('#userBlock'),

    events: {
        "click #logoutButton"    : "logout",
        "mouseover #logoutButton": "logPopout",
        "mouseout #logoutButton" : "logPopoutOff"
    },

    initialize: function(currentWindow){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(currentWindow);
    },

    render: function(currentWindow){
        currentWindow = currentWindow || window;
        if (!($.cookie("login"))){
            currentWindow.location.href = loginIndex;
            return false;
        } 
        this.$el.empty(); 
        this.$el.unbind();
        var userData = new userModel();
        var userTemplate = new EJS({url:'/javascripts/1P/templates/userTemplate.ejs'}).render(userData.attributes);

        if (!(this.$el.children("#userSection")).length){
            this.$el.append(userTemplate);
            userSectionLoad();
        }
        if(currentWindow.location.href == mainIndex){
            accordion();
        }
    },

    logout: function(e, currentWindow) {
        $.cookie('login', '', { expires: -1 });
        this.$("#userSection").remove();
        this.$("#logoutButton").remove();
        this.$el.unbind();
        localStorage.clear();
        currentWindow = currentWindow || window;
        currentWindow.location.href = loginIndex;
    },

    logPopout: function() {
        $('#logoutButton').tooltip({
            'title'    : $.i18n.prop('app_logout'),
            'placement': 'right'
        });
        $('#logoutButton').tooltip('show');
    },
    
    logPopoutOff: function() {
        $('#logoutButton').tooltip('hide');
    } 
});