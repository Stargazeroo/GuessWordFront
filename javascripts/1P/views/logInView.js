var logInView = Backbone.View.extend({
    el: $('body'),
    events: {
        "click #submitButton" : "submit"
    },
    initialize: function(logInFields,logInButtons){
        _.bindAll(this, 'render', 'submit');
        this.render(logInFields, logInButtons); 
    },
    
    render: function(logInFields,logInButtons){
        
        var fields = new EJS({url:'/javascripts/1P/templates/fieldsLogin.ejs'}).render(logInFields);
        this.$el.append(fields);
        var buttons = new EJS({url:'/javascripts/1P/templates/buttonsLogin.ejs'}).render(logInButtons);
        
        this.$("#logInForm").append(buttons);
    },

    submit: function(e){
        e.preventDefault();
        var userInform = new logInDataModel({
             userLogIn: this.$('#login').val(),
             userPassword: this.$('#pass').val(),
        });
        var userInformJSON = userInform.toJSON();

        $.ajax({
            type: 'POST',
            dataType:'json',
            url: "http://localhost:5000/word/json",
            data: userInformJSON,
            success: function(data){
                console.log(data);
            },
            error: function(data, status){
                console.log(status)
            }            
        })
        $('#login,#pass').val('');
    },
    
});
