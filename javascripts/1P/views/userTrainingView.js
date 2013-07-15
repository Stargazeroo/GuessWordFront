// **userExtendedView instance**: Instantiate main app view.
var userTrainingView = userView.extend({

    initialize: function(userData){
        _.extend(this,userView.prototype.events,this.events);
        new userView();
        this.render(userData);
        accordion();
    },
    
    events: {
        "click #backButt" : "goBack"
    },

    render: function(userData){  
        if (!($.cookie("login"))){
            window.location.href = loginIndex;
            return false;
        }  
        this.$("#userTrainingSection").unbind();
        var backButt = new EJS({url:'/javascripts/1P/templates/backButton.ejs'}).render(userData.attributes);
        var userTrainingTemplate = new EJS({url:'/javascripts/1P/templates/userTrainingTemplate.ejs'}).render(userData.attributes);

        if (!(this.$('#accordion').children("#userTrainingSection")).length){
            this.$('#accordion').append(userTrainingTemplate);
            this.$("#userSection").append(backButt);
        }
    },
    
    goBack: function(e) {
        e.preventDefault();
        //Backbone.history.loadUrl(window.history.back());  not working correctly in chrome
        window.history.back();
    }
});

