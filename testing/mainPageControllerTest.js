//---------------------------Main Page Controller Test ----------------//

module('mainPageController test', {
    setup: function() {
        $.cookie('login','Yurec');
        localStorage.main = JSON.stringify({'test':'moklocation'});
        this.callPageController = new mainPageController(customWindow);
    },
    teardown: function() {
        delete this.callPageController;
        $('#language').empty();
        $('#userBlock').empty();
        $('#contentBlock').empty();
    }
});
test('Views call test',function(){
    expect(2);
    ok($('#language').children('#sideBarSection').hasClass('btn-group'),"Element div with id=sideBarSection with class='btn-group', added into element with id='language'");
    ok($('#userBlock').children('#userSection'),"Element div with id=userSection, added into element with id='language'");
});