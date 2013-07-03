var logInView = Backbone.View.extend({
    el: $('#contentBlock'),
    events: {
        "click #submitButton" : "submit",
        "click #regSubmitButton" : "loadRegPage"
    },
    initialize: function(logInFields,logInButtons){
        _.bindAll(this, 'render', 'submit',"loadRegPage");
        this.render(logInFields, logInButtons);
    },
    
    render: function(logInFields,logInButtons){
        if ($.cookie("login")){
            window.location.href = "http://guessword.com";
        }else{
            this.$el.empty();
            var fields = new EJS({url:'/javascripts/1P/templates/fieldsLogin.ejs'}).render(logInFields);
            this.$el.append(fields);
            var buttons = new EJS({url:'/javascripts/1P/templates/buttonsLogin.ejs'}).render(logInButtons);
            this.$("#logInForm").append(buttons);
	    loginPageLoad();
        }
    },

    submit: function(e){
        e.preventDefault();
        var userInform = new logInModel({
            userLogIn: this.$('#login').val(),
            userPassword: this.$('#pass').val(),
        });
        var userInformJSON = userInform.toJSON();
        $.ajax({
            type: 'POST',
            dataType:'json',
            url: "http://localhost:5000/login/index",
            data: userInformJSON,
            success: function(data, status){
                if (!jQuery.isEmptyObject(data)){ 
                    localStorage.setItem('main', JSON.stringify(data)); //adding main info about the user to localstorage
                    $.cookie('login', JSON.parse(localStorage['main']).login);
                    window.location.href = "http://guessword.com/";
                }else{
                    alert("No such user");
                }
            },
            error: function(data, status){
                console.log(status)
            }
        })
        $('#login,#pass').val('');
    },

    loadRegPage: function(e){        
        e.preventDefault();
        window.location.href = "http://guessword.com/#registration";
    }
    
});
function loginPageLoad() {
    $("#logInForm").css("display", "none");
    $("#logInForm").fadeIn(8000);
    $("#welcomeWords  h2").lettering('words').children("span").lettering().children("span").lettering();
}
