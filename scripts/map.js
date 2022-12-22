const ubications = [
    {
      lat: 40.59083375388299,
      lng: -4.146992963167832
    },
    {
      lat: 40.60724803920952, 
      lng: -5.125777893955357
    },
    {
      lat: 39.783466859865385,
      lng: -5.4816445287930895
    },
    {
      lat: 36.61279629316437,
      lng: -4.502138964512427
    },
    {
      lat: 43.345604607325264,
      lng: -5.130062173107846
    }
];

let comunidadAutonomaPolygon;
let map, infoWindow;
let actualPos;
let marker = [];
let activeMarks = [];

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
          actualPos = {
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
  ubications.map(ubication => (
    marker.push(new google.maps.Marker({
      position: ubication,
      map: map,
    })),
    activeMarks.push(ubication)
  ))
  console.log(activeMarks);
}

function callback(response, status) {
  console.log(response);
  cardsDistances(response);
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

function distance(actualPos) {
  var service = new google.maps.DistanceMatrixService();
  service.getDistanceMatrix(
  {
    origins: [actualPos],
    destinations: activeMarks,
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


  activeMarks = [];
  if (value !== 18) {
    marker.map(mark => (
      mark.setMap(null)
    ))
    for (var i = 0; i < marker.length; i++) {
      if (google.maps.geometry.poly.containsLocation(marker[i].getPosition(), comunidadAutonomaPolygon)) {
        marker[i].setMap(map);
        activeMarks.push({ lat: marker[i].position.lat(), lng: marker[i].position.lng() })
      }
    }
  } else {
    marker.map(mark => (
      mark.setMap(map),
      activeMarks.push({ lat: mark.position.lat(), lng: mark.position.lng() })
    ))
  }
  distance(actualPos);

  
  comunidadAutonomaPolygon.setMap(map);
}

function cardsDistances(response) {
  
  const distanceContainer = document.getElementById("map_distances");
  distanceContainer.innerHTML = '';
  let divCardDistance;
  let fromDistance;
  let toDistance;
  let timeDistance;

  let result = response.rows[0].elements;
  for (let i = 0; i < result.length; i++) {

    divCardDistance = document.createElement("div");
    divCardDistance.classList.add("map__distance");

    fromDistance = document.createElement("h4");
    toDistance = document.createElement("h4");
    timeDistance = document.createElement("h3");

    divCardDistance.appendChild(fromDistance);
    divCardDistance.appendChild(toDistance);
    divCardDistance.appendChild(timeDistance);
    distanceContainer.appendChild(divCardDistance);

    fromDistance.innerHTML = "From: " + response.originAddresses[0];
    toDistance.innerHTML = "To: " + response.destinationAddresses[i];
    timeDistance.innerHTML = result[i].duration.text + " (" + result[i].distance.text + ")";
  }
}


window.initMap = initMap;