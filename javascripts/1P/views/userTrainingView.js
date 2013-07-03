// **userExtendedView instance**: Instantiate main app view.
var userTrainingView = userView.extend({

    initialize: function(userData){
        _.extend(this,userView.prototype.events,this.events);
        new userView();
        this.render(userData);
        accordion();
    },

    render: function(userData){  
        if (!($.cookie("login"))){
            window.location.href = "http://guessword.com/#login";
        }else{    
            this.$("#userTrainingSection").unbind();
            var userTrainingTemplate = new EJS({url:'/javascripts/1P/templates/userTrainingTemplate.ejs'}).render(userData.attributes);

            if (!(this.$('#accordion').children("#userTrainingSection")).length){
                this.$('#accordion').append(userTrainingTemplate);
            }
        }
    }
});
