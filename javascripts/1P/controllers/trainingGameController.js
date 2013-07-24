var trainingGameController = Backbone.Model.extend({
    initialize: function(){
        self = this
        $.get(TRAINING_WORDS, function(data) {
            trainingModelObj.set("words", data);
            new trainingGameView();
            new userTrainingController();
        });
    }
});;
