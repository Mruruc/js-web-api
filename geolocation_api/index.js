const locationDiv = document.getElementById("location");

locationDiv.textContent = "Fetching your location...";

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

if ("geolocation" in navigator) {
  // Request the user's location
  navigator.geolocation.getCurrentPosition(success, error, options);
} else divElement = "Geolocation is not supported by your browser.";


console.log(navigator.permissions.query(5));
