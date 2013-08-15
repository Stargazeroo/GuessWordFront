//-----------------User Training View Test------------------------
module('UserTrainingView', {
    setup: function() {
        $.cookie('login', 'test');
        localStorage.setItem('main', JSON.stringify({"test": "test"}));
        localStorage.setItem('training', JSON.stringify({"test": "test"}));
        userModelObject = new userModel();
        this.userTrainingViewObject = new userTrainingView(userModelObject, customWindow);
        self = this;
    },
    teardown: function() {
        self.userTrainingViewObject = null;
        $('#userSection').remove();
        $.cookie('login', 'test');
    }
});
test('Templates appended.', function() {
    expect(2);
    equal($('#accordion').children().length, 4, "Accordion appended");
    equal($('#userSection').children("#backButt").length, 1, "UserSection appended");
});
test('No login in cookies', function() {
    expect(1);
    $.cookie('login', '', { expires: -1 });
    equal(self.userTrainingViewObject.render(self.userModelObject, customWindow), false, "Redirect to login page");
});
test('GoBack event', function() {
    expect(1);
    $('#backButt').click(function(event){
        self.userTrainingViewObject.goBack(event, customWindow);
    });
    $('#backButt').click();
    ok (true, "Redirect to the previous page");
});