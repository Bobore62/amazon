import { products, search } from "./products.js";
import { cart,saveToLocal,cartDisplay } from "./cart.js";
import { header,toggleFun } from "./header.js";
import { snapshot,okayClick} from "./snapshot.js";

const headera = document.querySelector('.header');
headera.innerHTML= header;

toggleFun()
cartDisplay()

const gridContainer = document.querySelector('.grid-container');

let body = document.querySelector('.snap');
let but ='';
let colorBuns='';
function funn(myProduct) {
    let html = '';
    myProduct.forEach((items) => { 
    html += `
    <div class="product-container">
    <div class="picture"><img src= "${items.image}"></div>
    <div>
    <h4 class="title">${items.name}</h4>
    <div class="rating">
        <img src="rating-${items.rating.stars*10}.png">
        <span>${items.rating.counting}</span>
    </div>
    <span class="quatity-title">Quantity:</span>
    <select class="count">
        <option selected='selected' value='0'></option>
        <option value='1'>1</option>
        <option value='2' >2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
        <option value='6'>6</option>
        <option value='7'>7</option>
        <option value='8'>8</option>
        <option value='9'>9</option>
        <option value='10'>10</option>
    </select>
    <p class="price">M<span >${(items.price / 100).toFixed(2)}</span></p>
    </div>
    <div>
    <div class="sizes">
    </div>
    <div class="color">
    </div>
    </div>
    <div class="confirm-message"><div class="succ"><div class="tik"></div></div>Added to cart</div>
    <button class="cart-button" data-product-id = '${items.id}'>Add to cart</button>
    </div>`; 
}); 
return html;
}
let html =funn(products)
gridContainer.innerHTML= html;

products.forEach((items,i)=>{
    colorDisplay(items.color,i,items.id)
    sizeDiplay(items.size,i,items.id);
})


//

function sizeDiplay(arr,i,id) {
    if(arr) {
        arr.forEach(element=>{
            but+=`<button class="js-${id}">${element}</button>`
        })  
        document.querySelectorAll('.sizes')[i]
        .innerHTML=but;
        but=''                
    } else{
        return;
    }       
}
function colorDisplay(arr,i,id) {
    if(arr){
        arr.forEach(colors=>{
            colorBuns+=`<button class="colors js-color-${id}">${colors}</button>`
        })
        document.querySelectorAll('.color')[i]
        .innerHTML=colorBuns;
        colorBuns=''
    } else {
        return
    }
}

const b=document.querySelectorAll('.colors');
b.forEach(e =>{
    e.addEventListener('click',()=>{
        b.forEach(el=>{
            el.style.border='1px solid grey';
            el.removeAttribute('id')
        })
        e.style.border='2px solid orange';
        e.id='selected'
    })
})
document.querySelectorAll('.cart-button')
    .forEach((buttons, index) => {
        buttons.addEventListener('click', () => {
            const selectHTML = document.querySelectorAll('select')[index];
            let productId = buttons.dataset.productId;
            let matching;
            const sizeButtons =document.querySelectorAll('.js-'+productId);
            let selectedSize;
            const colorButtons =document.querySelectorAll('.js-color-'+productId);
            let selectedColor;
            
            sizeButtons.forEach(e=>{
                if(e.hasAttribute('id')) {
                    selectedSize = e.innerHTML
                    }
                })
            colorButtons.forEach(e=>{
                if(e.hasAttribute('id')) {
                    selectedColor = e.innerHTML;
                    }
                })
            
            if(selectHTML.options[selectHTML.selectedIndex].text) {
                cart.forEach((cartItems) => {
                    if (productId===cartItems.id) {
                        matching=cartItems;
                    }
                   
                });
                
            if(matching) {
                matching.quatity+=Number(selectHTML.options[selectHTML.selectedIndex].text);
                
                if (selectedSize) {
                    matching.size=selectedSize;
                } else {
                    matching.size=matching.size;
                }
                
                if (selectedColor) {
                    matching.color=selectedColor;
                } else {
                    matching.color=matching.color;
                }
                saveToLocal()
                document.querySelectorAll('.confirm-message')[index]
                    .style.display='flex';
                    
                setTimeout(()=>{
                    document.querySelectorAll('.confirm-message')[index]
                    .style.display='none';
                },2000);
            }else {
                const siz =document.querySelectorAll('.sizes')[index].innerHTML;
                const col =document.querySelectorAll('.color')[index].innerHTML;
                
                console.log(selectedColor)
                if (!siz.trim().length<1 && !col.trim().length<1) {
                    if (selectedSize && selectedColor) {
                        cart.push({
                        id: productId,
                        quatity: Number(selectHTML.options[selectHTML.selectedIndex].text),
                        size:selectedSize,
                        color:selectedColor
                        });
                        document.querySelectorAll('.confirm-message')[index].style.display='flex';
                    }else{
                        snapshot(body,'Size & Color','Please choose color and size')
                        okayClick(body)
                    }
                }else
                if (!siz.trim().length<1 || !col.trim().length<1) {
                    let status =(!siz.trim().length<1)?'Size':'Color';

                    if (selectedSize && selectedColor) {
                        cart.push({
                        id: productId,
                        quatity: Number(selectHTML.options[selectHTML.selectedIndex].text),
                        size:selectedSize,
                        color:selectedColor
                        });
                        document.querySelectorAll('.confirm-message')[index].style.display='flex';
                    }else
                    if(selectedSize){
                        cart.push({
                            id: productId,
                            quatity: Number(selectHTML.options[selectHTML.selectedIndex].text),
                            size:selectedSize,
                        });
                        document.querySelectorAll('.confirm-message')[index].style.display='flex';
                    }else
                    if(selectedColor){
                        cart.push({
                            id: productId,
                            quatity: Number(selectHTML.options[selectHTML.selectedIndex].text),
                            color:selectedColor
                        });
                        document.querySelectorAll('.confirm-message')[index].style.display='flex';
                    } else{
                        snapshot(body,status,'Please choose '+status)
                        okayClick(body)
                    }
                }else{
                        cart.push({
                            id: productId,
                            quatity: Number(selectHTML.options[selectHTML.selectedIndex].text),
                        });
                        document.querySelectorAll('.confirm-message')[index].style.display='flex';
                    }
                
                saveToLocal();
                
                setTimeout(()=>{
                    document.querySelectorAll('.confirm-message')[index]
                    .style.display='none'
                },2000);
            
            }
            cartDisplay()
            //counting += Number(selectHTML.options[selectHTML.selectedIndex].text);
            } else {
                snapshot(body,'Quantity','Select quantity')
                okayClick(body)
            }

        })

    })

