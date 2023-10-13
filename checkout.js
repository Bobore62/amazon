import {cart,removeItems,saveToLocal} from "./cart.js";
import { products,generateUUID } from "./products.js";
import { order } from "./order_array.js";
import {stringFormat} from "./format.js";
import {snapshot2,okayClick2} from "./snapshot.js";

const quantityItems = document.querySelector('.items')
const cartItems = document.querySelector('.cart-item');
let count=0;
let sum=0;

let body = document.querySelector('.snap');

const orderButton =document.querySelector('.button')
orderButton.addEventListener('click',()=>{
    let totalAmount=document.querySelector('.total-order').innerHTML
    let day =new Date();

    let date =`${months[day.getMonth()]} ${day.getDate()}`
    let dateList=[]
    let yearList=[]
    
    document.querySelectorAll('.date2')
    .forEach((e,i)=>{
        let str1 =e.innerHTML
        let str =str1.slice(str1.lastIndexOf(',')+1)
        dateList.push(str)
        yearList.push(timers(i).year)
    });
  
    let id =generateUUID('order');
    order.unshift({
        placedAt:date,
        totalOrder:totalAmount,
        orderId:id,
        cart:cart,
        date:dateList,
        year:yearList
    })
    localStorage.setItem('order',JSON.stringify(order));
    localStorage.removeItem('carting');
    //localStorage.removeItem('order');
    snapshot2(body)
    okayClick2(body,'order.html')
    //document.location.href="order.html"
    });
let months = ['January','February','March','April','May','June','July','August','September','October','November','December']
let days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']

function timers(i) {
    let shippingDate;
    let todayDate = new Date();
    let day =todayDate.getDate();
    let monthIndex=todayDate.getMonth();
   
    let deliveryDay = [
        {
            index:5,
            id:day+5,
        },
        {
            index:2,
            id:day+2,
        },
        {
            index:0,
            id:day,
        }
    ]
    let date='';
    let final;
    
    shippingDate = new Date(todayDate.getFullYear(),monthIndex,deliveryDay[2].id)
    let dayIndex =shippingDate.getDay();
    let status =0;

    if(dayIndex===0) {
       status=deliveryDay[2].id+1;
    }else if(dayIndex===6) {
        status=deliveryDay[2].id+2;
    }else if (dayIndex>=1 && dayIndex<=5) {
        status=deliveryDay[2].id;
    }

    
    deliveryDay[i].id=status+deliveryDay[i].index;
    
    shippingDate = new Date(todayDate.getFullYear(),monthIndex,deliveryDay[i].id)
    dayIndex =shippingDate.getDay();
    
    if(dayIndex===0) {
       deliveryDay[i].id+=1;
    }else if(dayIndex===6) {
        deliveryDay[i].id+=2;
    }else if (dayIndex>=1 && dayIndex<=5) {
        deliveryDay[i].id+=0;
    }
    
    
    shippingDate = new Date(todayDate.getFullYear(),monthIndex,deliveryDay[i].id);
    
    date = `${days[shippingDate.getDay()]}, ${shippingDate.getDate()} ${months[shippingDate.getMonth()]}`
    return final={
        date,
        year:shippingDate.getFullYear()
    };
}
function itemCount() {
    cart.forEach(element =>{
    count+=element.quatity;
    })
}
itemCount();
const ite = document.querySelector('.items-in');
ite.innerHTML=count;
quantityItems.innerHTML=count +' items';
let html ='';
cart.forEach(cartItem => {
    let matchingItems;
    products.forEach(element =>{
        if(element.id===cartItem.id) {
            matchingItems=element;
        }
    })
    if(matchingItems) {
        sum +=((matchingItems.price*cartItem.quatity));    
    }
    html += `
    <div class="cart-items js-cart-items-${cartItem.id}">
        
    <h3 class="date">Delivery date:<span class="date2" data-product-id="${cartItem.id}"	> ${timers(0).date} </span></h3>
    <div class="cartsa">
       <div class="product-in">
        <div class="pic">
            <img src = "${matchingItems.image}">
        </div>
        <div class="product-cart">
            <h4>${matchingItems.name}</h4>
            <p class="prices">M${(matchingItems.price/100).toFixed(2)}</p>
            ${(cartItem.size)?'<div class="sizes">Size: '+cartItem.size+'</div>':''}
            
            ${(cartItem.color)?'<div class="color">Color: '+cartItem.color+'</div>':''}
            <div CLASS="quan">Quantity:
                <span class="quantity-count" data-product-id="${cartItem.id}"> ${cartItem.quatity}</span>
                <div>
                    <span class="update" data-product-id="${cartItem.id}">Update</span>
                    <span class="delete" data-product-id="${cartItem.id}">Delete</span>
                </div>   
            </div>
        </div>

    </div>
    <div>
        <h4 class="delivery-header">Choose delivery option:</h4>
        <div class="ship-date">
        <div class="shiping-date">
            <input type="radio" value='first' data-product-id="${cartItem.id}" name="delivery-option-${cartItem.id}" checked>
            <div>
                <h4 class="date-choose"> ${timers(0).date}</h4>
                <p>Free Shipping</p>
            </div>
        </div>
        <div class="shiping-date">
            <input type="radio" value='second' data-product-id="${cartItem.id}" name="delivery-option-${cartItem.id}">
            <div>
                <h4 class="date-choose"> ${timers(1).date}</h4>
                <p>M4.99 - Shipping</p>
            </div>
        </div>
        <div class="shiping-date">
            <input type="radio" value='deliveryDay'	data-product-id="${cartItem.id}" name="delivery-option-${cartItem.id}">
            <div>
                <h4 class="date-choose"> ${timers(2).date}</h4>
                <p>M9.99 - Shipping</p>
            </div>
        </div>
    </div> 
    </div>
    
    </div>
    </div>
    ` 
});

