var logInView = Backbone.View.extend({
    el: $('#contentBlock'),
    events: {
        "click #submitButton" : "submit",
        "click #regSubmitButton" : "loadRegPage",
        "click #facebook" : "facebook"
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
            $('body').append('<div id="fb-root"></div>');
        }
    },

    facebook: function(e){
        e.preventDefault();
        FB.login(function(response) {
            if (response.status === "connected") {   
                FB.api('/me', function(response) {
                    var facebookBirthday = response.birthday;
                    var year = facebookBirthday.slice(6);
                    var month = facebookBirthday.slice(0,2);
                    var day = facebookBirthday.slice(3,5);
                    var resultB = year + '-' + month + '-' + day;
                    var userAPIJson = ({
                        "facebookLogin":response.login,
                        "facebookID" : response.id,
                        "facebookLocale" : response.locale,
                        "facebookEmail" : response.email,
                        "facebookBirthday" : resultB
                    });
                    
                    $.ajax({
                        type: 'POST',
                        dataType: 'json',
                        url: "http://localhost:5000/login/facebook",
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
                    localStorage.setItem('main', "");
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
    // $("#facebookButt").css({
    //     "margin-top" : "0px"
    // });

}

