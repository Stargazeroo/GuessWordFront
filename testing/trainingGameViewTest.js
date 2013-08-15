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
module('trainingGameView test', {
    setup: function() {
        localStorage.reload = 0;
        trainingModelObj.set('settings',{difficulty:'easy'});
        $.cookie('login','presentmok');
        this.call = new trainingGameView();
        self = this;       
    },
    teardown: function() {
        this.call = null;
        localStorage.removeItem('main');
        $('#contentBlock').empty();
    }
});
test("nextWord function test",function(){
    $('#contentBlock').append("<div id='chosenWord'></div>")
    nextWord();
    ok(true);
});