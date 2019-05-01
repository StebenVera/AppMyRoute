
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


function postLogin(correo,password) {
    return fetch(url+'login',{
        method:'POST',
        headers:{
         Accept: 'application/json',
         'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            correo,
            password
        })
     }).then(response => response.json())
       .then(data =>{
           return data
       })
      
}

function saveTravel(nombre,fecha,hora,nombreConductor,distancia,tiempo,tarifa,placa,destino) {
    return fetch(url+'viaje',{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            nombre,
            fecha,
            hora,
            nombreConductor,
            distancia,
            tiempo,
            tarifa,
            placa,
            destino
        })
    }).then(response => response.json())
      .then(data=>{
          return data
      })    
}

function getViajes(nombre) {
    return fetch(url+'viajeRegistro',{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({
            nombre
        })
    }).then(response => response.json())
      .then(data =>{
          return data
      })
}
export  {createUser,postLogin, saveTravel,getViajes}