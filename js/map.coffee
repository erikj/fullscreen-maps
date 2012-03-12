map ={}

# loadMap(map_div_name): initialize a google map on the map DOM element
# input: String, name of map div DOM element

loadMap = (map_div_name) ->
  myOptions =
    zoom: 12
    mapTypeId: google.maps.MapTypeId.HYBRID
    mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN, 'OSM'] }

  map = new google.maps.Map document.getElementById(map_div_name), myOptions

  map.mapTypes.set "OSM", new google.maps.ImageMapType(
    getTileUrl: (coord, zoom) ->
      "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png"
    tileSize: new google.maps.Size(256, 256)
    name: "OpenStreetMap"
    maxZoom: 18
  )

  geolocate map

# http://code.google.com/apis/maps/documentation/javascript/geocoding.html

search = () ->
  geocoder = new google.maps.Geocoder
  geocoder.geocode address: document.getElementById("search_address").value,
    (results, status) ->
      if status is google.maps.GeocoderStatus.OK
        location = results[0].geometry.location
        # alert location
        # TODO: add marker
        map.setCenter location
      else
        alert "Not found: " + status

  return location

geolocate = () ->
  newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687)
  handleNoGeolocation = () ->
    map.setCenter newyork

  if navigator.geolocation
    navigator.geolocation.getCurrentPosition ( (position) ->
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      map.setCenter initialLocation
    ), ->
      handleNoGeolocation()
  else
    handleNoGeolocation()
