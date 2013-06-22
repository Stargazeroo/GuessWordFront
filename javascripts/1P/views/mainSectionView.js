// **mainPageView instance**: Instantiate main app view.
var mainSectionView = Backbone.View.extend({
    el: $('#contentBlock'),

    initialize: function(mainSection){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(mainSection);
    },

    render: function(mainSection){
        this.$el.empty();  // delets all elements from 'body' element
        var mainSectionTemplate = new EJS({url:'/javascripts/1P/templates/mainSection.ejs'}).render(mainSection);
        this.$el.append(mainSectionTemplate);
        $(document).ready(function() {
            $("#mainSection").css("display", "none");
            $("#mainSection").fadeIn(2000);
            var cssPrefix = _getBrowserCssPrefix();
            if(cssPrefix) { // Skip IE!
                degrees = 0, speed = 0.3;
                setInterval(function() {
                    degrees += speed; // degree adjustment each interval
                    $('#mainSectionBack').attr("style","-" + cssPrefix + "-transform:rotate(" + degrees + "deg)");
                },20);
            }
            $("#mainSection").mouseover(function(){
                speed = 1;    
            });
            $("#mainSection").mouseout(function(){
                speed = 0.3;    
            });
        });
    },

    events: {
        "mouseover a": "hoverOn",
        "mouseout a" : "hoverOff",
    },

    hoverOn: function(e) {
        var el = e;
        var color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        $(e.currentTarget).stop(false, true).addClass('rotate').css("background", color);
            
    },

    hoverOff: function(e) {
        $(e.currentTarget).removeClass('rotate').css("background", color);
    },
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
