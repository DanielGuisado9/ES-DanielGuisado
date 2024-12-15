function danceConvert(pin) {
    const danceMoves = ["Shimmy", "Shake", "Pirouette", "Slide", "Box Step", "Headspin", "Dosado", "Pop", "Lock", "Arabesque"];
    
    if (!/^\d{4}$/.test(pin)) {
        return "Invalid input.";
    }

    let result = [];
    for (let i = 0; i < pin.length; i++) {
        let digit = parseInt(pin[i]);
        let moveIndex = (digit + i) % danceMoves.length;
        result.push(danceMoves[moveIndex]);
    }

    return result;
}

// Examples
console.log(danceConvert("0000")); 
console.log(danceConvert("3856")); 
console.log(danceConvert("9999")); 
console.log(danceConvert("32a1")); 