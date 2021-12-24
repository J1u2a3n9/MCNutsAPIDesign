if(!Boolean(sessionStorage.getItem("jwt"))){
    alert("Por favor Inicie Sesion")
    window.location.href = "index.html";
}


window.addEventListener('DOMContentLoaded',function(event){
    let clients=[];
    let peanuts=[];
    const baseUrl='http://localhost:3030/api'; 

    if(!Boolean(sessionStorage.getItem("jwt"))){
        window.location.href = "index.html";
    }

    function fetchClients()
    {
        debugger;
        const url=`${baseUrl}/peanuts`;
        let status;
        fetch(url)
        .then((response)=>{
            status=response.status;
            return response.json();
        })
        .then((data)=>{
            if(status==200)
            {
                console.log(data);
                let peanutsLi=data.map(peanut=>{
                    const url=`${baseUrl}/peanuts/8/clients`;
                    let status2;
                    fetch(url)
                    .then((response)=>{
                        status2=response.status;
                        return response.json();
                    })
                    .then((data)=>{
                        if(status==200)
                        {
                            let clientsLi=data.map(client=>{
                                if(client.nombre=="Maria")
                                {
                                    return `
                                    <div class="card">
                                        <div class="card-encabezado">
                                            <img src="/img/Clients2.jpeg" alt="">
                                        </div>
                                        <div class="card-contenido">
                                            <div class="info-personal">Ci : ${client.ci}</div>
                                            <div class="info-personal">Nombre: ${client.nombre}</div>
                                            <div class="info-personal">Apellido: ${client.apellido}</div>
                                            <div class="info-personal">Celular: ${client.celular}</div>                   
                                        </div>
                                        
                                    </div>
                                 `
                                }
                                if(client.nombre=="Ana")
                                {
                                    return `
                                    <div class="card">
                                        <div class="card-encabezado">
                                            <img src="/img/Clients3.jpeg" alt="">
                                        </div>
                                        <div class="card-contenido">
                                            <div class="info-personal">Ci : ${client.ci}</div>
                                            <div class="info-personal">Nombre: ${client.nombre}</div>
                                            <div class="info-personal">Apellido: ${client.apellido}</div>
                                            <div class="info-personal">Celular: ${client.celular}</div>                   
                                        </div>
                                
                                    </div>
                                 `
                                }
                                if(client.nombre=="Andrea")
                                {
                                    return `
                                    <div class="card">
                                        <div class="card-encabezado">
                                            <img src="/img/Clients4.jpg" alt="">
                                        </div>
                                        <div class="card-contenido">
                                            <div class="info-personal">Ci : ${client.ci}</div>
                                            <div class="info-personal">Nombre: ${client.nombre}</div>
                                            <div class="info-personal">Apellido: ${client.apellido}</div>
                                            <div class="info-personal">Celular: ${client.celular}</div>                   
                                        </div>
                                        
                                    </div>
                                 `
                                }
                                if(client.nombre=="Carla")
                                {
                                    return `
                                    <div class="card">
                                        <div class="card-encabezado">
                                            <img src="/img/Clients6.jpg" alt="">
                                        </div>
                                        <div class="card-contenido">
                                            <div class="info-personal">Ci : ${client.ci}</div>
                                            <div class="info-personal">Nombre: ${client.nombre}</div>
                                            <div class="info-personal">Apellido: ${client.apellido}</div>
                                            <div class="info-personal">Celular: ${client.celular}</div>                   
                                        </div>
                                       
                                    </div>
                                 `
                                }
                                else
                                {
                                    return `
                                    <div class="card">
                                        <div class="card-encabezado">
                                            <img src="/img/Clients1.jpeg" alt="">
                                        </div>
                                        <div class="card-contenido">
                                            <div class="info-personal">Ci : ${client.ci}</div>
                                            <div class="info-personal">Nombre: ${client.nombre}</div>
                                            <div class="info-personal">Apellido: ${client.apellido}</div>
                                            <div class="info-personal">Celular: ${client.celular}</div>                   
                                        </div>
                                        
                                    </div>
                                 `
                                    
                                }
                                
                            })
                            var clientContent = clientsLi.join('');
                            document.getElementById('contenedor').innerHTML=clientContent;
                            let buttons=document.querySelectorAll('#contenedor div button[data-client-id');
                            for(const button of buttons)
                            {
                                button.addEventListener('click',DeleteClient);
                            }
                        }
                    })
                })
                
            }
        })
    }

    
    fetchClients();
});