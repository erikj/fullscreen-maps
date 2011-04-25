
// http://code.google.com/apis/maps/documentation/javascript/basics.html
// The following example attempts to determine the user's location through
// the W3C navigator.geolocation property first, attempts a Google Gears approach
// second, and bails out if neither approach works.

// Note that using Google Gears requires loading the Javascript
// at http://code.google.com/apis/gears/gears_init.js

var initialLocation;
var newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);

function geolocate(map) {

    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
        // browserSupportFlag = true;
        navigator.geolocation.getCurrentPosition( function(position) {
            initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
            map.setCenter(initialLocation);
        }, function() {
            handleNoGeolocation();
        });

    // Try Google Gears Geolocation
    } else if (google.gears) {
        eval('http://code.google.com/apis/gears/gears_init.js');
        var geo = google.gears.factory.create('beta.geolocation');
        geo.getCurrentPosition( function(position) {
            initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
            map.setCenter(initialLocation);
        }, function() {
            handleNoGeoLocation();
        });

    // Browser doesn't support Geolocation

    } else {
        handleNoGeolocation();
    }
  
    function handleNoGeolocation() {
        map.setCenter(newyork);
    }
}
