let usgsUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

d3.json(usgsUrl).then(data => {
    
    // Display data in console
    console.log(data);

    // Call the createFeatures function with data from the USGS response
    createFeatures(data.features);

});

function createFeatures(earthquakeData) {

    function onEachFeature(feature, layer) {
        let html = `<h3>${feature.properties.place}</h3><hr><p>Mag: ${feature.properties.mag}</p><hr><p>${new Date(feature.properties.time)}</p>`
        layer.bindPopup(html);
      };
    
      // Create a GeoJSON layer that contains the features array on the earthquakeData object.
      // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
        //onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {

            let html = `<h3>${feature.properties.place}</h3><hr>
            <p>Magnitude: ${feature.properties.mag}</p><br>
            <p>Depth: ${feature.geometry.coordinates[2]}</p><br>
            <p>${new Date(feature.properties.time)}</p>`

            circle = L.circleMarker(latlng, {
            stroke: false,
            fillOpacity: 0.75,
            color: "purple",
            fillColor: "purple",
            radius: Math.sqrt(feature.properties.mag) * 10
            }).bindPopup(html);
    
            return circle
        }
    });

      createMap(earthquakes);

}

function createMap(earthquakes) {
    let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      })

L.map("map", {
    center: [
        37.7517, -106.1063
    ],
    zoom: 5,
    layers: [street, earthquakes]
    });
}