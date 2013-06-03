(function($){
    // **ListView class**: Our main app view.
    var data = {Group: 'LV-087', buttons: ['mop_bt', 'bop_bt', 'fop_bt']}
    var encoded = $.toJSON(data);
    var name = $.evalJSON(encoded)
    var ListView = Backbone.View.extend({
    // `initialize()`: Automatically called upon instantiation. Where you make 
    //all types of bindings, _excluding_ UI events, such as clicks, etc.
        initialize: function(){
            _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

            this.render(); // not all views are self-rendering. This one is.
        },
    // `render()`: Function in charge of rendering the entire view in `myDiv`. Needs to be manually called by the user.
        render: function(){
            new EJS({url:'/javascripts/1P/templates/template.ejs'}).update('myDiv', name)
        }
    });
    var listView = new ListView();// **listView instance**: Instantiate main app view.
})(jQuery);
