const d = new Date();
document.getElementById("year").innerHTML = d.getFullYear();
document.getElementById("navimg").addEventListener("click",()=>{location.reload()});
const map = L.map('ISSmap').setView([0, 0], 1);
const attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
const tilesURL='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles=L.tileLayer(tilesURL,{attribution});
tiles.addTo(map);
var myIcon = L.icon({
    iconUrl: 'International_Space_Station.svg.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
});

const marker=L.marker([0,0], {icon: myIcon}).addTo(map);

let flag=true;
const url="https://api.wheretheiss.at/v1/satellites/25544";
async function getParameters() {
    const response=await fetch(url);
    const data=await response.json();
    const {latitude,longitude,altitude,velocity,visibility}=data;
    marker.setLatLng([latitude,longitude]);
    if(flag){
        flag=false;
        map.setView([latitude,longitude],2);
    }
    document.getElementById("latitude").innerText=latitude.toFixed(3)+"°";
    document.getElementById("longitude").innerText=longitude.toFixed(3)+"°";
    document.getElementById("altitude").innerText=altitude.toFixed(3) + " miles";
    document.getElementById("velocity").innerText=velocity.toFixed(3) +" mph";
    document.getElementById("visibility").innerText=visibility;
}
getParameters();
setInterval(getParameters,2000);


