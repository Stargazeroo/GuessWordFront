var trainingStartPageModel = Backbone.Model.extend({
    defaults: {
        elements: {
            start: {
                "name": "app_start",
                "href" : "#training",
                "id": "btnStart",
                "type": "button"
            },
            instructions: {
                "name": "app_instructions",
                "href": "#instructions",
                "id": "btnInstr",
                "type": "button"
            },
            game: {
                "name": "app_game", // app property for localization
                "id": "selGame",
                "type": "select",
                options: {
                    translation: {"name": "app_translation", "id": "trans"},
                    synonyms: {"name": "app_synonyms", "id": "syn"},
                }
            },
            difficulty: {
                "name" : "app_difficulty",
                "id" : "selDifficulty",
                "type": "select",
                options: {
                    hard: {"name": "app_hard", "id": "difHard"},
                    normal: {"name": "app_normal", "id": "difNormal"},
                    easy: {"name": "app_easy", "id": "difEasy"}
                }
            }
        }
    }
});