//---------------------------trainingStartPage Controller Test ----------------//

module('trainingStartPageController test', {
    setup: function() {
        $.cookie('login','ser');
        //localStorage.main = JSON.stringify({'test':'moklocation'});
        this.trainingStartControllerObj = new trainingStartPageController();
    },
    teardown: function() {
        this.trainingStartControllerObj = null;
        $('#language').find('#sideBarSection').remove();
        $('#userBlock').find('#userSection').remove();
        $('#contentBlock').find('#trainingStartPage').remove();
    }
});
// test('Views call test',function(){
//     expect(1);
//     //ok($('#language').children('#sideBarSection'));
//     ok(true);
// });