var trainingGameView = Backbone.View.extend({
    repdata : new representDataTraining,
    el: $('#contentBlock'),
    selectAnswerContainer: '',
    selectVariantsContainer: '',
    score: 0, 
    difficultyScore: 0, //sets acording to chosen difficulty
    difficultyTimeBonus: 0, //sets acording to chosen difficulty
    correct: 0, // correct answers
    incorrect: 0, // incorrect answers
    noAnswer: 0, // if user didn'n answer
    timer: 0, //timer for one word. Sets acording to chosen difficulty
    timeWord: 0, // uses for global change
    timerGame: 0, //timer for full game. Sets acording to chosen difficulty
    oneWordTime: '', //One word time setInterval pointer. Uses for stop timer
    fullGameTime: '', //One game time setInterval pointer. Uses for stop timer
    totalScore: 0, // score+timeLeftBonus
    spentGameTime: 0,
    reloadState:0,

    events: {
        "click .translateVariants" : "checkAnswer",
        "click #btnTryAgain" : "tryAgain",
        "click #btnClose" : "closeTraining",
    },

    initialize: function(){
        _.bindAll(this, 'render');
        self = this;
        if (!($.cookie("login"))){
            window.location.href = "http://guessword.com/#login";
        } else {
            this.render();
        }
    },

    render: function(){
        this.$el.unbind();
        $("#language").empty();
        this.$el.empty();
        if (localStorage['reload'] == 0){
            settings = trainingModelObj.attributes.settings.difficulty;
        }else{
            this.reloadState = JSON.parse(localStorage['state']);
            settings = "reload";        
        }
        
        switch (settings) { //set all game setеings according to chosen difficulty
            case "easy":
                difficultySet("easy",this);
                break
            case "normal":
                difficultySet("normal",this);
                break
            case "hard":
                difficultySet("hard",this);
                break
            case "reload":
                difficultySet("reload",this);
                this.score = this.reloadState.score;
                this.correct = this.reloadState.correct;
                this.incorrect = this.reloadState.incorrect;
                this.spentGameTime = this.reloadState.spentGameTime;
                trainingModelObj.set("words",this.reloadState.words);
                break
            default: 
                difficultySet("easy",this);
        }
        var popupPrompt = new gameOverModel();
        var scoreAndTimeBlock = new EJS({url:'/javascripts/1P/templates/trainingScoreAndTime.ejs'}).render();
        var sideWordsSelect = new EJS({url:'/javascripts/1P/templates/trainingSideWordSelect.ejs'}).render(trainingModelObj.attributes.words);
        console.log(sideWordsSelect);
        var popup = new EJS({url:'/javascripts/1P/templates/gameOver.ejs'}).render(popupPrompt.defaults);
        this.$el.append(sideWordsSelect);
        this.$el.append(scoreAndTimeBlock);       
        this.$el.append(popup);
        this.selectAnswerContainer = $('#answerContainer');
        this.selectVariantsContainer = $('#variantsContainer');
        $('#scoreBlock span').text(this.score);
        $('#timerOneGameBlock span').text(this.timerGame);

        /*Make words draggable*/
        $(".takenWord").draggable({
            zIndex: 2700, // enable to drag elemen over another elements 
            cursor: 'move', // cursor look like
            revert: true, // disable to drop element anywhere except droppable
            opacity: 0.80, // element opacity
        });

        $("#answerContainer").droppable({
            accept: '.takenWord', // accept to drop only elements whith class takenWord
            drop: this.handleWordDrop, // function that call after drop event
        });
        
        /*Runing game timer*/
        this.fullGameTime = setInterval(function(){
            self.timerGame--;
            self.spentGameTime++;
            $('#timerOneGameBlock span').text(self.timerGame);
            /*if game time finished we make all needed calculates and represent results to 
            server and also show popup with all results for user*/
            if (self.timerGame <= 10){
                $('#timerOneGameBlock span').css("color","red");
            }           
            if (self.timerGame == 0){
                clearInterval(self.fullGameTime);
                clearInterval(self.oneWordTime);
                self.totalScore = self.timerGame*self.difficultyTimeBonus+self.score;
                representTrainingResults(self);
                clearGameTable(self);
            }
        /*1000 - means 1sec*/
        },1000);

        $(window).bind('hashchange', function() {
            clearInterval(self.fullGameTime);
            clearInterval(self.oneWordTime);
        });

        $(document).bind('keydown keyup', function(e) {
            if((e.which === 116)||(e.which === 82 && e.ctrlKey)){
                statey = {
                    "timerGame":self.timerGame,
                    "timer":self.timer,
                    "difficultyScore":self.difficultyScore,
                    "difficultyTimeBonus":self.difficultyTimeBonus,
                    "timeWord":self.timeWord,
                    "score":self.score,
                    "correct":self.correct,
                    "incorrect":self.incorrect,
                    "spentGameTime":self.spentGameTime,
                    "words":trainingModelObj.attributes.words,
                };
                localStorage.reload = 1;
                localStorage.state = JSON.stringify(statey);
            };
        });
    },

    /*this function catched droped words and call function which show 
    variants for make choice*/
    handleWordDrop: function( event, ui ) {
        var chosenWord = $(ui.draggable).attr('value');
        $(ui.draggable).attr('id','chosenWord');
        $(".takenWord").draggable('disable');
        ui.draggable.draggable( 'disable' );
        $(this).droppable( 'disable' );
        ui.draggable.draggable( 'option', 'revert', false );
        self.selectAnswerContainer.empty();
        self.variantsShow(chosenWord);
        $(this).append($(ui.draggable));
        $(ui.draggable).css('left','0');
        $(ui.draggable).css('top','0');
    },

    variantsShow: function(ev){        
        var variantsShowBlock = new EJS({url:'/javascripts/1P/templates/variantsShowBlock.ejs'}).render(trainingModelObj.attributes.words[ev]);
        self.timeWord = self.timer;
        self.selectVariantsContainer.empty();/*if all words are out*/ 
        self.selectVariantsContainer.append(variantsShowBlock);
        console.log(ev);
        $(ev.target).attr('id','chosenWord');
        $('#timerBlock span').text(self.timeWord);
        this.oneWordTime = setInterval(function(){
            self.timeWord--;
            $('#timerBlock span').text(self.timeWord);
            if (self.timeWord <= 3){
                $('#timerBlock span').css("color","red");
            }             
            if (self.timeWord == 0){
                clearInterval(self.oneWordTime);
                reloadFields($.i18n.prop("app_Time_is_out"),self);
                this.correct ++;
                /*if all words are out*/ 
                if (!($('.takenWord').length)){
                    self.totalScore = self.timerGame*self.difficultyTimeBonus+self.score;
                    clearInterval(this.fullGameTime); 
                    representTrainingResults(self);
                    clearGameTable(this);
                }
            }   
        },1000)
    },

    checkAnswer: function(ev){
        var choise = $(ev.target).attr("value"); // chosen answer 
        var chosenword = $('#chosenWord').attr('value'); // chosen word 
        var chosenWorsObj = trainingModelObj.attributes.words[chosenword]; // take choosen word object from mokObjWords
        /*if answer was correct or incorrect. chosenWorsObj[choise] = mocObjWords->words->chosen word->
        ->chosen variant->'0' or '1'. 1 if correct, 0 if incorrect*/
        if (chosenWorsObj[choise] == 1){ 
            this.score += this.difficultyScore;
            $('#scoreBlock span').text(this.score);
            this.correct ++;
            reloadFields($.i18n.prop("app_correct"),this);
        }else{
            this.incorrect ++;
            reloadFields($.i18n.prop("app_incorrect"),this);
        }
        clearInterval(this.oneWordTime);
        /*if all words are out*/    
        if (!($('.takenWord').length)){
            clearInterval(this.fullGameTime);            
            this.totalScore = this.timerGame*this.difficultyTimeBonus+this.score;
            representTrainingResults(this);
            clearGameTable(this);
        }
        delete trainingModelObj.attributes.words[chosenword];
    },

    toggle: function(){
        $('#myModal').modal('toggle');
    },

    show: function(score) {
        $('.modal-body').append(score);
        $('#myModal').modal('show');
    },

    tryAgain: function(){
        if (localStorage['reload'] == 1){
            trainingModelObj.set("settings",{"difficulty":localStorage['reloadDifficulty']});
        }
        localStorage.reload = 0; 
        $('#myModal').modal('hide');       
        new trainingGameController();        
    },

    closeTraining: function(){
        window.location.href = "http://guessword.com";
    }
});

