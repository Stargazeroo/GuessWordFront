var representDataTraining = Backbone.Model.extend({
    defaults:{
        "login"         : "", 
        "wordsCorrect"  : 0, 
        "wordsIncorrect": 0, 
        "trainingTime"  : 0, 
        "totalScore"    : 0, 
        "trainDate"     : "",
    }
});