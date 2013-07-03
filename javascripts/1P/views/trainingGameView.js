var mokObjDif = {
        "dificulty": "10"
}

var mokObjWords = {
    "words": {
        "word1": {"var1":"0", "var2":"0", "var3":"1", "var4":"0"},
        "word2": {"var1":"1", "var2":"0", "var3":"0", "var4":"0"},
        "word3": {"var1":"0", "var2":"1", "var3":"0", "var4":"0"},
        "word4": {"var1":"1", "var2":"0", "var3":"0", "var4":"0"},
        "word5": {"var1":"0", "var2":"0", "var3":"0", "var4":"1"},
        "word6": {"var1":"0", "var2":"0", "var3":"1", "var4":"0"},
    }
}

var trainingGameView = Backbone.View.extend({
    repdata : new representDataTraining,
    el: $('#contentBlock'),
    selectAnswerConteiner: '',
    selectVariantsConteiner: '',
    score: 0,
    difficultyScore: "",
    difficultyTimeBonus: "",
    correct: 0,
    incorrect: 0,
    timer: "",
    timerGame: "",
    oneWordTime: '', //One word time setInterval pointer
    fullGameTime: '', //One game time setInterval pointer
    totalScore: "",



    events: {
        "click .translateVariants" : "checkAnswer"
    },

    initialize: function(some){
        _.bindAll(this, 'render');
        this.render(some);
        me = this;
    },

    render: function(some){
        switch (some.difficulty) {
            case "low":
                this.timerGame = 150;
                this.timer = 15;
                this.difficultyScore = 7;
                this.difficultyTimeBonus = 1;
                console.log("low");
                break
            case "medium":
                this.timerGame = 100;
                this.timer = 10;
                this.difficultyScore = 14;
                this.difficultyTimeBonus = 2;
                console.log("medium");
                break
            case "hard":
                this.timerGame = 70;
                this.timer = 7;
                this.difficultyScore = 20;
                this.difficultyTimeBonus = 3;
                console.log("hard");
                break
            default: 
                this.timerGame = 150;
                this.timer = 15;
                this.difficultyScore = 7;
                console.log("def");
        }
        this.$el.empty();
        var scoreAndTimeBlock = new EJS({url:'/javascripts/1P/templates/trainingScoreAndTime.ejs'}).render(mokObjDif);
        var sideWordsSelect = new EJS({url:'/javascripts/1P/templates/trainingSideWordSelect.ejs'}).render(mokObjWords);
        this.$el.append(sideWordsSelect);
        this.$el.append(scoreAndTimeBlock);
        //$('#score span').text(this.score);
        this.selectAnswerConteiner = $('#answerConteiner');
        this.selectVariantsConteiner = $('#variantsConteiner');
        $(".takenWord").draggable( {
            zIndex: 2700,
            cursor: 'move',
            revert: true,
            opacity: 0.80,
        });
        $("#answerConteiner").droppable({
            accept: '.takenWord',
            hoverClass: 'hovered',
            drop: this.handleWordDrop,
            tolerance: "touch",
        });        
        //C3Counter("counter", { startTime :10 });
        $('#timerOneGameBlock span').text(this.timerGame);
        this.fullGameTime = setInterval(function(){
            me.timerGame--;
            $('#timerOneGameBlock span').text(me.timerGame);            
            if (me.timerGame == 0){
                clearInterval(me.fullGameTime);
                reloadFields("Game time's out",me);
                clearInterval(me.oneWordTime);
                me.totalScore = me.timerGame*me.difficultyTimeBonus+this.score;
                representTrainingResults(this);
            }
        },1000);
    },
    handleWordDrop: function( event, ui ) {
        var chosenWord = $(ui.draggable).attr('value');
        $(ui.draggable).attr('id','chosenWord');
        $(".takenWord").draggable('disable');
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        //ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
        ui.draggable.draggable( 'option', 'revert', false );
        me.selectAnswerConteiner.empty();
        me.variantsShow(chosenWord);
        $(this).append($(ui.draggable));
        $(ui.draggable).css('left','0');
        $(ui.draggable).css('top','0');
    },

    variantsShow: function(ev){
        var timeWord = me.timer
        var variantsShowBlock = new EJS({url:'/javascripts/1P/templates/variantsShowBlock.ejs'}).render(mokObjWords.words[ev]);
        me.selectVariantsConteiner.empty();
        me.selectVariantsConteiner.append(variantsShowBlock);
        $('#scoreBlock span').text(this.score);
        $(ev.target).attr('id','chosenWord');
        $('#timerBlock span').text(timeWord);
        this.oneWordTime = setInterval(function(){
            timeWord--;
            $('#timerBlock span').text(timeWord);            
            if (timeWord == 0){
                clearInterval(me.oneWordTime);
                reloadFields("Time's out",me);
                this.correct ++;
                if (!($('.takenWord').length)){
                    me.totalScore = me.timerGame*me.difficultyTimeBonus+this.score;
                    representTrainingResults(me);
                    alert("Game Over \nYour Score: "+t.score+"\nTime left: "+me.timerGame+"\nTotal Score: "+me.totalScore)
                    //window.location.href = "http://guessword.com/";
                }
            }   
        },1000)
    },

    checkAnswer: function(ev){
        var choise = $(ev.target).attr("value");
        var chosenword = $('#chosenWord').attr('value');
        var chosenWorsObj = mokObjWords.words[chosenword]
        if (chosenWorsObj[choise] == 1){
            this.score += this.difficultyScore;
            $('#scoreBlock span').text(this.score);
            this.correct ++;
            reloadFields("Correct",this);
        }else{
            this.incorrect ++;
            reloadFields("Incorrect",this);
        }
        clearInterval(this.oneWordTime);    
        if (!($('.takenWord').length)){
            clearInterval(this.fullGameTime);            
            this.totalScore = this.timerGame*this.difficultyTimeBonus+this.score;
            representTrainingResults(this);
            alert("Game Over \nYour Score: "+this.score+"\nTime left: "+this.timerGame+"\nTotal Score: "+me.totalScore)
            //window.location.href = "http://guessword.com/";
        }
    }
})
function nextWord(){
    $("#chosenWord").remove();
    $(".takenWord").draggable( "option", "disabled", false );
    $("#answerConteiner").droppable( "option", "disabled", false );
}
function reloadFields(type,self){
    self.selectAnswerConteiner.empty();
    self.selectVariantsConteiner.empty();
    self.selectAnswerConteiner.append('<div id="massageConteiner">'+type+'. Choose another word</div>');
    $("#timerBlock span").text("0");
    nextWord();
}
function representTrainingResults(self){
    var now = new Date();
    var current_date = now.getDate();
    var current_month = now.getMonth();
    var current_year = now.getFullYear();
    var trainDate = current_year+"-"+current_month+"-"+current_date
    var repLogin = JSON.parse($.cookie("login")).login;
    self.repdata.set({
        "login"         : repLogin, 
        "wordsCorrect"  : self.correct, 
        "wordsIncorrect": self.incorrect, 
        "trainingTime"  : self.timerGame, 
        "totalScore"    : self.totalScore, 
        "trainDate"     : trainDate,
    });
    $.ajax({
        type: "POST",
        url: "http://localhost:5000/word/index",
        dataType: 'json',
        data: self.repdata.changed,
        success: function(data,status){
            console.log(data)
        },
        error: function(data, status){
            console.log(data,status)
        }
    });
}