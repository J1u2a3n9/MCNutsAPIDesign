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
const baseUrl='http://localhost:3030/api';
/*Captura el elemento html Donde se mostrara los datos*/
const contenedor = document.querySelector('tbody')
const contenedor2 = document.getElementById('peanuts-container')
let resultados='';
const peanuts=[]; 
var peanutIdOficial=0;
var peanutIdOficialII=0;
var peanutRespaldo=0;
var cont=0;

/*Captura el formulario donde se llenaran los datos del Cliente*/
const modalCliente = new bootstrap.Modal(document.getElementById('modalCliente'));
/*Captura el form */
const formCliente = document.querySelector('form');
/*Captura los Atributos */ 
const ci =document.getElementById("ci");
const nombre =document.getElementById("nombre");
const apellido =document.getElementById("apellido");
const celular = document.getElementById("celular");
const lugarCompra = document.getElementById("lugarCompra");
const fechaCompra = document.getElementById("fechaCompra");
const cantidadCompra = document.getElementById("cantidadCompra");
const image =document.getElementById("image");
var arrayI =[];


let opcion = '' //Si se guarda o cancela

//Funcion que muestra datos


function fetchPeanuts()
{
    debugger;
    if(!Boolean(sessionStorage.getItem("jwt"))){
        window.location.href = "index.html";
    }
    const url = `${baseUrl}/peanuts`;
    let status;
    fetch(url,{
        headers: { 
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`  
        },
        method: 'GET'
    })
    .then((response)=>{
       status=response.status;
       return response.json();
    })
    .then((data)=>{
        if (status === 200)
        {
            console.log(data)
            let peanutsLi = data.map(peanut=> {
                arrayI.push(peanut);
                return `
                    <button onclick="mostrarClientes(${peanut.id})" type="button" class="btn btn-primary bg-info text-center" > ${peanut.name} </button>    
                `
            })
            //peanuts.add(data.map(peanut=> {return ` "id":${peanut.id},"nombre":${peanut.name}`}))
            var peanutContent = `<ul>${peanutsLi.join('')} </ul>`;
            document.getElementById('header').innerHTML=peanutContent;
        }else{
            alert(data);
        }
        console.log(data)
        console.log('Hola')
        console.log(arrayI);
    });
}





/*Asigno evento para mostrar formulario cuando se hace click en crear*/
//btnCrear.addEventListener('click',()=>{
    /*Limpio los atributos del formulario para que no se muestre el anterior*/
  //  nombre.value='';
    //apellido.value="";
    //celular.value='';
    //lugarCompra.value="";
    //fechaCompra.value="";
    //cantidadCompra.value='';
    /*Metodo de bootstrap para mostrar algo capturado*/
    //modalCliente.show()
    /*Ponemos un control para que se sepa si esta guardando una creacion*/
    //opcion = 'crear'
//})



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

//Mostrar Clientes

function mostrarClientes(id)
{
    if(!Boolean(sessionStorage.getItem("jwt"))){
        window.location.href = "index.html";
    }
    peanutRespaldo=id;
    obtenerIdPeanut(id);
    const url = `${baseUrl}/peanuts/${id}/clients`;
    debugger;
    let status;
    fetch(url,{
        headers: { 
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${sessionStorage.getItem("jwt")}`  
        },
        method: 'GET'
    })
    .then((response)=>{
       status=response.status;
       return response.json();
    })
    .then((data)=>{
        if (status === 200)
        {
            console.log(data)
            let clientsLi = data.map(cliente=> {
                debugger;
                let sabores=devolverSabores(id);
                return `
                <tr>
                    <td class="text-center">${cliente.id}</td>
                    <td class="text-center">${cliente.ci}</td>
                    <td class="text-center">${cliente.nombre}</td>
                    <td class="text-center">${cliente.apellido}</td>
                    <td class="text-center">${cliente.celular}</td>
                    <td class="text-center">${cliente.lugarCompra}</td>
                    <td class="text-center">${cliente.fechaCompra}</td>
                    <td class="text-center">${cliente.cantidadCompra}</td>
                    <td > <a onclick="obtenerIdPeanut(${id})" class="btnEditar btn btn-success">Editar</a>  <a onclick="borrarClientes(${id},${cliente.id})" class="btnBorrar btn btn-danger">Borrar</a>  </td>
                    <td style="display:none;" type="file" name="image" id="image">${cliente.imagePath}</td>
                    <td>
                            ${sabores}
                    </td>
                    <td> <a class="btnConfirmar btn btn-success">Mover </a> </td>
                </tr>                        
                `
            })
            //peanuts.add(data.map(peanut=> {return ` "id":${peanut.id},"nombre":${peanut.name}`}))
            var clientContent = `${clientsLi.join('')} `;
            document.getElementById('tbody').innerHTML=clientContent;
            
        }else{
            alert(data);
        }
        console.log(data)
    });
}