cartItems.innerHTML=(count)?html:`<h3 class='nothing'>Nothing in the cart, please add product you want to purchase.</h3>
 <a class='view' href="index.html">View products</a>
`;
const totalPrice = document.querySelector('.total-price');
totalPrice.innerHTML="M"+	stringFormat((sum/100).toFixed(2));
let date='';

if(!count) {
    orderButton.disabled = true;
}
document.querySelectorAll('.delete').forEach((ele,index) => {
    ele.addEventListener('click',()=> {
        let id = ele.dataset.productId;
        removeItems(id)
        saveToLocal();
        document.querySelector(`.js-cart-items-${id}`).remove();
        count=0;
        sum=0;
        itemCount()
        quantityItems.innerHTML=count +' items';
        cartSearch();
        totalPrice.innerHTML="M"+	stringFormat((sum/100).toFixed(2));
        ite.innerHTML=count;
        totalCost=0
        totalcosts()
        if(!count) {
            orderButton.disabled = true;
            cartItems.innerHTML=`<h3 class='nothing'>Nothing in the cart, please add product you want to purchase.</h3>
<a class='view' href="index.html">View products</a>`
        }
    });
    
})

let totalCost=0;
const input = document.createElement('input');
input.style.width='30px'
input.style.height='20px'
input.type='number';
let i =0; 
let inputQuantity;
const lee = document.querySelectorAll('.quantity-count');
document.querySelectorAll('.update').forEach ((elem,ind) =>{
    elem.addEventListener('click',()=>{
        let matches;
        let cartMatch;
        let updateId =elem.dataset.productId
        lee.forEach(e=>{
            let inputId =e.dataset.productId
            if(updateId===inputId) {
                matches = e;
                cart.forEach(el=>{
                    if(el.id===updateId) {
                        cartMatch=el;
                    }
                })
            }
        })
        if(matches) {
            inputQuantity=matches;
        }
        
        i=Number(input.value);
        if(elem.innerText==='Update') {
            i =Number(inputQuantity.innerHTML)
            input.value=i;
            inputQuantity.innerHTML='';
            elem.innerHTML='Save';
            inputQuantity.appendChild(input)
        } else {
            elem.innerHTML='Update';
            if(Number(input.value)<1) {
                i=1
            }
            inputQuantity.innerHTML=i;
            cartMatch.quatity=i
            count=0;
            sum=0;
            itemCount()
            quantityItems.innerHTML=count +' items';
            cartSearch();
            totalPrice.innerHTML="M"+	stringFormat((sum/100).toFixed(2));
            ite.innerHTML=count
            saveToLocal();
            totalCost=0
            totalcosts()
        }
    })
})
let val= document.querySelectorAll(`input[type="radio"]`);
let prev;
let shippingCost =0;
let costList=[];

