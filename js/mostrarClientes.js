if(!Boolean(sessionStorage.getItem("jwt"))){
    alert("Por favor Inicie Sesion")
    window.location.href = "index.html";
    
}


//Variables
const baseUrl='http://localhost:3030/api';
/*Captura el elemento html Donde se mostrara los datos*/
const contenedor2 = document.getElementById('peanuts-container')
let resultados='';
var peanutIdOficial=0;



let opcion = '' //Si se guarda o cancela

//Funcion que muestra datos


function fetchPeanuts()
{
    debugger;
    const url = `${baseUrl}/peanuts`;
    let status;
    fetch(url)
    .then((response)=>{
       status=response.status;
       return response.json();
    })
    .then((data)=>{
        if (status === 200)
        {
            console.log(data)
            let peanutsLi = data.map(peanut=> {
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
    obtenerIdPeanut(id);
    const url = `${baseUrl}/peanuts/${id}/clients`;
    const url1 ='http://localhost:3030';
    debugger;
    let status;
    fetch(url)
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
                var imageUrl = cliente.imagePath? `${url1}/${cliente.imagePath}` : "";
                var imageUrl2=imageUrl.replace('\\','/')
                var imageUrl3=imageUrl2.replace('\\','/')
                if(imageUrl3!="")
                {
                    return `
                    <div class="card">
                        <div class="card-encabezado">
                            <img src=${imageUrl3} alt="">
                        </div>
                        <div class="card-contenido">
                            <div class="info-personal">Ci : ${cliente.ci}</div>
                            <div class="info-personal">Nombre: ${cliente.nombre}</div>
                            <div class="info-personal">Apellido: ${cliente.apellido}</div>
                            <div class="info-personal">Celular: ${cliente.celular}</div>                   
                        </div>
                        
                    </div>
                 `
                }
                else
                {
                    return `
                                    <div class="card">
                                        <div class="card-encabezado">
                                            <img src="/img/usuarioDefault.jpg" alt="">
                                        </div>
                                        <div class="card-contenido">
                                            <div class="info-personal">Ci : ${cliente.ci}</div>
                                            <div class="info-personal">Nombre: ${cliente.nombre}</div>
                                            <div class="info-personal">Apellido: ${cliente.apellido}</div>
                                            <div class="info-personal">Celular: ${cliente.celular}</div>                   
                                        </div>
                                
                                    </div>
                                 `

                }
            })
            //peanuts.add(data.map(peanut=> {return ` "id":${peanut.id},"nombre":${peanut.name}`}))
            var clientContent = `${clientsLi.join('')} `;
            document.getElementById('contenedor').innerHTML=clientContent;
        }else{
            alert(data);
        }
        console.log(data)
    });

}




function obtenerIdPeanut(peanutId)
{
    debugger;
    peanutIdOficial=peanutId;
}






fetchPeanuts();