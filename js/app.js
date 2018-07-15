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
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open the large infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, infowindow);
        });
/*         // Two event listeners - one for mouseover, one for mouseout,
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

// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
        /* var streetViewService = new google.maps.StreetViewService();
        var radius = 50;
        // In case the status is OK, which means the pano was found, compute the
        // position of the streetview image, then calculate the heading, then get a
        // panorama from that and set the options
        function getStreetView(data, status) {
        if (status == google.maps.StreetViewStatus.OK) {
            var nearStreetViewLocation = data.location.latLng;
            var heading = google.maps.geometry.spherical.computeHeading(
            nearStreetViewLocation, marker.position);
            infowindow.setContent('<div>' + marker.title + '</div><div id="pano"></div>');
            var panoramaOptions = {
                position: nearStreetViewLocation,
                pov: {
                heading: heading,
                pitch: 30
                }
            };
            var panorama = new google.maps.StreetViewPanorama(
            document.getElementById('pano'), panoramaOptions);
        } else {
            infowindow.setContent('<div>' + marker.title + '</div>' +
            '<div>No Street View Found</div>');
        }
        }
        // Use streetview service to get the closest streetview image within
        // 50 meters of the markers position
        streetViewService.getPanoramaByLocation(marker.position, radius, getStreetView); */
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}