//Comprueba que el navegador puede guardar en storage
if (typeof(Storage) !== 'undefined') {
} else {
  alert('This browser does not support local storage')
}

/**
  Local Storage Funtions
*/

const agregar_actualizar = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data))
  return true
}

const obtener = (key) => {
  return JSON.parse(localStorage.getItem(key))
}

const eliminar = (key) => {
  localStorage.removeItem(key)
  return true
}

/**
 * Notifications Funtions
 */

function notifyMe(title, options) {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  }

  else if (Notification.permission === "granted") {
    var notification = new Notification(title, options);
  }

  else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === "granted") {
        var notification = new Notification(title, options);
      }
    });
  }
}