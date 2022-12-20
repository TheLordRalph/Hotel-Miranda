const ubications = {
  "ubications": [
    {
      "lat": 40.59083375388299,
      "lng": -4.146992963167832
    },
    {
      "lat": 10.59083375388299,
      "lng": -32.146992963167832
    },
    {
      "lat": -2.59083375388299,
      "lng": 10.146992963167832
    },
    {
      "lat": -50.59083375388299,
      "lng": 0.146992963167832
    },
    {
      "lat": 20.59083375388299,
      "lng": 20.146992963167832
    }
  ]
};

let comunidadAutonomaPolygon;
let map, infoWindow;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 25.774, lng: -80.19 },
    zoom: 6,
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
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent("Location found.");
          infoWindow.open(map);
          map.setCenter(pos);
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

  // Poligon
  const poligon = [
    {
        "lng": -4.537353515625,
        "lat": 43.39706523932025
    },
    {
        "lng": -4.625244140625,
        "lat": 43.25320494908846
    },
    {
        "lng": -4.835186004638672,
        "lat": 43.17351094244364
    },
    {
        "lng": -4.76806640625,
        "lat": 43.06086137134326
    },
    {
        "lng": -4.626102447509766,
        "lat": 43.037277735611376
    },
    {
        "lng": -4.427490234375,
        "lat": 43.06161389125079
    },
    {
        "lng": -4.295654296875,
        "lat": 42.97338078923806
    },
    {
        "lng": -4.219264984130859,
        "lat": 42.852183637398895
    },
    {
        "lng": -3.9440917968749996,
        "lat": 42.74701217318067
    },
    {
        "lng": -3.801784515380859,
        "lat": 42.811773603829344
    },
    {
        "lng": -3.9660644531249996,
        "lat": 42.91620643817353
    },
    {
        "lng": -3.955249786376953,
        "lat": 43.01343399741946
    },
    {
        "lng": -3.7138938903808594,
        "lat": 43.13331170781402
    },
    {
        "lng": -3.570556640625,
        "lat": 43.14909399920127
    },
    {
        "lng": -3.4160614013671875,
        "lat": 43.13306116240612
    },
    {
        "lng": -3.409881591796875,
        "lat": 43.248203680382346
    },
    {
        "lng": -3.262939453125,
        "lat": 43.297198404646366
    },
    {
        "lng": -3.173675537109375,
        "lat": 43.30119623257966
    },
    {
        "lng": -3.1482696533203125,
        "lat": 43.35114690203119
    },
    {
        "lng": -3.27392578125,
        "lat": 43.41302868475145
    },
    {
        "lng": -3.44970703125,
        "lat": 43.48481212891603
    },
    {
        "lng": -3.5815429687499996,
        "lat": 43.50872101129684
    },
    {
        "lng": -4.053955078125,
        "lat": 43.44494295526125
    },
    {
        "lng": -4.32861328125,
        "lat": 43.389081939117496
    },
    {
        "lng": -4.537353515625,
        "lat": 43.39706523932025
    }
  ];
  // Construct the polygon.
  comunidadAutonomaPolygon = new google.maps.Polygon({
    paths: poligon,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  bermudaTriangle.setMap(map);
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



function comunidadAutonoma(e) {
  let value = parseInt(e.value);
  let triangleCoords = [];
  espanaComunidades[value].map(comunidad => (
    comunidad.map(cord => {
      triangleCoords.push(cord);
    })
  ))

  comunidadAutonomaPolygon.setMap(null);
  comunidadAutonomaPolygon = new google.maps.Polygon({
    paths: triangleCoords,
    strokeColor: "#FF0000",
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: "#FF0000",
    fillOpacity: 0.35,
  });

  comunidadAutonomaPolygon.setMap(map);
}
