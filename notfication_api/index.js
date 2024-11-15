const statusInfo = document.getElementById("location-access-status");


const notificationPermission = Notification.permission;
if (notificationPermission === "granted") {
  new Notification("Hi there!");
} else {
  Notification.requestPermission()
    .then((permission) => {
      console.log(permission);
      new Notification("Hi there!");
    })
    .catch((error) => {
      console.log(error);
    });
}

function checkPermissionStatus() {
  navigator.permissions
    .query({ name: "notifications" })
    .then((permissionStatus) => {
      updateStatusInfo(permissionStatus.state);
      permissionStatus.onchange = () => {
        checkPermissionStatus();
      };
    })
    .catch((error) => {
      console.error(error.message);
    });
}

function updateStatusInfo(state) {
  if (state === "granted") {
    statusInfo.innerText = "Notification access is currently granted.";
  } else if (state === "prompt") {
    statusInfo.innerText = "Notification access has not been granted yet.";
  } else if (state === "denied") {
    statusInfo.innerText = "Notification access is currently denied.";
  }
}

checkPermissionStatus();
