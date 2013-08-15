//-----------------User Training Controller Test---------------------
module('UserTrainingController', {
    setup: function() {
        //sinon.stub($, "ajax");
        
    },
    teardown: function() {
        jQuery.ajax.restore();
        self.userTrainingControllerObject = null;
        $('#userSection').remove();
        $('#popupError').remove();
    }
});
test('Ajax success call test', function() {
    expect(1);
    var mock, fakeData = [];
    mock = sinon.mock(jQuery).expects("ajax").once().yieldsTo("success", fakeData);
    this.userTrainingControllerObject = new userTrainingController();
    equal($('body').find('#userSection').length, 1, "Success; userSection appended");
});
test('Ajax error call test', function() {
    expect(1);
    var mock, fakeError = [];
    mock = sinon.mock(jQuery).expects("ajax").once().yieldsTo("error", fakeError);
    this.userTrainingControllerObject = new userTrainingController();
    equal($('body').find('#popupError').length, 1, "Error; Popuo added");
});
