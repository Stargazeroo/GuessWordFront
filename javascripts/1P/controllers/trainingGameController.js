var trainingGameController = Backbone.Model.extend({
    trainingModelObj : new trainingGameModel(),
    initialize: function(){
        self = this
        $.ajax({
            type: "POST",
            url: "http://localhost:5000/word/index",
            dataType: 'json',
            //data: representModel.toJSON(),
            success: function(data){
                self.trainingModelObj.set(data)
                rend();
            },
            error: function(data, status){
                console.log(status)
            }
        });
        function rend(){
            new trainingGameView(self.trainingModelObj.changed);
        }
    }
});