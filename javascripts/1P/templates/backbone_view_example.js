(function($){
    // **ListView class**: Our main app view.
    var data = $.ajax({
			url: 'http://localhost:5000/AppsData/index',
			dataType:'json',
			});
    var dict = $.evalJSON(data);
    var ListView = Backbone.View.extend({
    // `initialize()`: Automatically called upon instantiation. Where you make 
    //all types of bindings, _excluding_ UI events, such as clicks, etc.
        initialize: function(){
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.render(); // not all views are self-rendering. This one is.
        },
    // `render()`: Function in charge of rendering the entire view in `myDiv`. Needs to be manually called by the user.
        render: function(){
            new EJS({url:'/javascripts/1P/templates/template1.ejs'}).update('myDiv',dict)
        }
    });
    var listView = new ListView();// **listView instance**: Instantiate main app view.
})(jQuery);
