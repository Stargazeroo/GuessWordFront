// **userExtendedView instance**: Instantiate main app view.
var userTrainingView = userView.extend({

    initialize: function(userData, currentWindow){
        _.extend(this,userView.prototype.events,this.events);
        new userView(currentWindow);
        this.render(userData, currentWindow);
        accordion();
    },
    
    events: {
        "click #backButt" : "goBack"
    },

    render: function(userData, currentWindow){
        currentWindow = currentWindow || window;
        if (!($.cookie("login"))){
            currentWindow.location.href = loginIndex;
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
    
    goBack: function(e, backWindow) {
        e.preventDefault();
        e.stopPropagation();
        currentWindow = backWindow || window;
        currentWindow.history.back();
    }
});