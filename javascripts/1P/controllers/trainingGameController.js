var trainingGameController = Backbone.Model.extend({
    initialize: function(){
        self = this
        $.ajax({
            type: "POST",
            url: "http://"+HOST+":"+PORT+"/word/index",
            dataType: 'json',
            //data: representModel.toJSON(),
            success: function(data){
                trainingModelObj.set("words", {
                    "to foster": {"заморожувати":"0", "процвітати":"0", "сприяти":"1", "покращувати":"0"},
                    "invoice": {"накладна":"1", "голос":"0", "баланс":"0", "шепіт":"0"},
                    "to prevail": {"попереджувати":"0", "переважати":"1", "передбачати":"0", "підготувати":"0"},
                    "grief": {"горе":"1", "відраза":"0", "камінь":"0", "дах":"0"},
                    "to transmit": {"лагодити":"0", "перекладати":"0", "розбивати":"0", "передавати":"1"},
                    "vengeance": {"вегетеріанець":"0", "прохання":"0", "помста":"1", "жорстокість":"0"},
                    "coward": {"приятель":"0", "боягуз":"1", "ковдра":"0", "військовий":"0"},
                    "to acquire": {"вимагати":"0", "сперичатись":"0", "здобувати":"1", "сумніватись":"0"},
                    "frequency": {"частота":"1", "дивина":"0", "залежність":"0", "спокій":"0"},
                    "doubt": {"впеаненість":"0", "впертість":"0", "ворожість":"0", "сумнів":"1"},
                });
                new trainingGameView();
                new userTrainingController();
            },
            error: function(data, status){
                console.log(status)
            }
        });
    }
});