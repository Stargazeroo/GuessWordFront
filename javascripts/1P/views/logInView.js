var logInView = Backbone.View.extend({
    el: $('#contentBlock'),
    events: {
        "click #submitButton" : "submit",
        "click #regSubmitButton" : "loadRegPage",
        "click #facebook" : "facebook",
        "click #test" : "testPOPUP"
    },


    initialize: function(logInFields,logInButtons){
        _.bindAll(this, 'render', 'submit',"loadRegPage");
        this.render(logInFields, logInButtons);
    },
  
    render: function(logInFields,logInButtons){
        window.fbAsyncInit = function() {
            FB.init({
                appId: '531893653536303',
                channelUrl: 'http://www.guessword.com/channel.html', 
                status: true,
                cookie: true,
                xfbml: true
            });         
        };

        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {return;}
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/all.js";
                fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        if ($.cookie("login")){
            window.location.href = "http://guessword.com/";
        }else{
            this.$el.empty();
            var fields = new EJS({url:'/javascripts/1P/templates/fieldsLogin.ejs'}).render(logInFields);
            this.$el.append(fields);
            var buttons = new EJS({url:'/javascripts/1P/templates/buttonsLogin.ejs'}).render(logInButtons);
            this.$("#logInForm").append(buttons);
	    loginPageLoad();
        $('body').append('<div id="fb-root"></div>')
        //$('body').append('<fb:login-button show-faces="false" width="200" max-rows="1" id="signInFacebook">Sign in</fb:login-button>')


        }


    },
    facebook: function(e){
        e.preventDefault();
        FB.login(function(response) {
            if (response.status === "connected") {   
                FB.api('/me', function(response) {
                    var userAPIJson = ({
                        "facebookLogin":"response.login",
                        "facebookID" : "response.id",
                        "facebookLocale" : "response.locale",
                        "facebookEmail" : "response.email",
                        "facebookBirthday" : "resultB"
                    });

                    var facebookBirthday = response.birthday;
                    var year = facebookBirthday.slice(6);
                    var month = facebookBirthday.slice(0,2);
                    var day = facebookBirthday.slice(3,5);
                    var resultB = year + '-' + month + '-' + day;
                    console.log("Fuck Yeah");                    
                    console.log(resultB);
                    
                    
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: "http://localhost:5000/login/index",
                        data: userAPIJson,
                        success: function(data,status,ourcookie){
                            console.log(ourcookie.getResponseHeader('Set-Cookie'));
                            if (!jQuery.isEmptyObject(data)){                    
                                $.cookie('login', JSON.stringify(data));
                                window.location.href = "http://guessword.com/";
                            }
                        },
                        error: function(data, status){
                            console.log(status)
                        }
                    })
                    
                });            
           }
           else{
            console.log("No");
           }
        }, {scope: 'user_birthday,email'});
    },

    testPOPUP: function(e){
        e.preventDefault();
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
    },
  
    
});
function loginPageLoad() {
    $("#logInForm").css("display", "none");
    $("#logInForm").fadeIn(8000);
    $("#welcomeWords  h2").lettering('words').children("span").lettering().children("span").lettering();
}

