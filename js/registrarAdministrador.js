window.addEventListener('load', (event) => {

    const baseUrl = 'http://localhost:3030/api';
    
    function register(event) {
        debugger;
        debugger;
        console.log(event.currentTarget);
        event.preventDefault();
        const url = `${baseUrl}/auth/User`;

        if(!Boolean(event.currentTarget.userName.value)){
            debugger;
            var usernameErrorElement = document.getElementById("register-errors");
            usernameErrorElement.textContent= "username is requered"
            usernameErrorElement.style.display = "block"
            return;
        } 
        
        function passwordNoExists()
        {
            debugger;
            var passwordErrorElement = document.getElementById("register-errors-password");
            passwordErrorElement.textContent="password is requered"
            passwordErrorElement.style.display="block"
        }


        if(!Boolean(event.currentTarget.password.value)){
            debugger;
            passwordNoExists();    
        }

        if(!Boolean(event.currentTarget.password1.value)){
            debugger;
            passwordNoExists();    
        }

        function diferentPasswords(password1,password2)
        {
            debugger;
            respuesta=true;
            if(password1!=password2)
            {
                respuesta=False;
            }
            return respuesta;
        }

        

        if(diferentPasswords((String(event.currentTarget.password.value)),(String(event.currentTarget.password1.value)))==false)
        {
            debugger;
            alert("Las contraseñas no son iguales")
        }

        debugger;
        var data = {
            Email: event.currentTarget.userName.value,
            Password: event.currentTarget.password.value,
            ConfirmPassword: event.currentTarget.password1.value
        }

        fetch(url, {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            method: 'POST',
            body: JSON.stringify(data)
        }).then((response) => {
            if (response.status === 200) {
                
                response.json().then((data)=>{
                    debugger;
                    sessionStorage.setItem("jwt", data.message);
                    window.location.href = "login.html";
                    
                });
            } else {
                response.text().then((data) => {
                    debugger;
                    alert("Contraseñas distintas o no ingreso un caracter")
                    console.log(data.errors);
                });
            }
        }).catch((response) => {

            debugger;
            alert(data.errors)
            console.log(data);
        });

    }

    document.getElementById("register-frm").addEventListener("submit", register);

});