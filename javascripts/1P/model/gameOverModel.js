var gameOverModel = Backbone.Model.extend({
    defaults: {    
            header: "app_gameovermodel",
            body: {
                content:"app_contentgameovermodel"
            },
            footer: {
                btnYes:"app_btnTryAgain",
                btnClose: "app_btnClose",
            },
        }
    });