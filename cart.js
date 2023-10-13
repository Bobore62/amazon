export let cart = JSON.parse(localStorage.getItem('carting'));
if(!cart) {
    cart=[]
}
export function saveToLocal() {
    localStorage.setItem('carting',JSON.stringify(cart));
}
export function removeItems(id) {
    let newCart= [];
    cart.forEach(element => {
        if(element.id!==id) {
            newCart.push(element)
        }
        cart = newCart;
        saveToLocal()
    });

}
function itemCount() {
    let count=0;
    cart.forEach(element =>{
    count+=element.quatity;
    })
    return count
}


export function cartDisplay(){
    let count = itemCount()
    document.querySelector('.quantity').innerHTML=count;
    document.querySelector('.quantity1').innerHTML=count;
}