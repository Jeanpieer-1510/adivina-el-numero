//Definiendo las variables
let numeroSecreto=0;
let intentos=0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

condicionesIniciales();
//Creación de las funciones
/*
El querySelector es un metodo que selecciona el elemento del html, si solo hay uno de estos
no habrá problema, pero si hay más de uno, seleccionará el primero que encuentre.
*/
function asignaTextoElemento(elemento,texto){
    let elementoHTML=document.querySelector(elemento);
    elementoHTML.innerHTML=texto;
}
/*
en cambio el getElementById selecciona el elemento por su id, que seria un get (enviar por medio de...)
y asi como este hay mas metodos similares para seleccionar los elementos de html siempre que en el html
en el elemento se haya agregado el atributo correspondiente.

getElementById al igual que querySelector selecciona el elemento, y para obtener solo el valor dentro del 
objeto al final de soloca ".value"
*/
//Funcion principal y la responsable de la logica del juego para comparar el número secreto.
function verificarIntento() {
    let numeroDeUsuario=parseInt(document.getElementById('valorUsuario').value);
    if (numeroDeUsuario===numeroSecreto){
        asignaTextoElemento('p',`¡Felicidades! Has adivinado el número secreto en ${intentos} ${intentos===1?'vez':'veces'}`); //${intentos>1?'veces':'vez'}
        visibilidadBotonFinJUego();
    } else {
        //Pasa a esta parte cuando el usuario no acerto. 
        if (numeroDeUsuario>numeroSecreto){
            asignaTextoElemento('p','El número secreto es menor');
        }else{
            asignaTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
}

//Funciones secundarias
function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;

    if (listaNumerosSorteados.length === numeroMaximo){
        asignaTextoElemento('p','Ya se sortearon todos los números posibles')
    }else{
        console.log(listaNumerosSorteados);
    //Si el numero generado esta incluido en la lista, vuelve a intentar generar otro número con la misma funcion
    //usando la recursividad.
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
    //y cuando el numero no esta incluido en la lista, usando el metodo "push" se agrega el numero al arreglo
    //y se retorna el numero generado.
        }else{
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }

}

/*
Puedo usar el metodo querySelector para llamar un elemento tambien usando el id, pero para eso se debe 
colocar el # antes del nombre del id, para asi decirle a la funcion: quiero seleccionar el elemento
con el id llamado valorUsuario. Pero es preferible seguir usando el getElementById.
*/
function limpiarCaja(){
    return document.querySelector('#valorUsuario').value='';
}

function visibilidadBotonFinJUego(){
    document.getElementById('reiniciar').removeAttribute('disabled');
    document.getElementById('compararNumero').setAttribute('disabled','true');
}

function visibilidadBotonInicioJuego(){
    document.getElementById('reiniciar').setAttribute('disabled','true');
    document.getElementById('compararNumero').removeAttribute('disabled');
}

function condicionesIniciales(){
    //Asignar texto a los diferentes elementos de HTML
    asignaTextoElemento('h1','Juego del número secreto');
    asignaTextoElemento('p',`Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto=generarNumeroSecreto();
    intentos=1;
    console.log(numeroSecreto);
}

function reiniciarJuego(){
    //Limpiar valor de caja
    limpiarCaja();
    //Establecer las condiciones iniciales
    condicionesIniciales();
    //Deshabiltar el boton de nuevo juego
    visibilidadBotonInicioJuego();
}