var map;
var markers = [];


// This function initializes everything on page load.
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
            this.setAnimation(google.maps.Animation.BOUNCE);
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
            marker.setAnimation(null);
        });

        // Get the formatted address for the place
        geocoder.geocode({ 'latLng': marker.position}, function(results, status) {
            // Geocoder didn't error out
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    // Geocoder returned successfully with a result
                    // Add address to the infoWindow
                    address = results[1].formatted_address;
                    infowindow.setContent('<div><h4>' + marker.title + '</h4></div>' + '</br>' + '<div>' + address + '</div>');
                } else {
                    // Geocoder didn't error out but didn't find any address for the place
                    infowindow.setContent('<div><h4>' + marker.title + '</h4></div>' + '<div>No Results Found</div>');
                }
            } else {
                // Geocoder encountered an error
                infowindow.setContent('<div><h4>' + marker.title + '</h4></div>' + '<div>Geocoder failed! Error: ' + status + '</div>');
            }
            });

        // Get place description from WikiPedia
        var wikiURL = "https://en.wikipedia.org/w/api.php?action=opensearch&search="+marker.title+"&format=json";
        var description;

        // Error handling for wikipedia API call
        var requestTimeout = setTimeout(function(){
            infowindow.setContent(infowindow.getContent() + "</br><div>Sorry! There was an error getting description.</div>");
        }, 3000);

        // Run ajax function for wikipedia API request
        $.ajax({
            url: wikiURL,
            dataType: "jsonp",
            success: function( response ){
                // Check to make sure the request isn't undefined or blank because
                // some places don't have a description in wikipedia.
                if(response[2][0] != null && response[2][0] != ""){
                    // If there is a response, add the description to the info window
                    description = response[2][0];
                    infowindow.setContent(infowindow.getContent() + "</br><div>"+description+"</div>");
                }else{
                    // if there is no description found for this place, tell the user
                    infowindow.setContent(infowindow.getContent() + "</br><div>Sorry! No description was found for this place!</div>");
                }
                //error handling
                clearTimeout(requestTimeout);
            }
        });

        // open infoWindow
        infowindow.open(map, marker);
        // Turn off bounce animation
        marker.setAnimation(null);    }
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

// This functiion loops through all of the places in the array
// and checks if it's activity array includes the selected activity.
// If there is a match, that place is displayed, and if there is not
// a match, the place is hidden from the list and marker removed from map.
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

// This function is called to hide the map marker when the place
// does not have an activity that matches the filter.
function hideMarker(title) {
    for (var i = 0; i < markers.length; i++) {
      if(title === markers[i].title){markers[i].setMap(null);}
    }
}

// This function is called to show the map marker when the place
// matches an activity chosen on the filter.
function showMarker(title) {
    for (var i = 0; i < markers.length; i++) {
      if(title === markers[i].title){markers[i].setMap(map);}
    }
}

// This function sets the style of the navigation window
// when the show button is clicked.
function showNavMenu() {
    document.getElementById('sidebar').style.display = 'block';
    document.getElementById('sidebar').style.minWidth = '300px';
    document.getElementById('sidebar').style.maxWidth = '300px';
    document.getElementById('showNavButton').style.display = 'none';
    document.getElementById('hideNavButton').style.display = 'block';
}

// This function sets the style of the navigation window
// when the hide button is clicked.
function hideNavMenu() {
    document.getElementById('sidebar').style.display = 'none';
    document.getElementById('sidebar').style.minWidth = '0px';
    document.getElementById('sidebar').style.maxWidth = '0px';
    document.getElementById('showNavButton').style.display = 'block';
    document.getElementById('hideNavButton').style.display = 'none';
}

window.mapsAPIError = function(){
    window.alert("I'm sorry! There was an error and the Google Map failed to load :(");
  };