let idForm1=0
on(document,'click','.btnConfirmar',e=>{
    debugger;
    const fila=e.target.parentNode.parentNode
    /*Capturamos los datos de las filas*/
    idForm1 =fila.children[0].innerHTML
    ciForm=fila.children[1].innerHTML
    const nombreForm = fila.children[2].innerHTML
    const apellidoForm = fila.children[3].innerHTML
    const celularForm = fila.children[4].innerHTML
    const lugarCompraForm = fila.children[5].innerHTML
    const fechaCompraForm = fila.children[6].innerHTML
    const cantidadCompraForm = fila.children[7].innerHTML
    const imageForm = fila.children[9].innerHTML

    var imageUrl = imageForm
    var imageUrl2=imageUrl.replace('\\','/')
    var imageUrl3=imageUrl2.replace('\\','/')

    /*Asignamos a nuestros atributos del formulario, los valores capturados*/
    ci.value=ciForm;
    nombre.value = nombreForm;
    apellido.value = apellidoForm
    celular.value = celularForm
    lugarCompra.value = lugarCompraForm
    fechaCompra.value = fechaCompraForm
    cantidadCompra.value = cantidadCompraForm
    image.files[0]=imageUrl3

    /*Ponemos un control para que se sepa si esta guardando el editado*/
    opcion = 'mover'
    /*Metodo de bootstrap para mostrar algo capturado*/
    const url1 = `${baseUrl}/peanuts/${peanutIdOficial}/clients`;
    e.preventDefault()  
    const formData = new FormData();
    formData.append("Ci",parseFloat(ci.value));
    formData.append("Nombre",nombre.value),
    formData.append("Apellido",apellido.value);
    formData.append("Celular",parseFloat(celular.value));
    formData.append("LugarCompra",lugarCompra.value);
    formData.append("FechaCompra",fechaCompra.value);
    formData.append("PeanutId",parseFloat(peanutIdOficial));
    formData.append("CantidadCompra",parseFloat(cantidadCompra.value));
    formData.append('Image',image.files[0]);
    if(opcion=='mover')
    {
        fetch(url1, {
            method: 'POST',
            body:  formData
        })
        .then(response => {
            if(response.status === 201){
                alert('client was moved');
                fetchTeams();
            } else {
                response.text()
                .then((error)=>{
                    alert(error);
                });
            }
        });

        borrarClientesII(peanutRespaldo,idForm1)
    }

})









