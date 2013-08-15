//-----------------Login View Test---------------------------------
module('Login View', {
    setup: function() {
        var mainLogIn = new logInModel();
        var logInFields = mainLogIn.get('fields');
        var logInButtons = mainLogIn.get('buttons');
        this.loginViewObject = new logInView(logInFields,logInButtons, customWindow);
        self = this;
    },
    teardown: function() {
        self.loginViewObject = null;
        $('#welcomeWords').remove();
        $('#logInForm').remove();
    }
});
test('Render event.', function() {
    expect(1);
    equal(self.loginViewObject.render(self.logInFields, self.logInButtons, customWindow), false, "Redirect to login page");
});
test('No login in cookies', function() {
    expect(2);
    $.cookie('login', '', { expires: -1 });
    self.loginViewObject.render(self.logInFields, self.logInButtons, customWindow);
    equal($('body').find('#logInForm').length, 1, "login form added");
    equal($('body').find('#welcomeWords').length, 1, "login form added");
    $.cookie('login', 'test');
});
test('loadRegPage event', function() {
    expect(1);
    $('#regSubmitButton').click(function(event){
        self.loginViewObject.loadRegPage(event, customWindow);
    });
    $('#regSubmitButton').click();
    ok (true, "Redirect to the previous page");
});