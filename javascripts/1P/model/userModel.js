var userModel = Backbone.Model.extend({
    defaults: {
        logout: "app_logout",
        trainingResults: "app_trainingResults",
        matchResults   : "app_matchResults",
        userAge: "app_age",
        userLocation: "app_location",
        trainingAttributes: {
            trainings: "app_trainings",
            wordsCorrect: "app_wordsCorrect",
            wordsIncorrect: "app_wordsIncorrect",
            trainingTime: "app_trainingTime",
            totalScore: "app_totalScore",
            ratio: "app_ratio"
        },
    },

    initialize: function(){
        var main = JSON.parse(localStorage['main']);
        this.set("main", main);
        var training = JSON.parse(localStorage['training']);
        if (training) {
            this.set("training", training);
        }
    }
});