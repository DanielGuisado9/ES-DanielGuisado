function invert(obj) {
    const invertedObj = {};
    for (const [key, value] of Object.entries(obj)) {
        invertedObj[value] = key;
    }
    return invertedObj;
}

console.log(invert({ "z": "q", "w": "f" })); 
console.log(invert({ "a": 1, "b": 2, "c": 3 })); 
console.log(invert({ "zebra": "koala", "horse": "camel" })); 
