var registrationForm = Backbone.Model.extend({
    defaults:{
        fields: {
            login: {
                explText : 'app_login', // this field is for, show 
                //user what he should type in the input field
                name: 'login', //name is used for atribute "name" in input tag
                id: 'login', //id is used for atribute "id" in input tag
                required: '1', // if field is required, user must fill it
                type: 'text'          
            },
            userMail: {
                explText : 'app_email',
                name: 'user_mail',
                id: 'mail_id',
                required: '1',
                type: 'email'            
            },
            password: {
                explText : 'app_enter_password',
                name: 'pass',
                id: 'pass',
                required: '1',  
                type: 'password'          
            },
            retypePassword: {
                explText : 'app_repeat_password',
                name: 'user_retype_pass',
                id: 'repass_id',
                required: '1',
                type: 'password'            
            },
            dob: {
                explText : 'app_birth_date',
                name: 'user_dob',
                id: 'dob_id',
                required: '0',
                type: 'date'     
            },
            location: {
                explText : 'app_address',
                name: 'user_location',
                id: 'location_id',
                required: '0',
                type: 'text'          
            },
        },
        buttons: {
            registration: {
                id: 'reg_button',
                name: 'reg_button',// this field is for, show 
                //user what he should type in the input field
                value: 'app_register', //is used for atribute "value" in input tag
                enable: '0' //if one or more required fields will be
                //empty button willn't be enable             
            }
        }
    }
});