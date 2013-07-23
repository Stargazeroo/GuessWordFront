var instrModalModels = Backbone.Model.extend ({
        defaults: {
            first: {
                header: "app_firstPage",
                body: {
                    img: "",
                    content:"app_contentFirst"
                },
                id: "firstModal",
                footer: {
                    btnNext:"app_btnNext",
                    btnClose: "app_btnClose",
                },
            },
            second: {
                header: "app_secondPage",
                body: {
                    img: "",
                    content: "app_contentSecond",
                    },
                id: "secondModal",
                footer: {
                    btnNext: "app_btnNext",
                    btnBack: "app_btnBack",
                    btnClose: "app_btnClose"
                },
            },
            last: {
                header: "app_lastPage",
                body: {
                    img: "",
                    content: "app_contentLast"
                },
                id: "lastModal",
                footer: {
                    btnBack: "app_btnBack",
                    btnClose: "app_btnClose"
                },
            },
        }
    });
