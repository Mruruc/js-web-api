const locationDiv = document.getElementById("location");

// Success callback function
function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const accuracy = position.coords.accuracy;

  locationDiv.innerHTML = `
      <p><strong>Latitude:</strong> ${latitude}</p>
      <p><strong>Longitude:</strong> ${longitude}</p>
      <p><strong>Accuracy:</strong> ${accuracy} meters</p>
    `;
}

// Error callback function
function error(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      locationDiv.textContent = "User denied the request for Geolocation.";
      break;
    case error.POSITION_UNAVAILABLE:
      locationDiv.textContent = "Location information is unavailable.";
      break;
    case error.TIMEOUT:
      locationDiv.textContent = "The request to get user location timed out.";
      break;
    case error.UNKNOWN_ERROR:
    default:
      locationDiv.textContent = "An unknown error occurred.";
      break;
  }
}

const options = {
  enableHighAccuracy: true, // Request high accuracy (GPS)
  timeout: 5000, // Wait up to 5 seconds
  maximumAge: 0, // Do not use cached location
};

const enableButton = document.getElementById("enable-btn");

enableButton.onclick = () => {
  if ("geolocation" in navigator)
    navigator.geolocation.getCurrentPosition(success, error, options);
  else alert("Geolocation is not supported by your browser.");
};

const statusInfo = document.getElementById("location-access-status");

// Function to check permission status
function checkPermissionStatus() {
  navigator.permissions
    .query({ name: "geolocation" })
    .then((result) => {
      if (result.state === "granted") {
        statusInfo.textContent = "Location access is currently granted.";
      } else if (result.state === "prompt") {
        statusInfo.textContent = "Location access has not been granted yet.";
      } else if (result.state === "denied") {
        statusInfo.textContent = "Location access is currently denied.";
      }
      // Listen for changes in permission status
      result.onchange = function () {
        checkPermissionStatus();
      };
    })
    .catch((error) => {
      console.error(error.message);
    });
}

// Check permission status on page load
checkPermissionStatus();
