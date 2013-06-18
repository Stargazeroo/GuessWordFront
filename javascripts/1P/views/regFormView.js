var registrationView = Backbone.View.extend({
    el: $('body'),
    events: {
        "click #reg_button" : "onSubmit"
    },    
    initialize: function(regModelInputFields, regModelButtons){        
        _.bindAll(this, 'render', 'onSubmit');
        this.render(regModelInputFields, regModelButtons);
    },
    render: function(regModelInputFields, regModelButtons){        
        var regForm = new EJS({url:'/javascripts/1P/templates/regFormInputsList.ejs'}).render(regModelInputFields);
        this.$el.append(regForm);
        var confirmButton = new EJS ({url:'/javascripts/1P/templates/regFormSubmitButton.ejs'}) .render(regModelButtons);
        this.$('#regForm').append(confirmButton);   
    },
    onSubmit: function(e){
        e.preventDefault(); 
        var representModel = new regRepresentationDBModel({
            login: this.$("#login").val(),
            email: this.$("#mail_id").val(),
            password: this.$("#pass").val(),
            dob: this.$("#dob_id").val(),
            location: this.$("#location_id").val()
        });   
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/registration/index",
            dataType: 'json',
            data: representModel.toJSON(),
            success: function(data){
                console.log(data)
            },
            error: function(data, status){
                console.log(status)
            }
        });
    }
});
