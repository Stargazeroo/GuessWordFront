var logIn = Backbone.Model.extend({
    defaults: {
        fields: {    
            login: {
                type: "text",
                name: "login",
                id: "login"
            },
            password: {
                type: "password",
                name: "pass",
                id: "pass"
            },
        },				
        buttons: {
            logInButton: {
                type: "submit",
                name: "submit_button",
                value: "Enter",
                id: "submit_button"
            },
            regButton: {
                type: "submit",
                name: "reg_submit_button",
                value: "Registration",
                id: "reg_submit_button"
            }
        }
    }
});
