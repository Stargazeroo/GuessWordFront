//-----------------User View Test---------------------------------
module('UserView', {
    setup: function() {
        this.userViewObject = new userView(customWindow);
        self = this;
    },
    teardown: function() {
        self.userViewObject = null;
        $.cookie('login', 'test');
        $('#userSection').remove();
        customWindow.location.href = '';
    }
});
test('Render event.', function() {
    expect(1);
    equal($('#accordion').children().length, 2, "Accordion appended");
});
test('No login in cookies', function() {
    expect(1);
    $.cookie('login', '', { expires: -1 });
    equal(self.userViewObject.render(customWindow), false, "Redirect to login page");
});
test('Accordion testing', function() {
    expect(1);
    customWindow.location.href = mainIndex;
    this.userViewObject = new userView(customWindow);
    equal($('#accordion').children().length, 2, "Accordion initializing");
});
test('Tooltip on show.', function() {
    expect(1);
    self.userViewObject.logPopout();
    equal($('body').find('div.tooltip-inner').length, 1, "Tooltip showing");
});
test('Tooltip on hide.', function() {
    expect(1);
    self.userViewObject.logPopoutOff();
    equal($('body').find('div.tooltip-inner').length, 0, "Tooltip hiding");
});
test('Logout event.', function() {
    expect(4);
    self.userViewObject.logout(window.event, customWindow);
    equal($.cookie('login'), undefined, "Cookies removed");
    equal($('body').find('div#userSection').length, 0, "User section removed");
    equal($('body').find('div#logoutButton').length, 0, "Logout button removed");
    equal(window.localStorage.length, 0, "LocalStorage cleared");
});