gridContainer.addEventListener('click',()=>{
    // if(slide.style.opacity==='1') {
    //     slide.style.bottom='0';
    //     slide.style.opacity='0';
    //     slide.style.height='0';
    //     togle.classList.remove('open');
    //     status=0;
    // }   
    
})  
const ip = document.querySelector('.search-input');
ip.addEventListener('keydown',(e)=>{
    if(e.key==='Enter') {
        let input = ip.value
        let pro = search(input)      
        let ht=funn(pro)
        console.log(ht)
        console.log(pro)
        console.log(input)
        ip.value=''
        if(!input || !pro) {
           return gridContainer.innerHTML= html;
        }
        return gridContainer.innerHTML= ht;                                                                                                                                                                                                                                                                                                                                                                                  
    }
})
document.querySelector('.search-button')
    .addEventListener('click',()=>{
        let input = ip.value
        let pro = search(input)      
        let ht=funn(pro)
        console.log(ht)
        console.log(pro)
        console.log(input)
        ip.value=''
        if(!input || !pro) {
            pro = products
           return gridContainer.innerHTML= html;
        }
        return gridContainer.innerHTML= ht;                                                                                                                                                                                                                                                                                                                                                                                    
    })

console.log(cart);
function fun(arr) {
    let i = 0;
    let col = '';
    while (i < arr[1].length) {
        for (let j = 0; j < arr[0].length; j++) {
            if (arr[1][i].toLowerCase() === arr[0][j].toLowerCase()) {
                col += arr[1][i].toLowerCase();
                break;
            }
        }
        i++;
    }
    if (col === arr[1].toLowerCase()) {
        return true;
    } else {
        return false;
    }

}
console.log(fun(['army', 'aatmay']));

const size = document.querySelectorAll('.sizes button')
size.forEach(e=>{
    e.addEventListener('click',()=>{
        size.forEach(el=>{
            el.style.border='1px solid grey';
            el.removeAttribute('id')
        })
        e.style.border='2px solid orange';
        e.id='checked'
    })
})
const col =document.querySelectorAll('.color');
col.forEach((e,i)=>{
    //e.innerHTML.style.border='2px solid orange'
    //document.querySelectorAll('.sizes button')[i]
})


/*function fun2(arr, size) {
    let arr2 = [];
    let copy
    for(let i =0; i<arr.length;i+size) {
        copy = arr.slice(i,size);
        arr2.push(copy);
    }
    console.log(arr2)
}
fun2([1,2,3,4],2)*/
