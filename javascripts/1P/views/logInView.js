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
            window.location.href = "http://guessword.com/";
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
            success: function(data, status, ourcookie){
                console.log(ourcookie.getResponseHeader('Set-Cookie'));
                if (!jQuery.isEmptyObject(data)){                    
                    $.cookie('login', JSON.stringify(data));
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
    $("body").css("display", "none");
    $("body").fadeIn(100);
    $("#logInForm").fadeIn(4000);
    $("#welcomeWords  h2").lettering('words').children("span").lettering().children("span").lettering();
    $('#logInForm input').css({
        "background": "linear-gradient(to bottom, #e1ffff 0%,#e1ffff 7%,#e1ffff 12%,#fdffff 12%,#e6f8fd 30%,#c8eefb 54%,#bee4f8 75%,#b1d8f5 100%)",
        "width": "170px"
    });
    $('#submitButton').css({
        "width" : "100%",
        "padding" : "2px 0px",
        "letter-spacing":"2px",
        "font-weight" : "bold",
        "margin-top" : "2px"
    });

}
