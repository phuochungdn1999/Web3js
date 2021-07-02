const shortenPath = (input)=>{
    let newPath = '/';
    for(let i = 1; i < input.length;i++){
        if(input[i]==='.'&&input[i+1]==='/'){
            i+=1;
            continue;
        }
        if(input[i]==='.'&&input[i+1]==='.'){
            let j = newPath.length;
            while(j> 1){
                if(newPath[j]!='/'){
                    newPath = newPath.substring(0, newPath.length - 1);                    
                    j--
                }else{
                    break
                }
            }
            i += 2
            continue;
        }
        if(input[i]==='/'&&input[i+1]==='/'){
            newPath += '/';
            i+=2
        }
        if(i<input.length)
        newPath += input[i]

    }
    if(newPath[newPath.length-1]==='/'&&newPath.length!==1){
        newPath = newPath.substring(0, newPath.length - 1);                    
    }
    return newPath
}

console.log(shortenPath('/home/./ubuntu/.././../bob/alice/'))


