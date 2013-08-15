//-----------------User Model Test---------------------------------
module("UserModel");
test('Testing values set from localstorage.', function() {
    expect(1);
    var userModelObject = new userModel();
    equal(userModelObject.get('main').test, "test", "Model sets data from localStorage and returns them");
});