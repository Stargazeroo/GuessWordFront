var userModel = Backbone.Model.extend({
    defaults: {
        trainingResults: "app_trainingResults",
        matchResults   : "app_matchResults",
        userAge: "app_age",
        userLocation: "app_location"
    }
});