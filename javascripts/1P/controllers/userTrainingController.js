// **userTrainingController instance** should be called from a training controller
var userTrainingController = Backbone.Model.extend({
    initialize: function() {
        $.ajax({
            type: 'POST',
            dataType:'json',
            url: "http://localhost:5000/training/get",
            data: {"email": JSON.parse(localStorage['main']).email},
            success: function(data, status){        
                localStorage.setItem('training', JSON.stringify(data));
                var userData= new userModel();
                new userTrainingView(userData);
            },
            error: function(data, status){
                console.log(status)
            }
        })
    }
});