$.cookie('login', 'test');

localStorage.setItem('main', JSON.stringify({"test": "test"}));
localStorage.setItem('training', JSON.stringify({"test": "test"}));

var customWindow = {
    location: {
        href: ''
    },
    history: {
        back: function() {
            return false;
        }
    }
};
var customBackbone = {
    history: {
        loadUrl: function() {
            return false;
        },
        getFragment: function() {
            return false;
        }
    }
};