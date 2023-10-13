export function snapshot(body,head,message) {
   // const con = document.querySelector('.snap')
    body.style.display='block';
  let html  =`
<div class="confirm">
        <h3 class="header">${head}</h3>
        <p>
           
            <span class="span">
                ${message}
            </span>
        </p>
        <button class="okay" 	>OK</button>
    </div>`
    return body.innerHTML=html
}
export function okayClick(body){
    const con = document.querySelector('.confirm');
    const okay = document.querySelector('.okay');
   okay.addEventListener('click', ()=>{
        con.classList.add('rev');
        //document.location.href=ref
    setTimeout(()=>{
        body.style.display='none'
    },800);
});
}
export function snapshot2(body) {
   // const con = document.querySelector('.snap')
    body.style.display='block';
  let html  =`
<div class="confirm">
        <h3 class="header">Success</h3>
            <p>
            <span class="message">Your order has been processed successfully</span> 
            <span class="span">
                Thank you for choosing us.
            </span>
        </p>
        <button class="okay" 	>OK</button>
    </div>`
    return body.innerHTML=html
}

export function okayClick2(body,ref){
    const con = document.querySelector('.confirm');
    const okay = document.querySelector('.okay');
   okay.addEventListener('click', ()=>{
        con.classList.add('rev');
    setTimeout(()=>{
        body.style.display='none'
        setTimeout(()=>{
            document.location.href=ref
        },300);
    },800);
       
});
}