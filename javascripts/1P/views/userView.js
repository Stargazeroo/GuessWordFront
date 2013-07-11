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
                userSectionLoad();
            }
        }
        if(window.location.href == "http://guessword.com/"){
            accordion();
        }
    },

    logout: function() {
        $.cookie('login', '', { expires: -1 });
        window.location.href = "http://guessword.com/#login";
        this.$("#userSection").remove();
        this.$("#logoutButton").remove();
        this.$el.unbind();
        localStorage.clear();
    },

    logPopout: function() {
        $('#logoutButton').tooltip({
            'title'    : $.i18n.prop('app_logout'),
            'placement': 'right'
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
        active: (window.location.href === "http://guessword.com/#training")? 1:0,
        icons: { "header": "defaultIcon", "activeHeader": "selectedIcon" } 
    });
}

function userSectionLoad() {
    $("#userSection").css("display", "none");
    $("#userSection").fadeIn(1500);
}
