// **mainPageView instance**: Instantiate main app view.
var mainSectionView = Backbone.View.extend({
    el: $('#contentBlock'),

    initialize: function(mainSection){
        _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods
        this.render(mainSection);
    },

    render: function(mainSection){
        if (!($.cookie("login"))){
            window.location.href = loginIndex;
            return false;
        }
        this.$el.empty();  // delets all elements from 'body' element
        var mainSectionTemplate = new EJS({url:'/javascripts/1P/templates/mainSection.ejs'}).render(mainSection);
        this.$el.append(mainSectionTemplate);
        mainSectionLoad();
    },

    events: {
        "mouseover #mainSection a": "hoverOn",
        "mouseout #mainSection a" : "hoverOff",
        "click #mainSection a" : "clickFunc",
        "mouseover #mainSection a:nth-child(1)": "skAnim"
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
        // e.preventDefault();
        // this.undelegateEvents();
        //     $('#mainSection a').not(e.currentTarget).addClass('clickAnim').css('background','black');
        //     $("#mainSection a").bind('animationend mozAnimationEnd webkitAnimationEnd MSAnimationEnd oAnimationEnd', function(){
        //     window.location.href = $(e.currentTarget).attr('href');
        //     console.log('1');
        // });
        e.preventDefault();
        this.undelegateEvents();
        $('#mainSection a').removeClass('rotate');
        $('#mainSection a').not(e.currentTarget).addClass('clickAnim').css('background', "#000000");
        $('#mainSection a').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
            window.location.href = $(e.currentTarget).attr('href');
        });
    },
    //animation
    skAnim: function(){
        $("#sk").addClass("skDissapear").fadeOut(1000);
    }

 });

