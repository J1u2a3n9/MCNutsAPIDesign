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
let resultados='';
var peanutIdOficial=0;

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
const image = document.getElementById("image");

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
                    <button type="button" class="btn btn-primary bg-info text-center" onclick="obtenerIdPeanut(${peanut.id})"> ${peanut.name} </button>    
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

const on = (element, event, selector, handler) => {
    element.addEventListener(event,e=>{
        /*target sirve para implementar una delegacion del evento, devuelve el evento o uno mas cercano
         o nulo*/
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}

btnCrear.addEventListener('click',()=>{
    /*Limpio los atributos del formulario para que no se muestre el anterior*/
     nombre.value='';
    apellido.value="";
    celular.value='';
    lugarCompra.value="";
    fechaCompra.value="";
    cantidadCompra.value='';
    /*Metodo de bootstrap para mostrar algo capturado*/
    modalCliente.show()
    /*Ponemos un control para que se sepa si esta guardando una creacion*/
    opcion = 'crear'
})

function obtenerIdPeanut(peanutId)
{
    debugger;
    peanutIdOficial=peanutId;
}

formCliente.addEventListener('submit',(e)=>{
    debugger;
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
    
    if(opcion=='crear')
    {
        fetch(url1, {
            method: 'POST',
            body: formData
        }).then(response => {
            if(response.status === 201){
                alert('client was created');
                fetchTeams();
            } else {
                response.text()
                .then((error)=>{
                    alert(error);
                });
            }
        });
    }
    modalCliente.hide()



})
fetchPeanuts();