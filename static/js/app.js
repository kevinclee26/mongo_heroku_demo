d3.json("/get_token").then(key=>{
    var API_KEY=key['mapbox_token']

    // Create the map object with options
    var map = L.map("mapid", {
		center: [0, 0],
		zoom: 2,
    });

    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
		attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
		maxZoom: 18,
		id: 'satellite-v9',
		accessToken: API_KEY
    }).addTo(map);

	function getIcon(cnt_launch) {
	    var icon_size = [cnt_launch, cnt_launch];   //for dynamic icon size, 
	    var image_url = icon_path;        //for dynamic images

	    return L.icon({
	        iconUrl: image_url,
	        // shadowUrl: 'leaf-shadow.png',
	        iconSize:    icon_size , // size of the icon
	        // shadowSize:   [50, 64], // size of the shadow
	        iconAnchor:   [cnt_launch/2, cnt_launch/2], // point of the icon which will correspond to marker's location
	    });
	}
	
    d3.json('/cnt_launches_per_site').then(launchpads=>{
    	var launchpad_markers=[]
    	launchpads.forEach(launchpad=>{
    		var location = launchpad['launch_site']['location'];
    		// For each launchpad, create a marker
		    var launchpad_marker = L.marker([location.latitude, location.longitude], {'icon': getIcon(launchpad['count'])})
		    // L.marker([location.latitude, location.longitude]).addTo(map)
		    // Add the marker to the launchpad_markers array
		    launchpad_markers.push(launchpad_marker);
		})
		var launchpad_layer=L.layerGroup(launchpad_markers)
		launchpad_layer.addTo(map)
	})
});