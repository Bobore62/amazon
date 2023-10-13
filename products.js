
export let products = [
    {
        id:'',
        name: "Intermediate composite basketball",
        price: "50000",
        image: "intermediate-composite-basketball.jpg",
        rating: {
            stars: 4.5,
            counting: 17000
        }
    },
    {
        id:'',
        name: "Electric glass and steel hot water kettle",
        price: "5000",
        image: "electric-glass-and-steel-hot-water-kettle.webp",
        rating: {
            stars: 4,
            counting: 1000
        },
    },
    {
        id:'',
        name: "Plain hooded fleece sweatshirt yellow",
        price: "38000",
        image: "plain-hooded-fleece-sweatshirt-yellow.jpg",
        rating: {
            stars: 4.5,
            counting: 7000
        },
        size:['S','M','L']
,
        color:['Yellow','Teal'],
    },
    {
        id:'',
        name: "6 piece white dinner plate set",
        price: "20000",
        image: "6-piece-white-dinner-plate-set.jpg",
        rating: {
            stars:5,
            counting: 5000
        }
    },
    {
        id:'',
        name: "Adults plain cotton T-shirt 2 pack teal",
        price: "18000",
        image: "adults-plain-cotton-tshirt-2-pack-teal.jpg",
        rating: {
            stars: 4.5,
            counting: 12000
        },
        color:['blue','black','white'],
        size:['S','M','L']
    },
    {
        id:'',
        name: "Knit athletic sneakers gray",
        price: "38000",
        image: "knit-athletic-sneakers-gray.jpg",
        rating: {
            stars: 5,
            counting: 5000
        },
        color:['blue','black','white'],
        size:['4','5','6','7','8','9']
    },
    {
        id:'',
        name: "Luxury tower set 6 piece",
        price: "5000",
        image: "luxury-tower-set-6-piece.jpg",
        rating: {
            stars: 4,
            counting: 100
        },
        color:['grey','black','white'],
    },
    {
        id:'',
        name: "Athletic cotton socks 6 pairs",
        price: "5000",
        image:"athletic-cotton-socks-6-pairs.jpg",
        rating: {
            stars: 5,
            counting: 9000
        }
    },
]


function productId(size) {
    let productIds =JSON.parse(localStorage.getItem('id'));
    if(!productIds) {
        productIds=[]
    }
    if (productIds.length===size) {
        products.forEach((e,i)=>{
            e.id=productIds[i]
            })
    }else{
        productIds=[]
        products.forEach((e,i)=>{
        productIds.push(generateUUID('xxxxxxxx'))
        e.id=productIds[i]
        })
        localStorage.removeItem('carting');
        localStorage.setItem('id',JSON.stringify(productIds));
    }    
}
productId(products.length)
export function search(searchInput) {
    let newProduct =[] 
    let name=''
    let search =''
    products.forEach((ei)=>{
        name=ei.name.toLowerCase().trim()//.replaceAll(' ','')
        search = searchInput.toLowerCase().trim();
        let i=0
        let col=''
        while(i<search.length) {
            for(let j=0;j<name.length;j++) {
                if(search[i]===name[j]){
                    col+=name[j]
                    break;
                }   
            }
            i++
        }
        if(search===col){
            newProduct.push(ei)
        } 
        
    })
    console.log(name)
    products = newProduct;
    return products;
}
function fun(arr) {
    let i = 0;
    let col = '';
    let f =arr[0].replace(' ','')
    let s = arr[1].replace(' ','')
    while (i < s.length) {
        for (let j = 0; j < f.length; j++) {
            if (s[i].toLowerCase() === f[j].toLowerCase()) {
                col += s[i].toLowerCase();
                break;
            }
        }
        i++;
    }
    if (col === s.toLowerCase()) {
        return true;
    } else {
        return false;
    }

}
console.log(fun(['army', 'may aa']));
export function generateUUID(format) { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now()*1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return `${format}-xxxx-4xxx-yxxx-xxxxxxxxxxxx`.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if(d > 0){//Use timestamp until depleted
            r = (d + r)%16 | 0;
            d = Math.floor(d/16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r)%16 | 0;
            d2 = Math.floor(d2/16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}
