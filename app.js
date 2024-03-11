var map;
var currentLocation = null;

// Inicialización del mapa
function initMap(){
    map = L.map('mapa').setView([36.719332, -4.423457], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
}
// Añade un punto al mapa y su correspondiente listener
function addToMap(data){
    let marker = L.marker([data.lat, data.lon]).addTo(map);
    marker.bindPopup(
        `<h3>${data.nombre}</h3>
         <p>${data.ciclos}</p>
        `);
    marker.addEventListener("click",()=>{
        console.log(data.nombre);
        updateInfo(data);
    });
    console.log(marker);
}


// Actualiza el panel de información
function updateInfo(data){
    document.querySelector("#info h3").textContent = data.nombre;
    document.querySelector("#info p").textContent = data.ciclos;
    document.querySelector("#info img").setAttribute("src",data.imagen  );
    document.querySelector("#info a").setAttribute("href",`url(${data.link})`);

    if(currentLocation){
        const distancia = haversineDistance(currentLocation,[data.lat,data.lon]);
        document.querySelector("#info span").textContent = distancia+"km";
    }else{
        document.querySelector("#info span").textContent = "-";
    }
}


//Inicializar el mapa
initMap();

//Carga de datos
fetch("static/datos.json")
.then( (res) => res.json() )
.then( (data) => {
    data.forEach(element => {
        console.log(element);
        addToMap(element);
    });
} )
.catch( (err)=>{
    console.log("Error en el fetch");
    console.log(err);
});

// Controla el botón de la geolocalización
document.querySelector("#geolocator button").addEventListener("click",()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( (pos) => {
            let marker = L.marker([pos.coords.latitude, pos.coords.longitude]).addTo(map);
            marker.bindPopup("Aqui estoy").openPopup();
            map.setView([pos.coords.latitude, pos.coords.longitude], 18);
            currentLocation = [pos.coords.latitude, pos.coords.longitude];
        });
    }
});


document.addEventListener("DOMContentLoaded", function() {

  function obtenerDatos() {

  }

  function mostrarModal(nombre, direccion) {
    document.getElementById("modal-titulo").textContent = nombre;
    document.getElementById("modal-direccion").textContent = direccion;
    document.getElementById("myModal").style.display = "block";
  }


  document.getElementById("cerrar-modal").onclick = function() {
    document.getElementById("myModal").style.display = "none";
  }


  document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById("myModal").style.display = "none";
  }


  obtenerDatos();
});
