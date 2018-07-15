var map;
var markers = [];

function initMap() {
    // ** Create the map **
    map = new google.maps.Map(document.getElementById('map'), {
        //center on Phoenix, AZ to start
        center: {lat: 33.6050991, lng: -112.4052386},
        zoom: 13
    });

    // ** Create infoWindow **
    var infowindow = new google.maps.InfoWindow();

    // ** Create the markers **
    // Create an array of markers from the list of places on init
    for (var i = 0; i < viewModel.places.length; i++) {
        // Get the lat and lng from the viewModel and create a new latlng object
        var position = new google.maps.LatLng(viewModel.places[i].lat(),viewModel.places[i].lng());
        // Get the name of the location from the viewModel
        var title = viewModel.places[i].name();
        // Create a marker for each place
        var marker = new google.maps.Marker({
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Add the created marker to the markers array
        markers.push(marker);
        // Add listener to open the infoWindow for the clicked marker
        marker.addListener('click', function() {
            populateInfoWindow(this, infowindow);
        });
    }

    // Extends the bounds of the map for the initial markers
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(map);
      bounds.extend(markers[i].position);
    }
    map.fitBounds(bounds);

}

// The populateInfoWindow function creates an info window when the
// marker is click as well as when the place is clicked from the
// list on the sidebar.
function populateInfoWindow(marker, infowindow) {
    var address = "";
    var geocoder = new google.maps.Geocoder();
    // Checks to see if the infoWindow is already open for that marker
    // If it is, the infoWindow isn't populated
    if (infowindow.marker != marker) {
        // Reset infoWindow for marker
        infowindow.setContent('');
        infowindow.marker = marker;
        // Clear marker object when window is closed
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });

        // Get the formatted address for the place
        geocoder.geocode({ 'latLng': marker.position}, function(results, status) {
            // Geocoder didn't error out
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    // Geocoder returned successfully with a result
                    // Add address to the infoWindow
                    address = results[1].formatted_address;
                    infowindow.setContent('<div>' + marker.title + '</div>' + '</br>' + '<div>' + address + '</div>');
                } else {
                    // Geocoder didn't error out but didn't find any address for the place
                    infowindow.setContent('<div>' + marker.title + '</div>' + '<div>No Results Found</div>');
                }
            } else {
                // Geocoder encountered an error
                infowindow.setContent('<div>' + marker.title + '</div>' + '<div>Geocoder failed! Error: ' + status + '</div>');
            }
            });

        // open infoWindow
        infowindow.open(map, marker);
    }
}

// This function loops through the array of markers to find the marker
// that has the same title as the clicked list item. When the list item
// is found, it calls the onClick event for the specified marker, which
// populates and opens the infoWindow for that marker.
function openInfoWindowForClickedPlace(name){
    // loop through markers array
    for (var i = 0; i < markers.length; i++) {
        // check if clicked name is the same as marker title
        // if true, run onclick event for the matching marker
        if(name === markers[i].title){ google.maps.event.trigger(markers[i], 'click'); };
    }
}

function filterPlacesList(activity){
    for (var i = 0; i < viewModel.places.length; i++){
        if(!viewModel.places[i].activities().includes(String(activity))){ 
            viewModel.places[i].showPlace(false);
            hideMarker(viewModel.places[i].name());
        }else {
            viewModel.places[i].showPlace(true);
            showMarker(viewModel.places[i].name());
        }
    }
}

function hideMarker(title) {
    for (var i = 0; i < markers.length; i++) {
      if(title === markers[i].title){markers[i].setMap(null);}
    }
}

function showMarker(title) {
    for (var i = 0; i < markers.length; i++) {
      if(title === markers[i].title){markers[i].setMap(map);}
    }
}