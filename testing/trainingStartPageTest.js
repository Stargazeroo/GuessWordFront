//-----------------trainin start page test---------------------------------
module('trainingStartPageView', {
    setup: function() {
        //$.cookie('login','ser');
        var trainingStartModel = new trainingStartPageModel();
        var trainingStartElements = trainingStartModel.get('elements');
        this.trainingStartViewObj = new trainingStartPageView(trainingStartElements, customWindow);
        self = this;
    },
    teardown: function() {
        self.trainingStartViewObj = null;
        $("body").find('div#trainingStartPage').remove();
        $("body").find('div#firstModal').remove();
        $("body").find('div#secondModal').remove();
        $("body").find('div#lastModal').remove();
        $("body").find('div#instrPrompt').remove();
        $("#contentBlock").empty();
        localStorage.removeItem('neverShow');
    }
});
test('showInst test with checked attr', function() {
    expect(1);
    localStorage.setItem("neverShow", JSON.stringify(1));
    $('#btnStart').click(function(event){
        self.trainingStartViewObj.showInst(event, customWindow);
    });
    $('#btnStart').click();
    ok(true);
});
test('Render event', function() {
    expect(5);
    equal($('body').find('div#trainingStartPage').length, 1, "");
    equal($('body').find('div#firstModal').length, 1, "");
    equal($('body').find('div#secondModal').length, 1, "");
    equal($('body').find('div#lastModal').length, 1, "");
    equal($('body').find('div#instrPrompt').length, 1, "");
});
test('No login in cookies', function() {
    expect(1);
    $.cookie('login', '', { expires: -1 });
    var trainingStartModel = new trainingStartPageModel();
        var trainingStartElements = trainingStartModel.get('elements');
    equal(self.trainingStartViewObj.render(trainingStartElements, customWindow), false, "Redirect to login page");
    $.cookie('login','ser');
});

test('Choose game type and difficulty', function() {
    expect(3);
    $('.subMenu ul a').click(function(event){
        self.trainingStartViewObj.chooseDiff(event);
    });
    $('.subMenu ul a').click();
    ok(true);
    $('.subMenu ul a').filter('#trans').click();
    equal($("a#selGame").text(), '[app_game]: [app_translation]', 'game type selecting works fine');
    $('.subMenu ul a').filter('#difHard').click();
    equal($("a#selDifficulty").text(), '[app_difficulty]: [app_hard]', 'game difficulty selecting works fine');
});

test('showInst set checked attr and redirect to trainingGame', function() {
    expect(2);
    localStorage.setItem("neverShow", JSON.stringify(1));
    $('#btnStart').click(function(event){
        self.trainingStartViewObj.showInst(event, customWindow);
    });
    $('a#selDifficulty').attr('value', 'difficultySet1');
    $('#btnStart').click();
    equal(trainingModelObj.get("settings").difficulty, 'difficultySet1', 'difficulty level has been set to trainingModel');
    ok(true, 'redirected');
});

test('testing button #btnInstr showing first modalWindow with instructions', function() {
    expect(1);
    $('#btnInstr').click(function(event){
        self.trainingStartViewObj.modalOpenInstr(event);
    });
    $('#btnInstr').click();
    equal($('body').find('div#firstModal').length, 1, "");
});  

test('showInst test', function() {
    expect(1);
    localStorage.removeItem('neverShow');
    $('#btnStart').click(function(event){
        self.trainingStartViewObj.showInst(event, customWindow);
    });
    $('#btnStart').click();
    equal($('body').find('#instrPrompt').is(':visible'), 1, "#instrPrompt is shown");
});


test('testing button #btnYes showing first modalWindow with instructions', function() {
    expect(2);
    $('#btnYes').click(function(event){
        self.trainingStartViewObj.modalOpen(event);
    });
    $('#btnYes').click();
    equal($('body').find('div#instrPrompt').is(':hidden'), 1 , "hid previous modal");
    equal($('body').find('div#firstModal').is(':visible'), 1, "showed new modal");
});

test('testing button #btnClose which closes modalWindows', function() {
    expect(1);
    $('#btnClose').click(function(event){
        self.trainingStartViewObj.modalClose(event);
    });
    $('#btnClose').click();
    equal($('body').find('#firstModal,#secondModal,#lastModal').is(':hidden'), 1 , "hidding modal");
});

test('testing button #btnNext which showes next modalWindow', function() {
    expect(4);
    $('#btnNext').click(function(event){
        self.trainingStartViewObj.modalNext(event);
    });
    $('#firstModal #btnNext').click();
    equal($('body').find('#firstModal').is(':hidden'), 1 , "hidding current modal");
    equal($('body').find('#secondModal').is(':visible'), 1 , "showing next modal");
    $('#secondModal #btnNext').click();
    equal($('body').find('#secondModal').is(':hidden'), 1 , "hidding current modal");
    equal($('body').find('#lastModal').is(':visible'), 1 , "showing next modal");
});

test('testing button #btnNext which showes next modalWindow', function() {
    expect(4);
    $('#btnBack').click(function(event){
        self.trainingStartViewObj.modalBack(event);
    });
    $('#secondModal #btnBack').click();
    equal($('body').find('#secondModal').is(':hidden'), 1 , "hidding current modal");
    equal($('body').find('#firstModal').is(':visible'), 1 , "showing next modal");
    $('#lastModal #btnBack').click();
    equal($('body').find('#lastModal').is(':hidden'), 1 , "hidding current modal");
    equal($('body').find('#secondModal').is(':visible'), 1 , "showing next modal");
});

test('testing checkbox on modalWindow so #instrModal won"t be showed again', function() {
    expect(2);
    $('#chckInst').on('click',function(event){
        self.trainingStartViewObj.dontShow(event);
    });
    $('#instrPrompt #chckInst').trigger('click');
    equal(localStorage.getItem('neverShow'), 1, 'setting neverShow to localstorage');
    $('#chckInst').attr('value',1);
    $('#instrPrompt #chckInst').trigger('click');
    equal(localStorage.getItem('neverShow'), null, 'removing neverShow from localstorage');
});

test('testing click on #btnInstrClose which has to set difficulty and redirect to trainingGame', function() {
    expect(2);
    $('#btnInstrClose').click(function(event){
        self.trainingStartViewObj.closeInstrStart(event, customWindow);
    });
    $('#btnInstrClose').click();
    equal($('body').find('#instrPrompt').is(':hidden'), 1 , 'hidding #instrPrompt modal window');
    $('a#selDifficulty').attr('value', 'difficultySet');
    $('#btnInstrClose').click();
    equal(trainingModelObj.get("settings").difficulty, 'difficultySet', 'difficulty level has been set to trainingModel');
});