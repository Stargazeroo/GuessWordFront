var mainPage = Backbone.Model.extend({
    defaults: {
        appTitle: "GuessWord",
        mainSection: {
            match: {
                "name": "Match",
                "href": "#match",
                "priority": 1,
                "id": "but_match"
            },
            training: {
                "name": "Training",
                "href": "#training",
                "priority": 1,
                "id": "but_training"
            },
            help: {
                "name": "Help",
                "href": "#help",
                "priority": 1,
                "id": "but_help"
            },
            about: {
                "name": "About",
                "href": "#about",
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