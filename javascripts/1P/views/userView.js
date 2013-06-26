// **mainPageView instance**: Instantiate main app view.
var userView = Backbone.View.extend({
    el: $('#userBlock'),

    events: {
        "click #logoutButton" : "logout",
        "mouseover #logoutButton" : "logPopout",
        "mouseout #logoutButton" : "logPopoutOff"
    },

    initialize: function(){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render();
    },

    render: function(){
        if (!$.cookie("login")){
            window.location.href = "http://guessword.com/#login";
        }else{    
            this.$el.unbind();
            var data = JSON.parse($.cookie('login'));
            var userTemplate = new EJS({url:'/javascripts/1P/templates/userTemplate.ejs'}).render(data);
            jQuery.fn.exists = function() {
                return $(this).length;
            }
            if ((this.$el.children("#userSection")).exists()){
                console.log("exists");
            } else {
                this.$el.append(userTemplate);
            }
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
            'title': 'Logout',
            'placement': 'bottom'
            });
        $('#logoutButton').tooltip('show')
    },
    
    logPopoutOff: function() {
        $('#logoutButton').tooltip('hide')
    }
});