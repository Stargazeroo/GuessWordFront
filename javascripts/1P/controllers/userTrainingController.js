// **userTrainingController instance** should be called from a training controller
var userTrainingController = Backbone.Model.extend({
    initialize: function() {
        $.ajax({
            type: 'POST',
            dataType: "json",
            url: TRAINING_GET,
            data: {"email": JSON.parse(localStorage['main']).email},
            success: function(data, status){     
                localStorage.setItem('training', JSON.stringify(data));
                var userData = new userModel();
                new userTrainingView(userData);
            },
            error: function(error,status){
                var errorPopup = new EJS({url:'/javascripts/1P/templates/popupError.ejs'}).render(error);
                $('#contentBlock').append(errorPopup);
                $('#popupError').show();
            }
        })
    },

});