loadMap = (map_div_name) ->
  myOptions =
    zoom: 12
    mapTypeId: google.maps.MapTypeId.HYBRID

  map_div = document.getElementById map_div_name
  map = new google.maps.Map map_div, myOptions
  geolocate map
