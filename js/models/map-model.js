var places = [];

var Place = function(name, lat, lng) {
    this.name = ko.observable(name);
    this.lat = ko.observable(lat);
    this.lng = ko.observable(lng);
}
 
// The view model is an abstract description of the state of the UI, but without any knowledge of the UI technology (HTML)
var viewModel = {
    places: [
        new Place("Grand Canyon National Park", 36.1069652, -112.1129972),
        new Place("Lost Dutchman State Park", 33.4565, -111.4782),
        ]
};
 
ko.applyBindings(viewModel);