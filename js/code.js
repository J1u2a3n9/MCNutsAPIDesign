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
const url = 'http://localhost:3030/api/peanuts/'
/*Captura el elemento html Donde se mostrara los datos*/
const contenedor = document.querySelector('tbody')
let resultados='';

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

/*Asigno evento para mostrar formulario cuando se hace click en crear*/
//btnCrear.addEventListener('click',()=>{
    /*Limpio los atributos del formulario para que no se muestre el anterior*/
  //  name.value='';
   // unitCost.value='';
    //wholesalePrice.value='';
    //amount.value='';
    /*Metodo de bootstrap para mostrar algo capturado*/
    //modalMani.show()
    /*Ponemos un control para que se sepa si esta guardando una creacion*/
    //opcion = 'crear'
//})

//Funcion que muestra datos
const mostrar = (manis) => {
    debugger;
    manis.forEach(mani=>{
        resultados += `
                            <tr >
                                <td class="text-center">${mani.id}</td>
                                <td class="text-center">${mani.name}</td>
                                <td class="text-center">${mani.elaborationDate}</td>
                                <td class="text-center">${mani.expirationDate}</td>
                                <td class="text-center">${mani.unitCost}</td>
                                <td class="text-center">${mani.wholesalePrice}</td>
                                <td class="text-center">${mani.amount}</td>
                                <td class="text-center" >${mani.productionStatus}</td>
                                <td > <a class="btnEditar btn btn-success align-items-center">Editar</a>  <a class="btnBorrar btn btn-danger">Borrar</a> </td>  
                                <td style="display:none;" type="file" name="image" id="image">${mani.imagePath}</td>
                            </tr>
        `
    })
    /*Los resultados se envian al contenedor */
    contenedor.innerHTML =resultados;
}

//Mostrar datos
fetch(url)
    .then(response => response.json())
    .then(data => mostrar(data))
    .catch(error => console.log(error))


//Funcion Borrar 
/*Emula la funcion de los botones con jquery simplificar la manera de interactuar 
con los documentos HTML, manipular el árbol DOM, manejar eventos, desarrollar animaciones
y agregar interacción con la técnica AJAX a páginas web.​*/



/*on es un metodo de jquery que permite asignar eventos a los elementos de un dom*/
/*element agarra todo el documento*/
/*evento es un click o mouseover*/
/*Selector captura la clase*/
/*handler es una funcion que ejecuta en caso de un evento un codigo js*/
const on = (element, event, selector, handler) => {
    element.addEventListener(event,e=>{
        /*target sirve para implementar una delegacion del evento, devuelve el evento o uno mas cercano
         o nulo*/
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}



//Borrar
on(document,'click','.btnBorrar',e=>{
    /*Captura la fila entera*/
    const fila=e.target.parentNode.parentNode
    debugger;
    /*Captura el id de la fila*/
    const id=fila.firstElementChild.innerHTML
    /*Codigo de alertify*/
    alertify.confirm("Mensaje de Confirmacion","Esta seguro que desea borrar el elemento?",
    function(){
        fetch(url+id,{
            method:'DELETE'
        })
        .then(  res => res.json() )
        /*Recarga la pagina despues de elmininar algo*/
        .then(  ()=> location.reload())
    },
    function(){
        alertify.error('CANCELADO');
    })
})

//Procedimiento Editar

/*Captura el id del formulario para que luego avance en la fila*/
let idForm= 0
on(document,'click','.btnEditar',e=>{
    debugger;
    const fila=e.target.parentNode.parentNode
    /*Capturamos los datos de las filas*/
    idForm = fila.children[0].innerHTML
    const nameForm = fila.children[1].innerHTML
    const elaborationDateForm = fila.children[2].innerHTML
    const expirationDateForm = fila.children[3].innerHTML
    const unitCostForm = fila.children[4].innerHTML
    const wholesalePriceForm = fila.children[5].innerHTML
    const amountForm = fila.children[6].innerHTML
    const productionStatusForm = fila.children[7].innerHTML
    const imageForm = fila.children[9].innerHTML
    /*Asignamos a nuestros atributos del formulario, los valores capturados*/
    name.value = nameForm;
    elaborationDate.value = elaborationDateForm
    expirationDate.value = expirationDateForm
    unitCost.value = unitCostForm
    wholesalePrice.value = wholesalePriceForm
    amount.value = amountForm
    productionStatus.value = productionStatusForm
    image.files.value=imageForm
     /*Ponemos un control para que se sepa si esta guardando el editado*/
    opcion = 'editar'
    /*Metodo de bootstrap para mostrar algo capturado*/
    modalMani.show();
    
})




//Procedimiento para Crear y Editar
formMani.addEventListener('submit',(e)=>{
    debugger;
    /*prevent default para que no recargue la pagina*/
    e.preventDefault()
    /*Defino si sigue en produccion o no*/
    let url1=`${url}form`

    /*Creo los datos para asignarlos*/
    var data ={
        Name:e.currentTarget.name.value,
        ElaborationDate:e.currentTarget.elaborationDate.value,
        ExpirationDate:e.currentTarget.expirationDate.value,
        UnitCost:parseFloat(e.currentTarget.unitCost.value),
        WholesalePrice:parseFloat(e.currentTarget.wholesalePrice.value),
        Amount:parseFloat(e.currentTarget.amount.value),
        ProductionStatus:true,
        DiscontinuationDate:null,
        ProductionStartDate:e.currentTarget.elaborationDate.value,
        Image:e.currentTarget.image.files[0]
    }
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




    formData

    if(opcion=='crear')
    {
        fetch(url1, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: formData
        }).then(response => response.json() )
        .then(formData => {
            const nuevoMani = []
            nuevoMani.push(formData)
            mostrar(nuevoMani)
        })

    }
    if(opcion=='editar')
    {
        fetch(url+idForm,{
            method: 'PUT',
            body: formData
        })
        .then(response => {
            if(response.status === 200){
                alert('peanut was updated');
                fetchTeams();
            } else {
                response.text()
                .then((error)=>{
                    alert(error);
                });
            }
        })
        .then (response => location.reload())

    }
    modalMani.hide()
})



