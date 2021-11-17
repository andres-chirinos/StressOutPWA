//Comprueba que el navegadro puede guardar en storage
if (typeof(Storage) !== 'undefined') {
} else {
  console.log('tu navegador es incompatible');
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
