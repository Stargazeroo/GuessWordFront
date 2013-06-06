
var log_in = Backbone.Model.extend({
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
		button: {
			log_in_button: {
				submit: "submit",
				name: "submit_button",
				id: "submit_button"
			},
			reg_button: {
				submit: "submit",
				name: "reg_submit_button",
				id: "reg_submit_button"
			}
		}
    }
});

