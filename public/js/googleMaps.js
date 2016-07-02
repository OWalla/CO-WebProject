var map;
var markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat:32.073022, lng: 34.782403},
        zoom: 12
    });

    var scope = $('[ng-controller="StoreController"]').scope();

    scope.stores.forEach(function (store) {

        setMarker(new google.maps.LatLng(store.coordinates[0], store.coordinates[1]), store.name);
    });


}
function setMarker(position, title) {
    var marker;
    var markerOptions = {
        position: position,
        map: map,
        title: title,
        icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    };

    marker = new google.maps.Marker(markerOptions);

    markers.push(marker);

}

function resetMarkes(data){
    if (typeof google === "undefined")
        return;

    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];

    data.forEach(function (store) {

        setMarker(new google.maps.LatLng(store.coordinates[0], store.coordinates[1]), store.name);
    });
};