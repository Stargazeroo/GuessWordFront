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
                "value":"translation",
                options: {
                    translation: {"name": "app_translation", "id": "trans", "value":"translation"},
                    synonyms: {"name": "app_synonyms", "id": "syn", "value":"synonyms"},
                }
            },
            difficulty: {
                "name" : "app_difficulty",
                "id" : "selDifficulty",
                "value" : "normal",
                "type": "select",
                options: {
                    hard: {"name": "app_hard", "id": "difHard", "value":"hard"},
                    normal: {"name": "app_normal", "id": "difNormal", "value":"normal"},
                    easy: {"name": "app_easy", "id": "difEasy", "value":"easy"}
                }
            }
        }
    }
});