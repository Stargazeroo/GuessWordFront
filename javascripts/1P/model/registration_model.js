var registrationForm = Backbone.Model.extend({
    defaults:{
        fields: {
            userName: {
                name: 'user_name',
                id: 'username_id',
                required: 'TRUE'// is required field          
            },
            userMail: {
                name: 'user_mail',
                id: 'mail_id',
                required: 'TRUE'            
            },
            password: {
                name: 'user_pass',
                id: 'pass_id',
                required: 'TRUE'            
            },
            retypePassword: {
                name: 'user_retype_pass',
                id: 'repass_id',
                required: 'TRUE'            
            },
            dob: {
                name: 'user_dob',
                id: 'dob_id',
                required: 'FALSE'        
            },
            location: {
                name: 'user_location',
                id: 'location_id',
                required: 'FALSE'          
            },
        },
        buttons: {
            registration: {
                "name": 'reg_button',
                value: 'Register',
                enable: 'FALSE' //if one or more required fields willbe
                //empty button willn't be enable             
            }
        }
    }
}); 