/*reload options of draggable and droppable elements"*/
function nextWord(){
    $("#chosenWord").remove();
    $(".takenWord").draggable( "option", "disabled", false );
    $("#answerContainer").droppable( "option", "disabled", false );
}

/*reload filds after one word answerer and return massage according to type of input massage like 
"Correct" or "Incorrect"*/
function reloadFields(type,self){
    self.selectAnswerContainer.empty();
    self.selectVariantsContainer.empty();
    self.selectAnswerContainer.append('<div id="massageContainer">'+type+" "+$.i18n.prop("app_message")+'</div>');
    $("#timerBlock span").text("0");
    nextWord();
}

/*Set results to model and send it to serve*/
function representTrainingResults(self){
    var now = new Date();
    var current_date = now.getDate();
    var current_month = now.getMonth();
    var current_year = now.getFullYear();
    var trainDate = current_year+"-"+current_month+"-"+current_date
    var repEmail = JSON.parse(localStorage['main']).email;
    self.repdata.set("gameResult",{
        "email"         : repEmail, 
        "wordsCorrect"  : self.correct, 
        "wordsIncorrect": self.incorrect, 
        "trainingTime"  : self.spentGameTime, 
        "totalScore"    : self.totalScore, 
        "trainDate"     : trainDate,
    });
    var representObj = {
        "email"         : repEmail, 
        "correct words"  : self.correct, 
        "incorrect words": self.incorrect, 
        "training time"  : self.spentGameTime, 
        "total score"    : self.totalScore, 
        "training Date"  : trainDate,
    };
    var popupPresentResults = new EJS({url:'/javascripts/1P/templates/popupPresentResults.ejs'}).render(representObj);
    self.show(popupPresentResults);
    $.ajax({
        type: "POST",
        url: "http://"+HOST+":"+PORT+"/training/post",
        dataType: 'json',
        data: self.repdata.attributes.gameResult,
        success: function(data,status){
            console.log(data,status);
            localStorage.setItem('training', JSON.stringify(data));
        },
        error: function(data, status){
            console.log(data,status);
        }
    });
};

/*difficultySet uses for set settings according to chosen level. Level takes from trainingGameModel. Self is pointer
this View*/
function difficultySet(level,self){
    var levels = {
        easy:{"timerGame":150,"timer":15,"difficultyScore":7,"difficultyTimeBonus":1},
        normal:{"timerGame":100,"timer":10,"difficultyScore":14,"difficultyTimeBonus":2},
        hard:{"timerGame":70,"timer":7,"difficultyScore":20,"difficultyTimeBonus":3},
        reload:{"timerGame":self.reloadState.timerGame,"timer":self.reloadState.timer,"difficultyScore":self.reloadState.difficultyScore,"difficultyTimeBonus":self.reloadState.difficultyTimeBonus},
    }
    self.timerGame = levels[level].timerGame;
    self.timer = levels[level].timer;
    self.difficultyScore = levels[level].difficultyScore;
    self.difficultyTimeBonus = levels[level].difficultyTimeBonus;
};

/*clearGameTable uses for clear fields or set some to '0'*/
function clearGameTable(self){
    self.selectAnswerContainer.empty();
    self.selectVariantsContainer.empty();
    $("#sideWordsSelect").empty();
    $("body div span").text("0");
};