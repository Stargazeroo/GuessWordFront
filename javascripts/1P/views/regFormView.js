var ListView = Backbone.View.extend({
    el: $('body'),
    events: {
        "focus #mail_id " : "validMail",
        "focus #login " : "validLogin",
        "focus #repass_id" : "validPass",


    },
    initialize: function(regModelInputFields, regModelButtons){        
        _.bindAll(this, 'render', 'validMail', 'validLogin', 'validPass');
        this.render(regModelInputFields, regModelButtons);
    },
    render: function(regModelInputFields, regModelButtons){        
        var regForm = new EJS({url:'/javascripts/1P/templates/regFormInputsList.ejs'}).render(regModelInputFields);
        this.$el.append(regForm);
        var confirmButton = new EJS ({url:'/javascripts/1P/templates/regFormSubmitButton.ejs'}).render(regModelButtons);
        this.$('#regForm').append(confirmButton);
    },
   
    validMail: function(){
        $("#mail_id").keypress(function(){
            var mail = $(this).val();                    
            if (!_isValidMailAddress(mail)){
                $(this).siblings("i.icon-remove").css('display','inline-block').siblings("i.icon-ok").css('display','none');
                stopMail = 1;
                console.log(stopMail);
            } else {
                $(this).siblings("i.icon-ok").css('display','inline-block').siblings("i.icon-remove").css('display','none');
                stopMail = 0;
                console.log(stopMail);
                _isStop(stopPass,stopLogin,stopMail)
            }
        })
    },
    
    validLogin: function(){
        $("#login").keyup(function(){
            var login = $(this).val();                    
            if (!_isValidLogin(login)){
                $(this).siblings("i.icon-remove").css('display','inline-block').siblings("i.icon-ok").css('display','none');
                //console.log('ololo');
                stopLogin = 1;
                console.log(stopLogin);
            } else {
                $(this).siblings("i.icon-ok").css('display','inline-block').siblings("i.icon-remove").css('display','none');
                stopLogin = 0;
                console.log(stopLogin);
                //console.log('ololo1');
                _isStop(stopPass,stopLogin,stopMail)
            }
        })
    },

    validPass: function(){
        $("#repass_id").keyup(function(){
            if (!($(this).val() === $("#pass").val())){
                $(this).siblings("i.icon-remove").css('display','inline-block').siblings("i.icon-ok").css('display','none');
                stopPass = 1;
                console.log(stopPass);
                //console.log('valid');
            } else {
                $(this).siblings("i.icon-ok").css('display','inline-block').siblings("i.icon-remove").css('display','none');
                //console.log('invalid');
                stopPass = 0;
                console.log(stopPass);
                _isStop(stopPass,stopLogin,stopMail)
        }
    })
    },

});

var stopMail = 1;
var stopLogin = 1;
var stopPass = 1;

    function _isValidLogin(login) {
        var pattern = new RegExp(/^[A-Za-z0-9 ]{3,20}$/);
        return pattern.test(login);
    };

    function _isValidMailAddress(email) {
        var pattern = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return pattern.test(email);
    };

    function _isStop(stopPass,stopLogin,stopMail) {
      if (!stopMail && !stopLogin && !stopPass) {
            $("#reg_button").removeAttr('disabled');
            console.log('function complite')
        } else {
            $("#reg_button").attr("disabled", true);
            console.log('button disable')
        };
      }