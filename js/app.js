if(!Boolean(sessionStorage.getItem("jwt"))){
    alert("Por favor Inicie Sesion")
    window.location.href = "index.html";
}

window.addEventListener('DOMContentLoaded',function(event){
    let peanuts=[];
    const baseUrl='http://localhost:3030/api';

    if(!Boolean(sessionStorage.getItem("jwt"))){
        window.location.href = "index.html";
    }

    async function fetchPeanuts()
    {

        var rootElement = document.documentElement;
        const url = `${baseUrl}/peanuts`;
        const url1 ='http://localhost:3030';
        debugger;
        let status;
        let response= await fetch(url);
        try{
            if(response.status==200)
            {
                let data= await response.json();
                let peanutsLi = data.map(peanut=> {
                    debugger;
                    var imageUrl = peanut.imagePath? `${url1}/${peanut.imagePath}` : "";
                    var imageUrl2=imageUrl.replace('\\','/')
                    var imageUrl3=imageUrl2.replace('\\','/')
                    rootElement.style.setProperty("--imagen",imageUrl3);
                    
                    if(peanut.name.toLowerCase()=="picante")
                    {
                        return `
                           
                            <section style="background-image:url(${imageUrl3});" id="sabor1" class="contenedor-sabor1 ">
                                
                                <div class="contenedor"> 
                                    <div align="center"><img src="/img/picante2.png"  class="imagen-picante"></div>
                                    <h1 class="sabor"> McNuts  ${peanut.name} </h1> <br> 
                                    <h3 class="frase"> Precio Unitario: ${peanut.unitCost} Bs. </h3> 
                                    <p class="descripcion"> Fecha de Elaboracion: ${peanut.elaborationDate} <p>
                                    <p class="descripcion"> Fecha de vencimiento: ${peanut.expirationDate} <p>
                                    <p class="descripcion"> Precio Por mayor: ${peanut.wholesalePrice} Bs. <p> 
                                    <p class="descripcion"> Cantidad en stock: ${peanut.amount} <p> 
                                    <button class="boton" data-peanut-id="${peanut.id}"> Eliminar Sabor </button>
                                </div>
                            </section>`
                    }
                    if(peanut.name.toLowerCase()=="oreo")
                    {
                        return `
                        <section style="background-image:url(${imageUrl3});" id="sabor2" class="contenedor-sabor2">
                            <div class="contenedor"> 
                                <h1 class="sabor"> McNuts  ${peanut.name} </h1> <br> 
                                <h3 class="frase"> Precio Unitario: ${peanut.unitCost} Bs. </h3> 
                                <p class="descripcion"> Fecha de Elaboracion: ${peanut.elaborationDate} <p>
                                <p class="descripcion"> Fecha de vencimiento: ${peanut.expirationDate} <p>
                                <p class="descripcion"> Precio Por mayor: ${peanut.wholesalePrice} Bs. <p> 
                                <p class="descripcion"> Cantidad en stock: ${peanut.amount} <p> 
                                <button class="boton" data-peanut-id="${peanut.id}"> Eliminar Sabor </button>
                            </div>
                        </section>`
                    }
                    if(peanut.name.toLowerCase()=="miel y mostaza")
                    {
                        return `
                        <section  style="background-image:url(${imageUrl3});" id="sabor3" class="contenedor-sabor3">
                            <div class="contenedor"> 
                                <h1 class="sabor"> McNuts  ${peanut.name} </h1> <br> 
                                <h3 class="frase"> Precio Unitario: ${peanut.unitCost} Bs. </h3> 
                                <p class="descripcion"> Fecha de Elaboracion: ${peanut.elaborationDate} <p>
                                <p class="descripcion"> Fecha de vencimiento: ${peanut.expirationDate} <p>
                                <p class="descripcion"> Precio Por mayor: ${peanut.wholesalePrice} Bs. <p> 
                                <p class="descripcion"> Cantidad en stock: ${peanut.amount} <p> 
                                <button class="boton" data-peanut-id="${peanut.id}"> Eliminar Sabor </button>
                            </div>
                        </section>`
                    }
                    if(peanut.name.toLowerCase()=="coco y leche condensada")
                    {
                        return `
                        <section  style="background-image:url(${imageUrl3});" id="sabor4" class="contenedor-sabor4">
                            <div class="contenedor"> 
                                <h1 class="sabor"> McNuts  ${peanut.name} </h1> <br> 
                                <h3 class="frase"> Precio Unitario: ${peanut.unitCost} Bs. </h3> 
                                <p class="descripcion"> Fecha de Elaboracion: ${peanut.elaborationDate} <p>
                                <p class="descripcion"> Fecha de vencimiento: ${peanut.expirationDate} <p>
                                <p class="descripcion"> Precio Por mayor: ${peanut.wholesalePrice} Bs. <p> 
                                <p class="descripcion"> Cantidad en stock: ${peanut.amount} <p> 
                                <button class="boton" data-peanut-id="${peanut.id}"> Eliminar Sabor </button>
                            </div>
                        </section>`
                    }
                    if(imageUrl3=="")
                    {
                        return `
                        <section id="sabor0" class="contenedor-sabor0">
                            <div class="contenedor"> 
                                <h1 class="sabor"> McNuts  ${peanut.name} </h1> <br> 
                                <h3 class="frase"> Precio Unitario: ${peanut.unitCost} Bs. </h3> 
                                <p class="descripcion"> Fecha de Elaboracion: ${peanut.elaborationDate} <p>
                                <p class="descripcion"> Fecha de vencimiento: ${peanut.expirationDate} <p>
                                <p class="descripcion"> Precio Por mayor: ${peanut.wholesalePrice} Bs. <p> 
                                <p class="descripcion"> Cantidad en stock: ${peanut.amount} <p> 
                                <button class="boton" data-peanut-id="${peanut.id}"> Eliminar Sabor </button>
                            </div>
                        </section>`
                    }
                    else {
                        return `
                        <section  style="background-image:url(${imageUrl3});" id="saborn" class="contenedor-saborn">
                            <div class="contenedor"> 
                                <h1 class="sabor"> McNuts  ${peanut.name} </h1> <br> 
                                <h3 class="frase"> Precio Unitario: ${peanut.unitCost} Bs. </h3> 
                                <p class="descripcion"> Fecha de Elaboracion: ${peanut.elaborationDate} <p>
                                <p class="descripcion"> Fecha de vencimiento: ${peanut.expirationDate} <p>
                                <p class="descripcion"> Precio Por mayor: ${peanut.wholesalePrice} Bs. <p> 
                                <p class="descripcion"> Cantidad en stock: ${peanut.amount} <p> 
                                <button class="boton" data-peanut-id="${peanut.id}"> Eliminar Sabor </button>
                            </div>
                        </section>`
                    }


                    
                });   
                var peanutContent = peanutsLi.join('');
                document.getElementById('peanuts-container').innerHTML=peanutContent;
                let buttons=document.querySelectorAll('#peanuts-container div button[data-peanut-id]');
                for (const button of buttons)
                {
                    button.addEventListener('click',DeletePeanut);
                }
            }else {
                var errorText=await response;
                alert(errorText);
            }
        }catch(error){
            var errorText=await error;
            alert(errorText);
        }
    }

    function DeletePeanut(event) {
        let peanutId=this.dataset.peanutId;
        let url= `${baseUrl}/peanuts/${peanutId}`;
        fetch(url, { 
            method: 'DELETE' 
        });
        location.reload(); 
    }

    document.getElementById('fetch-btn').addEventListener('click',fetchPeanuts);
    

});