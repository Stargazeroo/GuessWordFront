var instructModel = Backbone.Model.extend({
    defaults:{
        header : "app_instrPromptHeader",
        body : "app_instructionText",
        footer : {
            btnYes : "app_btnYes",
            btnClose : "app_btnClose",
            check : "app_chck",
        }
    }    
});