var map;
function initMap() {
  // TODO: use a constructor to create a new map JS object. You can use the coordinates
  // we used, 40.7413549, -73.99802439999996 or your own!
  map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 40.7413549, lng: -73.99802439999996},
      zoom: 13
  });
}