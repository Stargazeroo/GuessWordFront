var trainingStartPageView = Backbone.View.extend({
    el: $('#contentBlock'),

    initialize: function(trainingStartPage){
        _.bindAll(this, 'render');
        this.render(trainingStartPage);
    },

    render: function(trainingStartPage){
        if (!($.cookie("login"))){
            window.location.href = "http://guessword.com/#login";
        } else {
            this.$el.empty();
            var trainingStartPageTemplate = new EJS({url:'/javascripts/1P/templates/trainingStartPage.ejs'}).render(trainingStartPage);
            this.$el.append(trainingStartPageTemplate );
            var instModal = new instrModalModels();
            var modalRows = instModal.defaults;
            var modalDial = new EJS({url:'/javascripts/1P/templates/instrModal.ejs'}).render(modalRows);
            this.$el.append(modalDial);
            var instructPrompt = new instructModel();
            var promptRows = instructPrompt.defaults;
            var promptDial = new EJS({url:'/javascripts/1P/templates/instrPrompt.ejs'}).render(promptRows);
            this.$el.append(promptDial);
            trainingStartPageLoad();
            var defGame = $('#trans').text();
            var defDif = $('#difNormal').text();
            $("a#selGame").text($.i18n.prop("app_game")+": "+ defGame);
            $("a#selDifficulty").text($.i18n.prop("app_difficulty")+": "+ defDif);
        }
    },

    events: {
        "click .subMenu ul a": "choose",
        "mouseover #trainingStartPage a.btn" : "hov",
        "mouseover #trainingStartPage li a.btn" : "hov",
        "mouseout #trainingStartPage a.btn" : "hovOut",
        "click #btnStart" : "showInst",
        "click #btnInstr" : "modalOpenInstr",
        "click #btnYes" : "modalOpen",
        "click #btnInstrClose" : "closeInstrStart",
        "click #btnClose" : "modalClose",
        "click #btnNext" : "modalNext",
        "click #btnBack" : "modalBack",
        "change #chckInst" :"dontShow"

    },

    choose: function(e){
        var opt = $(e.currentTarget).text();
        var value = $(e.currentTarget).attr("value");
        var el = $(e.currentTarget).parents().eq(2);
        if ($(el).attr("id") == "selGame"){
            $(el).children("a").text($.i18n.prop("app_game")+": "+ opt);
            $(el).children("a").attr("value", value);
        } else {
            $(el).children("a").text($.i18n.prop("app_difficulty")+": "+ opt);
            $(el).children("a").attr("value", value);
        }
    },

    showInst: function(e){
        e.preventDefault();
        if (!localStorage['neverShow']){
            $('#instrPrompt').show();
        } else {
            window.location.href = "http://guessword.com/#trainingOn"
            trainingModelObj.set("settings",{"difficulty":$("#selDifficulty a").attr("value")});
        }
    },
    
    modalOpen: function(e){
        e.preventDefault();
        $(e.target).parent().parent().hide()
        $('#firstModal').show();
    },

    modalOpenInstr: function(e){
        e.preventDefault();
        $('#firstModal').show();
    },

    modalClose: function(e){
        e.preventDefault();
        $(e.target).parent().parent().hide();

    },

    modalNext: function(e){
        e.preventDefault();
        $(e.target).parent().parent().hide().next().show();
    },

    modalBack: function(e){
        e.preventDefault();
        $(e.target).parent().parent().hide().prev().show();
    },

    
    dontShow: function(e){
        e.preventDefault();
        if (!($(e.currentTarget).attr("value") == "1")){
            localStorage.setItem('neverShow', JSON.stringify(1));
            $(e.currentTarget).attr("value", "1");
        } else {
            $(e.currentTarget).attr("value", "0");
            localStorage.removeItem('neverShow');
        }
    },

    closeInstrStart: function(e){
        e.preventDefault();
        $(e.target).parent().parent().hide();
        window.location.href = "http://guessword.com/#trainingOn"
        trainingModelObj.set("settings",{"difficulty":$("#selDifficulty a").attr("value")});
        localStorage.reloadDifficulty = $("#selDifficulty a").attr("value");
    }

});

function trainingStartPageLoad() {
    $("#trainingStartPage").css("display", "none");
    $("#trainingStartPage").fadeIn(2000);
}