formCliente.addEventListener('submit',(e)=>{
    debugger;
    const url = `${baseUrl}/peanuts/${peanutIdOficial}/clients/${idForm}`;
    const url1 = `${baseUrl}/peanuts/${peanutIdOficial}/clients`;
    e.preventDefault()  
    const formData = new FormData();
    formData.append("Ci",parseFloat(e.currentTarget.ci.value));
    formData.append("Nombre",e.currentTarget.nombre.value),
    formData.append("Apellido",e.currentTarget.apellido.value);
    formData.append("Celular",parseFloat(e.currentTarget.celular.value));
    formData.append("LugarCompra",e.currentTarget.lugarCompra.value);
    formData.append("FechaCompra",e.currentTarget.fechaCompra.value);
    formData.append("PeanutId",parseFloat(peanutIdOficial));
    formData.append("CantidadCompra",parseFloat(e.currentTarget.cantidadCompra.value));
    formData.append('Image',e.currentTarget.image.files[0]);
    if(opcion=='editar')
    {
        fetch(url,{
            method: 'PUT',
            body: formData
        })
        .then(response => {
            if(response.status === 200){
                alert('client was updated');
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
    if(opcion=='mover')
    {
        fetch(url1, {
            method: 'POST',
            body:  formData
        })
        .then(response => {
            if(response.status === 201){
                alert('client was moved');
                fetchTeams();
            } else {
                response.text()
                .then((error)=>{
                    alert(error);
                });
            }
        });

        borrarClientesII(peanutRespaldo,idForm1)
    }
    modalCliente.hide()
})












function devolverSabores(id){
    debugger;
    sabores= ``;
    arrayI.forEach(function(sabor,index){
        if(id!=sabor.id)
        {
            sabores= sabores + `
                 <button type="button" class="btn btn-info" onclick=obtenerIdPeanut(${sabor.id}) value="${sabor.id}" > ${sabor.name} </button>    
            `
            console.log(`${index}:${sabor}`);

        }
    });
    sabores=sabores + ` `;
    return sabores;
}


on(document,'click','.btnMover',e=>{
    const url = `${baseUrl}/peanuts`;
    let status;
    fetch(url,{
        headers: { 
            "Content-Type": "application/json; charset=utf-8",
        },
        method: 'GET'
    })
    .then((response)=>{
       status=response.status;
       return response.json();
    })
    .then((data)=>{
        if (status === 200)
        {
            console.log(data)
            let peanutsLi = data.map(peanut=> {
                if(peanut.id!=peanutIdOficial)
                {
                    arrayI.push(peanut);
                    return `
                        <option onclick="obtenerIdPeanutII(${peanut.id},${peanut.name})" value="${peanut.id}" > ${peanut.name} </option>    
                    `
                }
            })
            //peanuts.add(data.map(peanut=> {return ` "id":${peanut.id},"nombre":${peanut.name}`}))
            var peanutContent = `<ul>${peanutsLi.join('')} </ul>`;
            document.getElementById('lista').innerHTML=peanutContent;
        }else{
            alert(data);
        }
        console.log(data)
    });


})

function mostrarSabores(id){
    const url = `${baseUrl}/peanuts`;
    let status;
    fetch(url,{
        headers: { 
            "Content-Type": "application/json; charset=utf-8",
        },
        method: 'GET'
    })
    .then((response)=>{
       status=response.status;
       return response.json();
    })
    .then((data)=>{
        if (status === 200)
        {
            console.log(data)
            let peanutsLi = data.map(peanut=> {
                if(peanut.id!=id)
                {
                    arrayI.push(peanut);
                    return `
                        <option onclick="obtenerIdPeanut(${peanut.id})" value="${peanut.id}" > ${peanut.name} </option>    
                    `
                }
            })
            //peanuts.add(data.map(peanut=> {return ` "id":${peanut.id},"nombre":${peanut.name}`}))
            var peanutContent = `<ul>${peanutsLi.join('')} </ul>`;
            document.getElementById('lista').innerHTML=peanutContent;
        }else{
            alert(data);
        }
        console.log(data)
    });

}

function borrarClientes(id,ci)
{
    debugger;
    const url = `${baseUrl}/peanuts/${id}/clients/${ci}`;
    alertify.confirm("Mensaje de Confirmacion","Esta seguro que desea borrar el elemento?",
    function(){
        fetch(url,{
            method:'DELETE'
        })
        .then(  res => res.json() )
        /*Recarga la pagina despues de elmininar algo*/
        .then(  ()=> location.reload())
    },
    function(){
        alertify.error('CANCELADO');
    })

}

function borrarClientesII(id,ci)
{
    debugger;
    const url = `${baseUrl}/peanuts/${id}/clients/${ci}`
        fetch(url,{
            method:'DELETE'
        })
        .then(  res => res.json() )
        /*Recarga la pagina despues de elmininar algo*/
        .then(  ()=> location.reload())
}

function obtenerIdPeanut(peanutId)
{
    debugger;
    peanutIdOficial=peanutId;
}


let idForm=0
on(document,'click','.btnEditar',e=>{
    debugger;
    const fila=e.target.parentNode.parentNode
    /*Capturamos los datos de las filas*/
    idPeanutForm=peanutIdOficial
    idForm =fila.children[0].innerHTML
    ciForm=fila.children[1].innerHTML
    const nombreForm = fila.children[2].innerHTML
    const apellidoForm = fila.children[3].innerHTML
    const celularForm = fila.children[4].innerHTML
    const lugarCompraForm = fila.children[5].innerHTML
    const fechaCompraForm = fila.children[6].innerHTML
    const cantidadCompraForm = fila.children[7].innerHTML
    const imageForm = fila.children[9].innerHTML

    /*Asignamos a nuestros atributos del formulario, los valores capturados*/
    ci.value=ciForm;
    nombre.value = nombreForm;
    apellido.value = apellidoForm
    celular.value = celularForm
    lugarCompra.value = lugarCompraForm
    fechaCompra.value = fechaCompraForm
    cantidadCompra.value = cantidadCompraForm
    image.files.value=imageForm

    /*Ponemos un control para que se sepa si esta guardando el editado*/
    opcion = 'editar'
    /*Metodo de bootstrap para mostrar algo capturado*/
    modalCliente.show();
})





fetchPeanuts();