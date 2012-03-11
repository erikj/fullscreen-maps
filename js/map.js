var loadMap;

loadMap = function(map_div_name) {
  var map, map_div, myOptions;
  myOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.HYBRID
  };
  map_div = document.getElementById(map_div_name);
  map = new google.maps.Map(map_div, myOptions);
  return geolocate(map);
};
