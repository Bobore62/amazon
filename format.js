export function stringFormat(str,size=3) {
	let format;
    let ending;
    if(str.indexOf('.')===-1) {
        format =str;
        ending='';
    }else{
        format = String(str.slice(0,str.indexOf('.')))
        ending=String(str.slice(str.indexOf('.')))
}
    let str2 = String(format).split('');
				
    let result=[];
    let copy;
    let str3 =[];
    let result2 ='';
    let formatedNumber='';
    
    for(let i=str2.length-1;i>=0;i--) {
        str3.push(str[i])
    }
    for(let i=0;i<str3.length;i+=size) {
        copy = str3.slice(i,i+size);
        result.push(copy.join(''));
    }
    result2 = result.join(',');
				
    for(let i=result2.length-1;i>=0;i--) {
        formatedNumber+=result2[i];
    }
    return formatedNumber+ending;
}

function intConveter(pases) {
    let finala ='';
    let total =0;
    for(let i=0;i<pases.length;i++) {
        if(pases[i]!==','){
            finala +=pases[i];
        }
    }
    total= Number(finala)*2;
    return String(total);
}
function cardInputFormatter(pases) {
	let finala ='';
	for(let i=0;i<pases.length;i++) {
		if(pases[i]!==' '){
			finala +=pases[i];
		}
	}
	//total= Number(final)*2;
	return String(finala);
}
// let le =fun3(fun2('8000.08',3))
// console.log(le)
// let format = String(le.indexOf('.'))
// console.log(format, 'format')
// console.log(fun2(le,3))
function card(input,size) {
    let str2 = input.split('');
    let result=[];
    let copy;
    let result2 ='';

    for(let i=0;i<str2.length;i+=size) {
        copy = str2.slice(i,i+size);
        result.push(copy.join(''));
    }
    result2 = result.join(' ');
	
    return result2;
}