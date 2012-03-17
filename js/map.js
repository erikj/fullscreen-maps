(function() {
  var geolocate, map;

  map = {};

  this.loadMap = function(map_div_name) {
    var myOptions;
    myOptions = {
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
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

  this.search = function(address) {
    var geocoder;
    geocoder = new google.maps.Geocoder;
    geocoder.geocode({
      address: address
    }, function(results, status) {
      var location, marker;
      if (status === google.maps.GeocoderStatus.OK) {
        location = results[0].geometry.location;
        map.setCenter(location);
        marker = new google.maps.Marker({
          position: location,
          map: map
        });
        return google.maps.event.addListener(marker, 'click', function() {
          var infoWindow;
          infoWindow = new google.maps.InfoWindow;
          infoWindow.setContent(results[0].formatted_address);
          return infoWindow.open(map, marker);
        });
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

}).call(this);
