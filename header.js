export const header =`<div class="wrap-flex">
<a class="small-logo" href="index.html">
<img src="amazon-mobile-logo-white.png" >
</a>
<a class="logo" href="index.html">
<img src="amazon-logo-white.png">
</a>
<div class="search-box">
<input placeholder = "Search" class="search-input">
<button class="search-button">
    <img src="search-icon.png">
</button>
</div>
<a class="cart-link" href="order.html">
<div class="oders">
    <span class="return">Returns</span>
    <span class="oder">& Orders</span>
</div>
</a>
<a class="cart-link" href="checkout.html">
<div class="cart">
    <img src="cart-icon.png">
    <span class="quantity1">0</span>
</div>
</a>
<div class="togle">
<span class="bar1"></span>
<span class="bar2"></span>
<span class="bar3"></span>
</div>
</div>
<div class="slide close">
<a class="cart-linka" href="order.html">
    <div class="oders">
    <span class="return">Returns</span>
    <span class="oder">& Orders</span>
    </div>
</a>
<a class="cart-linka1" href="checkout.html">
    <div class="cart">
        Cart(<span class="quantity">0</span>)
    </div>
</a>
</div>
`;

export function toggleFun() {
    const togle = document.querySelector('.togle');
    const slide = document.querySelector('.slide');
    togle.addEventListener('click',(e)=>{
        togle.classList.toggle('open') 
        togle.classList.toggle('close')
        display(slide);
    });
}
let status=0
function display(slide) {
    
    if(!status) {
        status=1
        slide.classList.add('show')
        slide.classList.remove('hide')
    } else {
        slide.classList.remove('show')
        slide.classList.add('hide')
        status=0
    }
    
}
