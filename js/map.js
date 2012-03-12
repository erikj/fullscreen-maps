var geolocate, loadMap, map, search;

map = {};

loadMap = function(map_div_name) {
  var myOptions;
  myOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.HYBRID,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN, 'OSM']
    }
  };
  map = new google.maps.Map(document.getElementById(map_div_name), myOptions);
  map.mapTypes.set("OSM", new google.maps.ImageMapType({
    getTileUrl: function(coord, zoom) {
      return "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png";
    },
    tileSize: new google.maps.Size(256, 256),
    name: "OpenStreetMap",
    maxZoom: 18
  }));
  return geolocate(map);
};

search = function(address) {
  var geocoder;
  geocoder = new google.maps.Geocoder;
  geocoder.geocode({
    address: address
  }, function(results, status) {
    var location;
    if (status === google.maps.GeocoderStatus.OK) {
      location = results[0].geometry.location;
      return map.setCenter(location);
    } else {
      return alert("Not found: " + status);
    }
  });
  return location;
};

geolocate = function() {
  var handleNoGeolocation, newyork;
  newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687);
  handleNoGeolocation = function() {
    return map.setCenter(newyork);
  };
  if (navigator.geolocation) {
    return navigator.geolocation.getCurrentPosition((function(position) {
      var initialLocation;
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      return map.setCenter(initialLocation);
    }), function() {
      return handleNoGeolocation();
    });
  } else {
    return handleNoGeolocation();
  }
};
