var map;
var markers = [];

function initMap() {
    // ** Create the map **
    map = new google.maps.Map(document.getElementById('map'), {
        //center on Phoenix, AZ to start
        center: {lat: 33.6050991, lng: -112.4052386},
        zoom: 13
    });

    // ** Create the markers **
    // Create an array of markers from the list of places on init
    for (var i = 0; i < viewModel.places.length; i++) {
        // Get the lat and lng from the viewModel and create a new latlng object
        var position = new google.maps.LatLng(viewModel.places[i].lat(),viewModel.places[i].lng());
        // Get the name of the location from the viewModel
        var title = viewModel.places[i].name();

        console.log(position + ' ' + title);
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            //icon: defaultIcon,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
/*         // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        // Two event listeners - one for mouseover, one for mouseout,
        // to change the colors back and forth.
        marker.addListener('mouseover', function() {
            this.setIcon(highlightedIcon);
        });
        marker.addListener('mouseout', function() {
            this.setIcon(defaultIcon);
        }); */
    }

    var bounds = new google.maps.LatLngBounds();
    // Extend the boundaries of the map for each marker and display the marker
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

   /*  //create search box
    var searchBox = new google.maps.places.SearchBox(
    document.getElementById('places-search'));
    // Bias the searchbox to within the bounds of the map.
    searchBox.setBounds(map.getBounds()); */
}