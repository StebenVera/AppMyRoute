
url = 'https://myrute.herokuapp.com/'


function createUser(nombre,correo,password){
   return fetch(url+'usuario',{
            method:'POST',
            headers:{
             Accept: 'application/json',
             'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nombre,
                correo,
                password
            })
         }).then(response => response.json())
           .then(data =>{
               return data
           })
          
}

export  {createUser}