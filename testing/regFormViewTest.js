//---------------------------Registration View Test ----------------//
var customWindow = {
    location: {
        href: ""
    },
    history: {
        back: function() {
            return false;
        }
    }
}
module('regFromView test', {
    setup: function() {
        this.regFormView = new registrationView();
        self = this;
    },
    teardown: function() {
        delete this.regFormView;
        $('#contentBlock').empty();
    }
});
test('Ajax success call test', function() {
    var mock = [];
    var fakeData = {
        SUCCESS: "1"
    }
    var mock = sinon.mock(jQuery).expects("ajax").atMost(2).yieldsTo("success", fakeData);
    $('#contentBlock').append("<button id='reg_button'></button>");
    $('#reg_button').click(function(event){
        self.regFormView.onSubmit(event);
    });
    $('#reg_button').click();
    ok(true);
    jQuery.ajax.restore();
});
test('Ajax error call test', function() {
    var mock = [];
    var fakeError = {responseText:JSON.stringify({test:'test'})};
    var mock = sinon.mock(jQuery).expects("ajax").atMost(2).yieldsTo("error", fakeError);
    $('#contentBlock').append("<button id='reg_button'></button>");
    $('#reg_button').click(function(event){
        self.regFormView.onSubmit(event);
    });
    $('#reg_button').click();
    ok(true);
    jQuery.ajax.restore();    
});
test('validMail function test',function(){
    expect(4);
    $('#contentBlock').append("<input id='mail_id'>");
    $('#mail_id').val('email@email.ua');
    this.regFormView.validMail();
    $('#mail_id').keyup();
    equal(stopMail,0,'mail (email@email.ua) is correct');
    $('#mail_id').val('emailemail.ua');
    $('#mail_id').keyup();
    equal(stopMail,1,'mail (emailemail.ua) is incorrect');
    $('#mail_id').val('email@emailua');
    $('#mail_id').keyup();
    equal(stopMail,1,'mail (email@emailua) is incorrect');
    $('#mail_id').val('emailemailua');
    $('#mail_id').keyup();
    equal(stopMail,1,'mail (emailemailua) is incorrect');
});
test('validLogin function test',function(){
    $('#contentBlock').append("<input id='login'>");
    $('#login').val('testlogin');
    this.regFormView.validLogin();
    $('#login').keyup();
    equal(stopLogin,0,'login (testlogin) is correct');
    $('#login').val('%%testlogin');
    $('#login').keyup();
    equal(stopLogin,1,'login %%testlogin is incorrect');
});
test('validPass function test',function(){
    $('#contentBlock').append("<div id='passContainer'><input id='pass'><input id='repass_id'></div>");
    $('#pass').val('testpass');
    $('#repass_id').val('testpass');
    this.regFormView.validPass();
    $('#repass_id').keyup();
    equal(stopPass,0,'password (testpass) and repassword (testpass) is equal');
    $('#pass').val('testpass');
    $('#repass_id').val('incorrecttestpass');
    this.regFormView.validPass();
    $('#repass_id').keyup();
    equal(stopPass,1,"password (testpass) and repassword (incorrecttestpass) isn't equal");
});
test('popupErrorClose function test',function(){
    $('#contentBlock').append("<div id='parrent1'><div id='parrent2'><button id='errorBtnClose'></button></div></div>");
    $('#errorBtnClose').click(function(event){
        self.regFormView.popupErrorClose(event);
    });
    $('#errorBtnClose').click();
    equal($('#parrent1').css('display'),'none','popup closed');
});
test('popupSuccessClose function test',function(){
    $('#contentBlock').append("<div id='parrent1'><div id='parrent2'><button id='successBtnClose'></button></div></div>");
    $('#successBtnClose').click(function(event){
        self.regFormView.popupSuccessClose(event, customWindow);
    });
    $('#successBtnClose').click();
    equal($('#parrent1').css('display'),'none','popup closed');
});
test('_isStop function test', function(){
    $('#contentBlock').append("<button id='reg_button'></button>");
    _isStop(0,0,0);
    equal($('#contentBlock').attr('disabled'),undefined,'registration submit button enabled')
})



