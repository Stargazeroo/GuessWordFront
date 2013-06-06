var mainPage = Backbone.Model.extend({
    defaults: {
        appTitle: "GuessWord",
        mainSection: {
            match: {
                "name": "Match",
                "href": "index/match",
                "priority": 1,
                "id": "but_match"
            },
            training: {
                "name": "Training",
                "href": "index/training",
                "priority": 1,
                "id": "but_training"
            },
            help: {
                "name": "Help",
                "href": "index/help",
                "priority": 1,
                "id": "but_help"
            },
            about: {
                "name": "About",
                "href": "index/about",
                "priority": 1,
                "id": "but_about"
            }
        },
        sideBarSection: {
            en: {
                "name": "en",
                "priority": 1,
                "id": "lan_en"
            },
            ua: {
                "name": "ua",
                "priority": 1,
                "id": "lan_ua"
            },
            ru: {
                "name": "ru",
                "priority": 1,
                "id": "lan_ru"
            }
        },
    }
});