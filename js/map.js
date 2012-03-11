var loadMap;

loadMap = function(map_div_name) {
  var map, myOptions;
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
