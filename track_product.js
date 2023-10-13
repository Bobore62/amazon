import { header,toggleFun } from "./header.js";
import { trackObject } from "./track_product_object.js";
import { products } from "./products.js";
import {cartDisplay } from "./cart.js";

let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

const headera = document.querySelector('.header');
headera.innerHTML= header;
cartDisplay()
toggleFun()
let matching;
let orderDate = new Date(trackObject.date+' '+trackObject.year)
let day = days[orderDate.getDay()]
let month = months[orderDate.getMonth()]
let date2 = `${day}, ${month} ${orderDate.getDate()}`
let progress ='';

let deliver=''
function dateLogic() {
    let current=new Date();
    let status=''
    if(current.getFullYear()===orderDate.getFullYear()) {
        if(orderDate.getMonth()>current.getMonth()) {
            deliver='Preparing';
    																					progress ='30px';
        }else if(orderDate.getMonth()===current.getMonth()){
            if(orderDate.getDate()>current.getDate()) {
                
        progress ='30px';
        deliver= `Preparing`;
            } else if(orderDate.getDate()===current.getDate()){
                deliver='Preparing';
    progress ='25%';
            } else{
                if(orderDate.getDate+1===current.getDate()){
                    deliver='Shipped';
                    progress ='50%';
                    
                }else{
                deliver= `Delivered`
                progress='100%'
                }
            }
        }else {
            if(orderDate.getDate+1===current.getDate()){
                    
                deliver='Shipped';
                progress ='50%';
                return
                }else{
                deliver= `Delivered`
                progress='100%'
                }
            
        } 
    }else if(current.getFullYear()>orderDate.getFullYear()){
        if(orderDate.getDate+1===current.getDate()){
                    
                deliver='Shipped';
    progress ='50%';
                    return
                }else{
                deliver= `Delivered`
                progress='100%'
                }
    }else{
        progress ='30px';
        deliver= `Preparing`;
    }
    
}
dateLogic()
products.forEach(e=>{
    if(trackObject.productId===e.id) {
        matching=e
    }
})
let html;
if (matching) {
     html=`
        <h2 class="date">${(trackObject.status).replace(':','')} ${date2}</h2>
        <div class="product">
            <p class="name">${matching.name}</p>
            <p>Quantity:		${trackObject.quatity} </p>
            <div class="pic">
                <img src="${matching.image}">
            </div>
        </div>
    `
}

document.querySelector('.wrapper').innerHTML=html;
const date = document.getElementsByClassName('date')[0].innerHTML;

const status = date.slice(0,date.indexOf(' '))

let mark = document.querySelectorAll('.status p');

/*
if(status==='Arriving') {
    deliver='Preparing';
    progress ='30px';
} else if(status==='Shipping') {
    deliver='Shipped'
    progress ='50%';
} else{
    deliver='Delivered'
    progress ='100%';
}
*/
mark.forEach(e=>{
    if (deliver===e.innerHTML) {
        e.style.color='blue'
    }
})
let before = document.querySelector('.bar span')
before.style.setProperty('--length',`${progress}`)
console.log(before)