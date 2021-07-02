const newZigZag = (input,n)=>{
    let jump = n * 2 - 2;
    let up = jump;
    let down = 0;
    let newString = '';
    let check = true; 
    for(let i = 0; i <n; i++){
        newString += input[i];
        if(i=== 0|| i === n-1){
            for(let j = i;j<input.length- jump;j+=jump){
                newString += input[j+jump];
            }
        }else{
            up -= 2;
            down += 2;

            for(let j=i;j<input.length-2;){
                if((j+up>=input.length&&check)||(j+down>=input.length&&!check))
                break;
                if(check){
                    newString += input[j+up];
                    check = !check;
                    j+= up;
                }else{
                    newString += input[j+down];
                    j+= down
                    check = !check;
                }
                
            }
        }
    }
    return newString;
}
console.log(newZigZag('BEADVANCEDPARTNER',3))