let prevIde;
let ta = document.querySelectorAll('.date-choose')
val.forEach((e,i) =>{
    e.addEventListener('change',()=>{
        if(e!==prev) {
            prev=e;
        }

        if(e.value==='first') {
            date =' '+ ta[i].innerHTML;
            shippingCost =0;
        }else if(e.value==='second') {
            date =' '+ ta[i].innerHTML;
            shippingCost =499;
        } else {
            date =' '+ ta[i].innerHTML;
            shippingCost =999;
        }
        let t = e.dataset.productId;
        
        costList.forEach(costs=>{
           if(t===costs.index) {
                prevIde=costs
           }
          
        })
        if(prevIde) {
            prevIde.cost=shippingCost;
        } else {
            costList.push({
                index:t,
                cost:shippingCost
            });
            
        }
        totalCost=0
        totalcosts();
        let dateHtml;
        let date2 = document.querySelectorAll('.date2')
        date2.forEach(dateId=>{
            let date2Id = dateId.dataset.productId
            if(t===date2Id) {
                dateHtml=dateId
            }
        })
        if(dateHtml) {
            dateHtml.innerHTML=date;
        }
        

    }) 

})

function totalcosts() {
    
    costList.forEach(costs=>{
        cart.forEach(e=>{
           if (costs.index===e.id) {
                totalCost+=costs.cost;
            } 
        })
        
        
     });
     let total =sum+totalCost;
     let tax =total*10/100;
    
    document.querySelector('.handling').innerHTML=`M${stringFormat((totalCost/100).toFixed(2))}`
    document.querySelector('.before-tax ')
         .innerHTML=`M${stringFormat(((total)/100).toFixed(2))}`;
    document.querySelector('.tax ')
         .innerHTML=`M${stringFormat(((tax)/100).toFixed(2))}`
    document.querySelector('.total-order')
        .innerHTML=`M${stringFormat(((tax+total)/100).toFixed(2))}`
}
function cartSearch() {
    cart.forEach((cartItem) => {
        let matchingItems;
        products.forEach(element =>{
            if(element.id===cartItem.id) {
                matchingItems=element;
            }
        })
        if(matchingItems) {
            sum +=((matchingItems.price*cartItem.quatity));    
        }
    })
}
totalcosts();
// function stringFormat(str,size=3) {
// 	let format;
//     let ext;
//     if(str.indexOf('.')===-1) {
//         format =str;
//         ext='';
//     }else{
//         format = String(str.slice(0,str.indexOf('.')))
//         ext=String(str.slice(str.indexOf('.')))
// 	}
//     let str2 = String(format).split('');
				
//     let res=[];
//     let copy;
//     let str3 =[];
//     let resu ='';
//     let com='';
    
//     for(let i=str2.length-1;i>=0;i--) {
//         str3.push(str[i])
//     }
//     for(let i=0;i<str3.length;i+=size) {
//         copy = str3.slice(i,i+size);
//         res.push(copy.join(''));
//     }
//     resu = res.join(',');
				
//     for(let i=resu.length-1;i>=0;i--) {
//         com+=resu[i];
//     }
//     return com+ext;
// 			}



