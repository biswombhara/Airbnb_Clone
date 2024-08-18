mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 9 // starting zoom
});


 //Create a default Marker and add it to the map.
 const marker1 = new mapboxgl.Marker({color:"red"})
 .setLngLat(listing.geometry.coordinates)
 .setPopup(
    new mapboxgl.Popup({offset: 25})
    .setHTML(`<h4>${listing.location}</h4><h6>Exact location will provided after booking..</h6>`)
 )
 .addTo(map);