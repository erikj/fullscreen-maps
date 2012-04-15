 # compile w/
# % coffee -c js/map.coffee
# => js/map.js

FSMAP = {} # our library
@FSMAP = FSMAP # add to global

FSMAP.map = {}

# loadMap(map_div_name): initialize a google map on the map DOM element
# input: String, name of map div DOM element

FSMAP.loadMap = (map_div_name) ->
  myOptions =
    zoom: 12
    mapTypeId: google.maps.MapTypeId.ROADMAP
    mapTypeControlOptions: { mapTypeIds: [google.maps.MapTypeId.ROADMAP, google.maps.MapTypeId.SATELLITE, google.maps.MapTypeId.HYBRID, google.maps.MapTypeId.TERRAIN, 'OSM'] }

  FSMAP.map = new google.maps.Map document.getElementById(map_div_name), myOptions

  FSMAP.map.mapTypes.set "OSM", new google.maps.ImageMapType(
    getTileUrl: (coord, zoom) ->
      "http://tile.openstreetmap.org/" + zoom + "/" + coord.x + "/" + coord.y + ".png"
    tileSize: new google.maps.Size(256, 256)
    name: "OpenStreetMap"
    maxZoom: 18
  )

  geolocate FSMAP.map

# search(address): search for address, re-center map to first search result
# input: String, address / city, etc.
# google geocoding reference:
# - http://code.google.com/apis/maps/documentation/javascript/geocoding.html
@search = (address) ->
  geocoder = new google.maps.Geocoder
  # TODO: search based on current location, from map center
  geocoder.geocode address:address,
    (results, status) ->
      if status is google.maps.GeocoderStatus.OK

        updateMap results[0]

        if results.length > 1
          FSMAP.results = results

          $('#search-results').show()
          for result, i in FSMAP.results
            resultId = "result-#{i}"
            resultContent = "<a href='javascript:void(0);' id='#{resultId}'>" + result.formatted_address + '</a>'
            resultContent = "<div>" + resultContent + "</div>"

            $('#search-results').append resultContent

            $("##{resultId}").click () ->
              resultId = this.id.replace('result-','')
              updateMap FSMAP.results[resultId]

          console.log FSMAP.results

      else
        alert "Not found: " + status

  return location

# updateMap(result): re-center map, update marker based on geocoder result
# input: geocoder result
updateMap = (result) ->

  location = result.geometry.location
  FSMAP.map.setCenter location
  # add marker
  marker = new google.maps.Marker { position: location, map: FSMAP.map }

  google.maps.event.addListener marker, 'click', ->
    infoWindow = new google.maps.InfoWindow
    infoWindow.setContent result.formatted_address
    infoWindow.open FSMAP.map, marker

# geolocate(): attempt to center map by calling browser geolocation
geolocate = () ->
  newyork = new google.maps.LatLng(40.69847032728747, -73.9514422416687)
  handleNoGeolocation = () ->
    FSMAP.map.setCenter newyork

  if navigator.geolocation
    navigator.geolocation.getCurrentPosition ( (position) ->
      initialLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
      FSMAP.map.setCenter initialLocation
    ), ->
      handleNoGeolocation()
  else
    handleNoGeolocation()
