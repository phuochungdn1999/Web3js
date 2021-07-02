const checkNumber = (number)=>{
    const numberToString = number.toString();
    let lastIndex = numberToString.length - 1;
    switch(numberToString[lastIndex]){
        case '1':
        case '3':
        case '5':
        case '7':
        case '9':
            return 'So nguyen le';
        case '0':
        case '2':
        case '4':
        case '6':
        case '8':
            return 'So nguyen chan';
        
    }
}

console.log(checkNumber(34))