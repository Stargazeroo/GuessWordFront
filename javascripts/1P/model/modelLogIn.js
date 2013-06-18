var logIn = Backbone.Model.extend({
        defaults: {
            fields: {    
                login: {
                    type: "text",
                    name: "login",
                    id: "login",
                    label: "Login:"
                },
                password: {
                    type: "password",
                    name: "pass",
                    id: "pass",
                    label: "Password:"
                },
            },				
            buttons: {
                logInButton: {
                    type: "submit",
                    name: "submitButton",
                    value: "Enter",
                    id: "submitButton"
                },
                regButton: {
                    type: "submit",
                    name: "regSubmitButton",
                    value: "Registration",
                    id: "regSubmitButton"
                }
            },
        }
});