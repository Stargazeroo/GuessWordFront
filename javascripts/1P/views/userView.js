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
            window.location.href = loginIndex;
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
        if(window.location.href == "http://guessword.com/"){
            accordion();
        }
    },

    logout: function() {
        $.cookie('login', '', { expires: -1 });
        window.location.href = loginIndex;
        this.$("#userSection").remove();
        this.$("#logoutButton").remove();
        this.$el.unbind();
        if (localStorage['neverShow']) {
            localStorage.clear();
            localStorage.setItem('neverShow', JSON.stringify(1));
        } else {
            localStorage.clear();
        }
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