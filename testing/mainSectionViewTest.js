module('mainSectionView test', {
    setup: function() {
        $.cookie('login','presentmok');
        this.mainPageModel = new mainPage(); //getting data from mainPage model
        this.call = new mainSectionView();
        self = this;       
    },
    teardown: function() {
        this.call = null;
        localStorage.removeItem('main');
        $('#contentBlock').empty();
    }
});
test('render function test', function(){
    expect(1);
    $.cookie('login',null,{ expires: -1 });
    equal(this.call.render(this.mainPageModel.get('mainSection'),customWindow),false,"returned false")
});
test('clickFunc function test', function() {
    $('#contentBlock').append('<div id="mainSection"><a class="rotate"></a><a id="siblings"></a></div>');
    $("#mainSection a").mouseout(function(event){
        self.call.clickFunc(event,customWindow);
        $(event.currentTarget).trigger('webkitAnimationEnd').trigger('oanimationend').trigger('msAnimationEnd').trigger('animationend');
    });
    $("#mainSection a").trigger('mouseout');
    equal($("#mainSection a").attr("class"),'rotate clickAnim clickAnimSiblings',"clickAnim class added");

});
test('skAnim function test', function() {
    expect(1);
    $('#contentBlock').append('<div id="sk"></div>');
    self.call.skAnim()
    equal($("#sk").hasClass("skDissapear"),true,"skDissapear class removed");
});


