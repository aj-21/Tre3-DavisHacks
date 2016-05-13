var garbage_can = new Object();
garbage_can.lat = 38.5425717;
garbage_can.lon =-121.7597407;
garbage_can.status = 1;
var flag;
var lock = 1;
  ///////////////////////////
  //GOOGLE MAPS
  //////////////////////////

  //Start geolocation
  if (navigator.geolocation) {    
  
    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message);
    }
    
    function success(pos){
      userCords = pos.coords;
      
      //return userCords;
    }
  
    // Get the user's current position
    navigator.geolocation.getCurrentPosition(success, error);
    //console.log(pos.latitude + " " + pos.longitude);
    } else {
      alert('Geolocation is not supported in your browser');
    }
  
  //End Geo location
  

  //map options
  var mapOptions = {
    zoom: 13,
    center: new google.maps.LatLng(38.5449, -121.7405),
    panControl: false,
    panControlOptions: {
      position: google.maps.ControlPosition.BOTTOM_LEFT
    },
    zoomControl: true,
    zoomControlOptions: {
      style: google.maps.ZoomControlStyle.LARGE,
      position: google.maps.ControlPosition.RIGHT_CENTER
    },
    scaleControl: true

  };
     console.log("map center: " + mapOptions.center);
     console.log("garb_can lat: " + garbage_can.lat);
     console.log("garb_can lon: " + garbage_can.lon);
     console.log("garb_can status: " + garbage_can.status);
  
  var myLatLng = new google.maps.LatLng(garbage_can.lat,garbage_can.lon);
  

//Adding infowindow option
infowindow = new google.maps.InfoWindow({
  content: "holding..."
});

//Fire up Google maps and place inside the map-canvas div



$(function() {
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  
    var destLatLng = {lat: 38.549664, lng: -121.7201987};
   var destMarker = new google.maps.Marker({
    position: destLatLng,
    map: map,
    title: 'Davis Waste Removal'
  });
  destMarker.setMap(map);
  console.log("mylat: " + myLatLng);
  
  //////////////////////
  //FIREBASE
  //////////////////////

  var myDataRef = new Firebase('https://tree3.firebaseio.com/ARC/');
  $('#messageInput').keypress(function (e) {
    if (e.keyCode == 13) {
      var name = $('#nameInput').val();
      var text = $('#messageInput').val();
      
      myDataRef.push({name: name, text: text});
      $('#messageInput').val('');
    }
  });
  myDataRef.on('child_added', function(snapshot) {
    var message = snapshot.val();
    displayChatMessage(message.Latitude, message.Longitude, message.Status);
  });
  function displayChatMessage(lat, lon, status) {
    console.log("CHANGE DETECTED");
    console.log("status: " + status);
    if(status === "Empty."){
      garbage_can.status = 0;
      flag = 0;
      console.log("empty");
    //  $('<div/>').text("no full garbage cans").appendTo($('#messagesDiv'));
    }
    else{
      garbage_can.status = 1;
      flag = 1;
      console.log("full");
      //$('<div/>').text(lon).prepend($('<em/>').text(lat + ' ').prepend(status)).appendTo($('#messagesDiv'));
    }
     garbage_can.lat = lat;
     garbage_can.lon = lon;
     
     console.log("garb in function: " + garbage_can.lat + " , " + garbage_can.lon);
   
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;

  };
  setTimeout(function(){
     var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'ARC Ballroom Garbage'
  });

  console.log("flag at maps: " + flag);
  
  if(flag == 1){
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer({ map: map,});
    marker.setMap(map);
    
    directionsService.route({
      origin: myLatLng,
      destination: destLatLng,
      travelMode: google.maps.TravelMode.DRIVING
    })
    
    var route_coords = [];
    route_coords.push(myLatLng);
    route_coords.push(destLatLng);
    
    var route = new google.maps.Polyline({
      path: route_coords,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    route.setMap(map);
  }
  else{
    marker.setMap(null);
    route.setMap(null);
  }
}, 1000);
  //////////markers
 
 

});