initialize = ->
  myOptions =
    zoom: 12
    mapTypeId: google.maps.MapTypeId.HYBRID

  map_div = document.getElementById("map_canvas")
  map = new google.maps.Map(map_div, myOptions)
  geolocate map
