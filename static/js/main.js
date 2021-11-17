let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let inputField = document.getElementById('inputField');

var data = [{
        'taskname': 'example 1',
        'complete': false,
        'date': Date.now()
    },
    {
        'taskname': 'example 2',
        'complete': false,
        'date': Date.now()
    }]
/**
 * Funciones de la todolist
 */

//// Verificacion ////
if (obtener('todolist') !== null){

    cargar_contenido(obtener('todolist'))

}else{

    agregar_actualizar('todolist', data)
    cargar_contenido(obtener('todolist'))

}
//// Service Worker ////
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register("/static/js/sw.js")
      .then(reg => console.log('Registro de SW exitoso', reg))
      .catch(err => console.warn('Error al tratar de registrar el sw', err))
  }
  
//// Funciones ////
function cargar_contenido(list){

    for (let step = 0; step < list.length; step++) {

        agregar_boton(step, list[step],false)

    }

}

function agregar_boton(step, object, save){

    if (save == true){

        var list = obtener('todolist')
        list.push(object)
        agregar_actualizar('todolist', list)

    }

    var paragraph = document.createElement('p');
    paragraph.classList.add('paragraph-styling');
    paragraph.innerText = object['taskname']

    toDoContainer.appendChild(paragraph);

    paragraph.addEventListener('click', function(){
        
        var list = obtener('todolist')

        if (list[list.length-1]['complete'] == true){

            list[list.length-1]['complete'] = false
            paragraph.style.textDecoration = null;

        }else{

            list[list.length-1]['complete'] = true
            paragraph.style.textDecoration = "line-through";

        }
        
        agregar_actualizar('todolist', list)

    })
    
    paragraph.addEventListener('dblclick', function(){

        var list = obtener('todolist')
        list.splice(step, 1)
        agregar_actualizar('todolist', list)

        toDoContainer.removeChild(paragraph);

    })

}

//// Llamadas ////
addToDoButton.addEventListener('click', function(){
    
    if (inputField.value !== ""){

        var object = {
            'taskname': inputField.value,
            'complete': false,
            'date': Date.now()
        }
    
        agregar_boton(null, object, true)
    
        inputField.value = ""
        
    }
    
})

