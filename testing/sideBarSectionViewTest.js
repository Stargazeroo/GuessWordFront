//-----------------sideBarSection view test---------------------------------
module('sideBarSection view', {
    setup: function() {
        var mainPageModel = new mainPage();
        var sideBarSectionModel = mainPageModel.get('sideBarSection');
        this.sideBarSectionViewObj = new sideBarSectionView(sideBarSectionModel);
        self = this;
    },
    teardown: function() {
        self.sideBarSectionViewObj = null;
        $("body").find('div#sideBarSection').remove();
        $("#language").empty();
    }
});

test('Render event', function() {
    expect(1);
    equal($('body').find('div#sideBarSection').length, 1, "");
});

test('testing if language buttons work well', function() {
    expect(1);
    Backbone.history.start();
    localStorage.removeItem('language');
    $('#sideBarSection input').click(function(event){
        self.sideBarSectionViewObj.changeLan(event);
    });
    $('#sideBarSection input#en_EN').click();
    equal(localStorage.getItem('language'), '"en_EN"', 'language id\'s been set to localStorage');
    Backbone.history.stop();
});

test('Start event test', function() {
    expect(1);
    self.sideBarSectionViewObj.start(customBackbone);
    ok(true);
});