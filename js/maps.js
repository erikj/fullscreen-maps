
function initialize() {
    var myOptions = {
        zoom: 12,
        mapTypeId: google.maps.MapTypeId.HYBRID
    };
    var map_div = document.getElementById("map_canvas")
    var map = new google.maps.Map(map_div, myOptions);
    geolocate(map);
}