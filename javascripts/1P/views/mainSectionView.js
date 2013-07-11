// **mainPageView instance**: Instantiate main app view.
var mainSectionView = Backbone.View.extend({
    el: $('#contentBlock'),

    initialize: function(mainSection){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(mainSection);
    },

    render: function(mainSection){
        if (!($.cookie("login"))){
            window.location.href = "http://guessword.com/#login";
        }else{
            this.$el.empty();  // delets all elements from 'body' element
            var mainSectionTemplate = new EJS({url:'/javascripts/1P/templates/mainSection.ejs'}).render(mainSection);
            this.$el.append(mainSectionTemplate);
            mainSectionLoad();
            mainSectionBackAnim();
        }
    },

    events: {
        "mouseover #mainSection a": "hoverOn",
        "mouseout #mainSection a" : "hoverOff",
        "click #mainSection a" : "clickFunc",
    },

    hoverOn: function(e) {
        var el = e;
        var color = 'rgb(' + (Math.floor(Math.random()/3 * 256)) + ',' + (Math.floor(Math.random()/3 * 256)) + ',' + (Math.floor(Math.random()/3 * 256)) + ')';
        $(e.currentTarget).addClass('rotate').css("background", color);
            
    },

    hoverOff: function(e) {
        $(e.currentTarget).removeClass('rotate');
    },

    clickFunc: function(e) {
        e.preventDefault();
        this.undelegateEvents();
        speed = 3;
            $('#mainSection a').not(e.currentTarget).addClass('clickAnim').css('background','black');
            //$(e.currentTarget).addClass('clickAnim').css('background','black');
            $("#mainSection a").bind('animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
            window.location.href = $(e.currentTarget).attr('href');
        });
            
    }
 
});

function _getBrowserCssPrefix() {
    switch(Browser.name) {
        case "safari":
            return "webkit";
        break;
        case "chrome":
            return "webkit";
        break;
        case "firefox":
            return "moz";
        break;
        case "opera":
            return "o";
        break;
        case "ie":
            return "ms";
        break;
        default: return "";
    }
}
function mainSectionLoad() {
    $("#mainSection").css("display", "none");
    $("#mainSection").fadeIn(2000);
}

function mainSectionBackAnim() {
    var cssPrefix = _getBrowserCssPrefix();
    if(cssPrefix) { // Skip IE!
        degrees = 0, speed = 0.3;
        setInterval(function() {
            degrees += speed; // degree adjustment each interval
            $('#mainSectionBack').attr("style","-" + cssPrefix + "-transform:rotate(" + degrees + "deg)");
        },20);
    }

}
