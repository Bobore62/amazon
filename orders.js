import { order} from "./order_array.js";
import { header,toggleFun } from "./header.js";
import { products} from "./products.js";
import { cart,saveToLocal,cartDisplay } from "./cart.js";
import { trackObject,assignValue } from "./track_product_object.js";


const headera = document.querySelector('.header');
headera.innerHTML= header;
toggleFun()
let count=0;
console.log(order)
console.log(products)
const wrap = document.querySelector('.order-section');
let html=''

function dateLogic(year,selectedDate) {
    let orderDate = new Date(selectedDate+' '+year)
    let current=new Date();
    let status=''
    if(current.getFullYear()===orderDate.getFullYear()) {
        if(orderDate.getMonth()>current.getMonth()) {
            status= `Arriving on:`
        }else if(orderDate.getMonth()===current.getMonth()){
            if(orderDate.getDate()>current.getDate()) {
                status= `Arriving on:`
            } else if(orderDate.getDate()===current.getDate()){
                status= `Shipping on: `
            } else{
                status= `Delivered on:`
            }
        }else {
            status= `Delivered on:`;
        } 
    }else if(current.getFullYear()>orderDate.getFullYear()){
        status= `Delivered on:`;
    }else{
        status= `Arriving on:`
    }
    return status;
}

let matchingItems;
order.forEach(e =>{
    html+=`<div class="wrap">
    <div class="order-wrap">
        <div>
            <h4>Order placed on:</h4>
            <p class="order-date values">${e.placedAt}</p>
        </div>
        <div>
            <h4>Total:</h4>
            <p class="total-order values">${e.totalOrder}</p>
        </div>
        <div>
            <h4>Order ID:</h4>
            <p class="order-id values">${e.orderId}</p>
        </div>
    </div>
    
    <div class="order-details"> 
       
${fun(e.cart,products,e)} 
    
    </div>   
    </div>`
});


wrap.innerHTML=html;
document.querySelectorAll('.again')
    .forEach(e=>{
        let productId = e.dataset.productId;
        let orderId = e.dataset.orderId;
        let match;
        e.addEventListener('click',()=>{
            order.forEach(el=>{
                if(el.orderId===orderId) {
                    el.cart.forEach(ele=>{
                        if(ele.id===productId) {
                            match=ele;
                        }
                    })
                }
            })
            if(match) {
                let matching;
                cart.forEach(el=>{
                    if(el.id===productId) {
                        matching=el;
                    }
                })
                if (matching) {
                    matching.quatity+=match.quatity;
                    e.innerHTML='Added'
                    setTimeout(()=>{
                        e.innerHTML='<img src="/images/buy-again.png">Buy it again'
                    },1000)
                } else{
                    cart.push({
                        id:match.id,
                        quatity:match.quatity,
                        size:(match.size)?match.size:'',
                        color:(match.color)?match.color:''
                    })
                    e.innerHTML='Added'
                    setTimeout(()=>{
                        e.innerHTML='<img src="/images/buy-again.png">Buy it again'
                    },1000)
                }
                saveToLocal()
                cartDisplay()
                console.log(cart)
            }
        })
    })
document.querySelectorAll('.track')
    .forEach(e=>{
        let productId = e.dataset.productId;
        let orderId = e.dataset.orderId;
        let match;
        let date;
        let year;
        let status;
        e.addEventListener('click',()=>{
            order.forEach(el=>{
                if(el.orderId===orderId) {
                    el.cart.forEach((ele,i)=>{
                        if(ele.id===productId) {
                            match=ele;
                            date=el.date[i]
                            year=el.year[i]
                            status=dateLogic(year=el.year[i],date=el.date[i])
                        }
                    })
                }
            })
            if(match) {
                assignValue({
                    orderId,
                    productId,
                    date,
                    year,
                    status,
                    quatity:match.quatity
                })
                localStorage.setItem('track',JSON.stringify(trackObject))
                document.location.href=`track_product.html?orderId=${orderId}`
            }
        })
    })
function fun(arr,arr2,e) {
    let data =''
    arr.forEach((el,i)=>{
        arr2.forEach(element =>{
            if(element.id===el.id) {
                matchingItems=element;
            }
        })
        
        data+=`<div class="product-wrap">
            <div class="ordered-product">
                <div class="pic"><img src="${matchingItems.image}"></div>
                <div class="ordered-details">
                    <h4>${matchingItems.name}</h4>
                    <p>${dateLogic(e.year[i],e.date[i])} ${e.date[i]}</p>
                    <div>Quantity: <span>${el.quatity}</span></div>
                    ${(el.size)?'<div>Size: '+el.size+'</div>':''}
            
                    ${(el.color)?'<div>Color: '+el.color+'</div>':''}
                    <button class="again" data-product-id = '${el.id}' data-order-id='${e.orderId}'><img src="/images/buy-again.png">Buy it again</button>
            </div>

            </div>
            <button class="track" data-product-id = '${el.id}' data-order-id='${e.orderId}'>Track package</button>
        </div>`
    })
    return data;
}
								
cartDisplay()
