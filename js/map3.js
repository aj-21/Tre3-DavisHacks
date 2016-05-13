
$(function() {
  
  /////////////////////////////////////////////////////
  //Firebase
  ////////////////////////////////////////////////////
  garbage_can = [];
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
    if(status == "Empty\r\n" || lat == "NA"){
      garbage_can.status = 0;
    //  $('<div/>').text("no full garbage cans").appendTo($('#messagesDiv'));
    }
    else{
      garbage_can.lat = lat;
      garbage_can.lon = lon;
      garbage_can.status = 1;
      //$('<div/>').text(lon).prepend($('<em/>').text(lat + ' ').prepend(status)).appendTo($('#messagesDiv'));
    }
    $('#messagesDiv')[0].scrollTop = $('#messagesDiv')[0].scrollHeight;
  };
  
  ////////////////////////////////////////////////
	
		var marketId = []; //returned from the API
		var allLatlng = []; //returned from the API
		var allMarkers = []; //returned from the API
		var marketName = []; //returned from the API
		var path_coordinates = [];
		var infowindow = null;
		var pos;
		var userCords;
		var tempMarkerHolder = [];
		
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
			zoom: 4,
			center: new google.maps.LatLng(37.09024, -100.712891),
			panControl: false,
			panControlOptions: {
				position: google.maps.ControlPosition.BOTTOM_LEFT
			},
			zoomControl: true,
			zoomControlOptions: {
				style: google.maps.ZoomControlStyle.LARGE,
				position: google.maps.ControlPosition.RIGHT_CENTER
			},
			scaleControl: false

		};
	
	//Adding infowindow option
	infowindow = new google.maps.InfoWindow({
		content: "holding..."
	});
	
	//Fire up Google maps and place inside the map-canvas div
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	//grab form data
    $('#chooseZip').submit(function() { // bind function to submit event of form
    	//reset arrays
    	/*
    	marketId = []; 
		allLatlng = []; 
		allMarkers = []; 
		marketName = []; 
		tempMarkerHolder = []; 
		path_coordinates = [];
		*/
		//define and set variables
		var userZip = $("#textZip").val();
		//console.log("This-> " + userCords.latitude);
		
		var accessURL;


			//Use the zip code and return all market ids in area.
			$.ajax({
				type: "GET",
				contentType: "application/json; charset=utf-8",
				url: accessURL,
				dataType: 'jsonp',
				success: function (data) {
					marketId = []; 
					allLatlng = []; 
					allMarkers = []; 
					marketName = []; 
					tempMarkerHolder = []; 
					path_coordinates = [];

					 $.each(data.results, function (i, val) {
						marketId.push(val.id);
						marketName.push(val.marketname);
					 });
						
					//console.log(marketName);
					
					var counter = 0;
					
				}
			});

        return false; // important: prevent the form from submitting
    });
});