var regResultModel = Backbone.Model.extend ({
    success: {
        header: "app_thanks",
        body : "app_please_login",
        footer: {
            btnClose : "app_btnClose",
            id: "successBtnClose"
        },
    },
    
    header : "app_error",
    body : "app_errorMessage",
    footer : {
        btnClose : "app_btnClose",
        id: "errorBtnClose"
    }
});

var regResultModelObject = new regResultModel();
