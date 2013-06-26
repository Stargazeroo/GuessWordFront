var mainPage = Backbone.Model.extend({
    defaults: {
        appTitle: "GuessWord",
        mainSection: {
            match: {
                "name": "app_match", // app property for localization
                "href": "#match",
                "priority": 1,
                "id": "but_match"
            },
            training: {
                "name": "app_training",
                "href": "#training",
                "priority": 1,
                "id": "but_training"
            },
            help: {
                "name": "app_help",
                "href": "#help",
                "priority": 1,
                "id": "but_help"
            },
            about: {
                "name": "app_about",
                "href": "#about",
                "priority": 1,
                "id": "but_about"
            }
        },
        sideBarSection: {
            en: {
                "name": "app_en",
                "priority": 1,
                "id": "en_EN"
            },
            ua: {
                "name": "app_ua",
                "priority": 1,
                "id": "ua_UA"
            },
            ru: {
                "name": "app_ru",
                "priority": 1,
                "id": "ru_RU"
            }
        },
        logoutButton: {
            "name": "app_logout",
            "href": "#login",
            "id": "but_logout"
        }
    }
});
