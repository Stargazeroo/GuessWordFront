// **mainPageView instance**: Instantiate main app view.
var mainSectionView = Backbone.View.extend({
    el: $('#contentBlock'),

    initialize: function(mainSection,currentWindow){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(mainSection,currentWindow);
    },

    render: function(mainSection,currentWindow){
        if (!($.cookie("login"))){
            var currentWindow = currentWindow || window;
            currentWindow.location.href = loginIndex;
            return false;
        }
        this.$el.empty();  // delets all elements from 'body' element
        var mainSectionTemplate = new EJS({url:'/javascripts/1P/templates/mainSection.ejs'}).render(mainSection);
        this.$el.append(mainSectionTemplate);
        mainSectionLoad();
        menuRotate();
    },

    events: {
        "click #mainSection a" : "clickFunc",
        "mouseover #mainSection a:nth-child(1)": "skAnim"
    },


    clickFunc: function(e, clickFuncRedirect) {
        e.preventDefault();
        this.undelegateEvents();
        $('#mainSection > a').unbind('mouseenter mouseleave');
        $("#sk").addClass("skDissapear").fadeOut(1000);
        $(e.currentTarget).addClass('clickAnim').siblings().addClass('clickAnimSiblings');
        $(e.currentTarget).on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(e) {
            var currentWindow = clickFuncRedirect || window;            
            currentWindow.location.href = $(e.currentTarget).attr('href');
        });
    },
    //animation
    skAnim: function(){
        $("#sk").addClass("skDissapear").fadeOut(1000);
    }
 });

