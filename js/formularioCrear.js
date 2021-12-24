

if(!Boolean(sessionStorage.getItem("jwt"))){
    alert("Por favor Inicie Sesion")
    window.location.href = "index.html";
}

const imagenes = document.querySelectorAll('.img-galeria')
const imagenLight = document.querySelector('.agregar-imagen');
const contenedorLight = document.querySelector('.imagen-light')
const closeLight = document.querySelector('.close')


imagenes.forEach(imagen => {
    imagen.addEventListener('click',()=>{
        aparecerImagen(imagen.getAttribute('src'));
    })
});

contenedorLight.addEventListener('click',(e)=>{
    if(e.target !== imagenLight){
        contenedorLight.classList.toggle('show')
        imagenLight.classList.toggle('showImage')
        hamburguer.style.opacity = '1';
    }
})


const aparecerImagen = (imagen)=>{
    imagenLight.src = imagen;
    contenedorLight.classList.toggle('show')
    imagenLight.classList.toggle('showImage')
    hamburguer.style.opacity = '0';
}

//Variables
const url='http://localhost:3030/api/peanuts';
let resultados='';
var peanutIdOficial=0;

/*Captura el formulario donde se llenaran los datos del mani*/
const modalMani = new bootstrap.Modal(document.getElementById('modalMani'));
/*Captura el form */
const formMani = document.querySelector('form');
/*Captura los Atributos */ 
const nombre =document.getElementById("nombre");
const cantidad =document.getElementById("cantidad");
const name = document.getElementById("name");
const elaborationDate = document.getElementById("elaborationDate");
const expirationDate = document.getElementById("expirationDate");
const unitCost = document.getElementById("unitCost");
const wholesalePrice = document.getElementById("wholesalePrice");
const amount = document.getElementById("amount");
const productionStatus = document.getElementById("productionStatus");
const image =document.getElementById("image");


let opcion = '' //Si se guarda o cancela

modalMani.show()

btnCrear.addEventListener('click',()=>{
    /*Limpio los atributos del formulario para que no se muestre el anterior*/
    name.value='';
    unitCost.value='';
    wholesalePrice.value='';
    amount.value='';
    /*Metodo de bootstrap para mostrar algo capturado*/
    modalMani.show()
    /*Ponemos un control para que se sepa si esta guardando una creacion*/
    opcion = 'crear'
})

//Mostrar datos
fetch(url)
    .then(response => response.json())
    .catch(error => console.log(error))



const on = (element, event, selector, handler) => {
    element.addEventListener(event,e=>{
        /*target sirve para implementar una delegacion del evento, devuelve el evento o uno mas cercano
         o nulo*/
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}




formMani.addEventListener('submit',(e)=>{
    debugger;
    /*prevent default para que no recargue la pagina*/
    e.preventDefault()
    /*Defino si sigue en produccion o no*/
    let url1=`${url}/form`


    /*Creo los datos para asignarlos*/
    const formData = new FormData();
    formData.append('Name',e.currentTarget.name.value);
    formData.append('ElaborationDate',e.currentTarget.elaborationDate.value);
    formData.append('ExpirationDate',e.currentTarget.expirationDate.value);
    formData.append('UnitCost',parseFloat(e.currentTarget.unitCost.value));
    formData.append('WholesalePrice',parseFloat(e.currentTarget.wholesalePrice.value));
    formData.append('Amount',parseFloat(e.currentTarget.amount.value));
    formData.append('ProductionStatus',true);
    formData.append('DiscontinuationDate',e.currentTarget.elaborationDate.value);
    formData.append('ProductionStartDate',e.currentTarget.elaborationDate.value);
    formData.append('Image',e.currentTarget.image.files[0]);
    

    debugger;
    console.log(formData.toString)

    
    fetch(url1, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(response.status === 201){
            alert('peanut was created');
            fetchTeams();
        } else {
            response.text()
            .then((error)=>{
                alert(error);
            });
        }
    })
    .then(formData => {
        const nuevoMani = []
        nuevoMani.push(formData)
    })
    modalMani.hide()
})

modalMani.show()