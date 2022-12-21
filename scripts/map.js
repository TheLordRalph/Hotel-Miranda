const ubications = [
    {
      "lat": 40.59083375388299,
      "lng": -4.146992963167832
    },
    {
      "lat": 40.60724803920952, 
      "lng": -5.125777893955357
    },
    {
      "lat": 39.783466859865385,
      "lng": -5.4816445287930895
    },
    {
      "lat": 36.61279629316437,
      "lng": -4.502138964512427
    },
    {
      "lat": 43.345604607325264,
      "lng": -5.130062173107846
    }
];

let comunidadAutonomaPolygon;
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.4166, lng: -3.7040 },
    zoom: 5,
  });
  infoWindow = new google.maps.InfoWindow();

  const locationButton = document.createElement("button");

  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const actualPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(actualPos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(actualPos);
          distance(actualPos);
        },
        () => {
          handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
  
  // Construct the polygon.
  comunidadAutonomaPolygon = new google.maps.Polygon({
    paths: null,
  });

  // Markers
  let marker;
  ubications.map(ubication => (
    marker = new google.maps.Marker({
      position: ubication,
      map: map,
    })
  ))
}



function callback(response, status) {
  console.log(response);
  console.log(status);
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}



window.initMap = initMap;



// var origin1 = new google.maps.LatLng(55.930385, -3.118425);
// var origin2 = 'Greenwich, England';
// var destinationA = 'Stockholm, Sweden';
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

// var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix(
//   {
//     origins: [origin1, origin2],
//     destinations: [destinationA, destinationB],
//     travelMode: 'DRIVING',
//     transitOptions: TransitOptions,
//     drivingOptions: DrivingOptions,
//     unitSystem: UnitSystem,
//     avoidHighways: Boolean,
//     avoidTolls: Boolean,
//   }, callback);

// function callback(response, status) {
//   // See Parsing the Results for
//   // the basics of a callback function.
// }


function distance(actualPos) {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
  {
    origins: [actualPos],
    destinations: ubications,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  }, callback);
}


function comunidadAutonoma(e) {
  let value = parseInt(e.value);
  let comunidadesCoords = [];
  espanaComunidades[value].map(comunidad => (
    comunidad.map(cord => {
      comunidadesCoords.push(cord);
    })
  ))

  comunidadAutonomaPolygon.setMap(null);
  comunidadAutonomaPolygon = new google.maps.Polygon({
    paths: comunidadesCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  comunidadAutonomaPolygon.setMap(map);
}
