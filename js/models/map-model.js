var places = [];

var Place = function(name, lat, lng, activities) {
    this.name = ko.observable(name);
    this.lat = ko.observable(lat);
    this.lng = ko.observable(lng);
    this.activities = ko.observableArray(activities);
    this.showPlace = ko.observable(true);

}

var viewModel = {
    places: [
        new Place("Grand Canyon National Park", 36.1069652, -112.1129972, ["Hiking", "Camping", "Swimming", "Biking"]),
        new Place("Lost Dutchman State Park", 33.4565, -111.4782, ["Hiking", "Biking"]),
        new Place("White Tank Mountain Regional Park", 33.4709558, -112.2353819, ["Hiking", "Biking"]),
        new Place("Tonto Natural Bridge State Park", 33.4709558, -114.3518127, ["Hiking", "Biking", "Swimming"]),
        new Place("Usery Mountain Regional Park", 33.456737, -111.734434, ["Hiking"])
    ]
}
 
ko.applyBindings(viewModel);