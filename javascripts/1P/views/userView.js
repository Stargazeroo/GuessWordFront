// **userView instance**: Information about the user.
var userView = Backbone.View.extend({
    el: $('#userBlock'),

    events: {
        "click #logoutButton"    : "logout",
        "mouseover #logoutButton": "logPopout",
        "mouseout #logoutButton" : "logPopoutOff"
    },

    initialize: function(){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render();
    },

    render: function(){
        if (!($.cookie("login"))){
            window.location.href = "http://guessword.com/#login";
        }else{   
            this.$el.empty(); 
            this.$el.unbind();
            var userData = new userModel();
            var userTemplate = new EJS({url:'/javascripts/1P/templates/userTemplate.ejs'}).render(userData.attributes);

            if (!(this.$el.children("#userSection")).length){
                this.$el.append(userTemplate);
            }
        }
        if (window.location.href != "http://guessword.com/#training"){
            accordion();
        }
    },

    logout: function() {
        $.cookie('login', '', { expires: -1 });
        window.location.href = "http://guessword.com/#login";
        this.$("#userSection").remove();
        this.$("#logoutButton").remove();
        this.$el.unbind();
    },

    logPopout: function() {
        $('#logoutButton').tooltip({
            'title'    : 'Logout',
            'placement': 'bottom'
        });
        $('#logoutButton').tooltip('show')
    },
    
    logPopoutOff: function() {
        $('#logoutButton').tooltip('hide')
    }
});

function accordion() {
    $("#accordion").accordion({
        autoHeight: false,
        collapsible: true,
        active: url(),
        icons: { "header": "defaultIcon", "activeHeader": "selectedIcon" } 
    });
    function url() {
        if (window.location.href === "http://guessword.com/#training") {
            return 1
        } else {
            return 0
        }
    }
}