var registrationView = Backbone.View.extend({
    el: $('#contentBlock'),
    events: {
        "click #reg_button" : "onSubmit",
        "focus #mail_id " : "validMail",
        "focus #login " : "validLogin",
        "focus #repass_id" : "validPass",
    },    
    initialize: function(regModelInputFields, regModelButtons){        
        _.bindAll(this, 'render', 'onSubmit','validMail', 'validLogin', 'validPass');
        this.render(regModelInputFields, regModelButtons);
    },
    render: function(regModelInputFields, regModelButtons){ 
        this.$el.unbind();  
        this.$el.empty();
        var regForm = new EJS({url:'/javascripts/1P/templates/regFormInputsList.ejs'}).render(regModelInputFields);
        this.$el.append(regForm);
        var confirmButton = new EJS ({url:'/javascripts/1P/templates/regFormSubmitButton.ejs'}) .render(regModelButtons);
        this.$('#regForm').append(confirmButton);   
	regPageLoad();
    },
    onSubmit: function(e){
        e.preventDefault(); 
        var representModel = new regRepresentationDataModel({
            login: this.$("#login").val(),
            email: this.$("#mail_id").val(),
            password: this.$("#pass").val(),
            dob: this.$("#dob_id").val(),
            location: this.$("#location_id").val()
        });   
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/registration/index",
            dataType: 'json',
            data: representModel.toJSON(),
            success: function(data){
                console.log(data)
                if (data.ANSWER == "success"){
                    alert("Registration was successful");
                    window.location.href = "http://guessword.com";
                }else{                    
                    alert("There are some problems")
                }
            },
            error: function(data, status){
                console.log(status)
            }
        });
    },
    validMail: function(){
        $("#mail_id").keyup(function(){
            var mail = $(this).val();
            if (!_isValidMailAddress(mail)){
                $(this).siblings("i.icon-remove").css('display','inline-block').siblings("i.icon-ok").css('display','none');
                stopMail = 1;
            } else {
                $(this).siblings("i.icon-ok").css('display','inline-block').siblings("i.icon-remove").css('display','none');
                stopMail = 0;
            }            
            _isStop(stopPass,stopLogin,stopMail)
        })
    },    
    validLogin: function(){
        $("#login").keyup(function(){
            var login = $(this).val();
            if (!_isValidLogin(login)){
                $(this).siblings("i.icon-remove").css('display','inline-block').siblings("i.icon-ok").css('display','none');
                //console.log('ololo');
                stopLogin = 1;
            } else {
                $(this).siblings("i.icon-ok").css('display','inline-block').siblings("i.icon-remove").css('display','none');
                stopLogin = 0;
                //console.log('ololo1');
            }
            _isStop(stopPass,stopLogin,stopMail)
        })
    },

    validPass: function(){
        $("#repass_id").keyup(function(){
            if (!($(this).val() === $("#pass").val())){
                $(this).siblings("i.icon-remove").css('display','inline-block').siblings("i.icon-ok").css('display','none');
                stopPass = 1;
                //console.log('valid');
            } else {
                $(this).siblings("i.icon-ok").css('display','inline-block').siblings("i.icon-remove").css('display','none');
                //console.log('invalid');
                stopPass = 0;
            }
            _isStop(stopPass,stopLogin,stopMail)
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
    } else {
        $("#reg_button").attr("disabled", "disabled");
    }
};
function regPageLoad() {
    $("#regForm").css("display", "none");
    $("#regForm").fadeIn(2000);
    $('#regForm input').css({
        "background": "linear-gradient(to bottom, #e1ffff 0%,#e1ffff 7%,#e1ffff 12%,#fdffff 12%,#e6f8fd 30%,#c8eefb 54%,#bee4f8 75%,#b1d8f5 100%)",
        "width": "200px"
    });
    $('#reg_button').css({
        "width" : "100%",
        "padding" : "5px 0px",
        "margin-top" : "5px"
    });
};
