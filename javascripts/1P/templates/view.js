var ListView = Backbone.View.extend({
    el: $('body'),
    initialize: function(){
        _.bindAll(this, 'render');
        this.render(); 
    },
    render: function(){
        var data = new logIn();
        var dict = data.get('fields');
        var dict2 = data.get('buttons');
        var fields = new EJS({url:'/javascripts/1P/templates/fieldsLogin.ejs'}).render(dict);
        var buttons = new EJS({url:'/javascripts/1P/templates/buttonsLogin.ejs'}).render(dict2);
        $(this.el).append(fields);
	    $(this.el).append(buttons);
    }
});   

var listView = new ListView();
