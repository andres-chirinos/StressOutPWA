/**
 * Funciones de la todolist
 */

//// Variables ////
let addToDoButton = document.getElementById('addToDo');
let toDoContainer = document.getElementById('toDoContainer');
let NameInput = document.getElementById('NameInput');
let VersionLabel = document.getElementById('VersionLabel');
let ResetButton = document.getElementById('ResetButton')

VersionLabel.innerText = "v0.1.3"

var data = [{
        'taskname': 'Bienvenido a la ToDoList de StressOut',
        'complete': false,
        'date': GetTime()
    },
    {
        'taskname': 'Tarea Completada',
        'complete': true,
        'date': GetTime()
    }]

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

    if (object['complete'] == true){
        paragraph.style.textDecoration = "line-through";
    }else{
        paragraph.style.textDecoration = null;
    }
    
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

function Comprobar(){
    var list = obtener('todolist')
    var time = GetTime()

    for (let step = 0; step < list.length; step++) {

        if (list[step]['date']['mes'] === time['mes'] && 
        list[step]['date']['dia'] === time['dia'] && 
        list[step]['date']['año'] === time['año'] && 
        list[step]['date']['hora'] === time['hora'] &&
        list[step]['date']['minuto'] === time['minuto'] &&
        list[step]['date']['second'] === time['second'] &&
        list[step]['complete'] === false) {
            notifyMe(title = `${list[step]['taskname']} in time!`, options = {body: 'Task is in time!', icon: '/static/img/icon_144.png'})
        }

    }
}

//// Llamadas ////
addToDoButton.addEventListener('click', function(){
    
    if (NameInput.value !== ""){

        var object = {
            'taskname': NameInput.value,
            'complete': false,
            'date': GetTime(time = TimeInput.value)
        }
    
        agregar_boton(null, object, true)
    
        NameInput.value = ''
        TimeInput.value = ''
        
    }
    
})

ResetButton.addEventListener('click', function() {

    eliminar('todolist')
    location.reload(true)

})

/**
 * Funciones del reloj
 */

//// Variables ////
const $tiempo = document.getElementById('Tiempo')
$fecha = document.getElementById('Fecha');

let semana = ['SUN','MON','TUE','WED','THU','FRI','SAT'];

//// Funciones ////
function GetTime(time = null){
    if (time === null) {
        let f = new Date(),
        año = f.getFullYear(),
        dia = f.getDate(),
        mes = f.getMonth()+1,

        hora = f.getHours(),
        minuto = f.getMinutes(),
        second = f.getSeconds();

        return {mes, dia, año, hora, minuto, second}//Mes/Dia/Año/Hora/Minuto/Segundo
    } else {
        let f = new Date(time),
        año = f.getFullYear(),
        dia = f.getDate(),
        mes = f.getMonth()+1,

        hora = f.getHours(),
        minuto = f.getMinutes(),
        second = f.getSeconds();

        return {mes, dia, año, hora, minuto, second}//Mes/Dia/Año/Hora/Minuto/Segundo
    }
}

function UpdateClock(){

    timelist = GetTime()
    let f = new Date();
    let showSemana = (semana[f.getDay()]);
    $tiempo.innerHTML = `${timelist['año']}-${timelist['mes']}-${timelist['dia']} ${showSemana}, ${timelist['hora']}:${timelist['minuto']}:${timelist['second']}`;

}
 
//// Llamadas ////
setInterval(() => {
    Comprobar()
    UpdateClock()

}, 1000);
