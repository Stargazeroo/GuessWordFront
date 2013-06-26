var logInModel = Backbone.Model.extend({
        defaults: {
            fields: {    
                login: {
                    type: "text",
                    name: "login",
                    id: "login",
                    label: "app_login:",
                    explText : "app_login"
                },
                password: {
                    type: "password",
                    name: "pass",
                    id: "pass",
                    label: "app_password:",
                    explText : 'app_password'
                },
            },				
            buttons: {
                logInButton: {
                    type: "submit",
                    name: "submitButton",
                    value: "app_enter",
                    id: "submitButton"
                },
                regButton: {
                    type: "submit",
                    name: "regSubmitButton",
                    value: "app_registration",
                    id: "regSubmitButton"
                }
            },
        }
});
