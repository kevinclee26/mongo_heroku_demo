// function createMarkers(response) {

//   // Pull the "stations" property off of response.data
//   // var stations = response.data.stations;
//   // console.log('test')
//   // Initialize an array to hold bike markers
//   var bikeMarkers = [];
//   // console.log(response.length);
//   // Loop through the stations array
//   for (var index = 0; index < response.length; index++) {
//     var station = response[index]['location'];

//     // For each station, create a marker and bind a popup with the station's name
//     var bikeMarker = L.marker([station.latitude, station.longitude])
//       .bindPopup("<h3>" + station.name + "<h3><h3>Capacity: " + station.capacity + "</h3>");

//     // Add the marker to the bikeMarkers array
//     bikeMarkers.push(bikeMarker);
//   }

//   // Create a layer group made from the bike markers array, pass it into the createMap function
//   createMap(L.layerGroup(bikeMarkers));
//   // createMap(L.LayerGroup());
// }

// // myMap()

// function createMap(bikeStations) {
//   d3.json('/get_token').then(key=>{
//     var API_KEY=key['mapbox_token']
//     // Create the tile layer that will be the background of our map
//     var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//       attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//       maxZoom: 18,
//       id: "light-v10",
//       accessToken: API_KEY
//     });

//     // Create a baseMaps object to hold the lightmap layer
//     var baseMaps = {
//       "Light Map": lightmap
//     };

//     // Create an overlayMaps object to hold the bikeStations layer
//     var overlayMaps = {
//       "Bike Stations": bikeStations
//     };

//     // Create the map object with options
//     var map = L.map("mapid", {
//       center: [0, 0],
//       zoom: 2,
//       layers: [lightmap, bikeStations]
//     });

//     // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);
//   })
// }

// // // Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
// // d3.json("https://gbfs.citibikenyc.com/gbfs/en/station_information.json", createMarkers);
// d3.json("/all_data").then(response=>{
// 	createMarkers(response)
// });
