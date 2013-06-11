// **actionController instance**
var actionController = Backbone.Model.extend({
	initialize: function(button) {
		var btn = {name: button};
		new buttonClickView(btn);
	}
});