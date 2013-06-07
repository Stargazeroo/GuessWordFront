var registrationForm = Backbone.Model.extend({
    defaults:{
        fields: {
            login: {
                explText : 'Your name:' // this field is for, show 
                //user what he should type in the input field
                name: 'login', //name is used for atribute "name" in input tag
                id: 'login', //id is used for atribute "id" in input tag
                required: '1', // if field is required, user must fill it
                type: 'text'          
            },
            userMail: {
                explText : 'Your email:'
                name: 'user_mail',
                id: 'mail_id',
                required: '1'            
            },
            password: {
                explText : 'Enter password:'
                name: 'pass',
                id: 'pass',
                required: '1',  
                type: 'password'          
            },
            retypePassword: {
                explText : 'Retype password:'
                name: 'user_retype_pass',
                id: 'repass_id',
                required: '1',
                type: 'text'            
            },
            dob: {
                explText : 'Birth date:'
                name: 'user_dob',
                id: 'dob_id',
                required: '0',
                type: 'text'     
            },
            location: {
                explText : 'Your address:'
                name: 'user_location',
                id: 'location_id',
                required: '0',
                type: 'text'          
            },
        },
        buttons: {
            registration: {
                name: 'reg_button',// this field is for, show 
                //user what he should type in the input field
                value: 'Register', //is used for atribute "value" in input tag
                enable: '0' //if one or more required fields will be
                //empty button willn't be enable             
            }
        }
    }
});