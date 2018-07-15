// create an empty array of places
var places = [];

// create a place using KO observables
var Place = function(name, lat, lng, activities) {
    this.name = ko.observable(name);
    this.lat = ko.observable(lat);
    this.lng = ko.observable(lng);
    this.activities = ko.observableArray(activities);
    this.showPlace = ko.observable(true);

}

// populate the viewModel with default places
var viewModel = {
    places: [
        new Place("Grand Canyon National Park", 36.1069652, -112.1129972, ["Hiking", "Camping", "Swimming", "Biking"]),
        new Place("Lost Dutchman State Park", 33.4565, -111.4782, ["Hiking", "Biking"]),
        new Place("White Tank Mountain Regional Park", 33.4709558, -112.2353819, ["Hiking", "Biking"]),
        new Place("Tonto Natural Bridge State Park", 34.3222774, -111.453632, ["Hiking", "Biking", "Swimming"]),
        new Place("Usery Mountain Regional Park", 33.456737, -111.734434, ["Hiking"]),
        new Place("Slide Rock State Park", 34.9433769, -111.7529156, ["Hiking", "Swimming"]),
        new Place("Red Rock State Park", 34.8129229, -111.8305634, ["Hiking", "Biking"])
    ]
}
 
// apply KnockOut bindings
ko.applyBindings(viewModel);