function isSimilar(obj1, obj2) {
    if (typeof obj1 !== typeof obj2) return false;

    if (Array.isArray(obj1) && Array.isArray(obj2)) {
        if (obj1.length !== obj2.length) return false;
        for (let i = 0; i < obj1.length; i++) {
            if (!isSimilar(obj1[i], obj2[i])) return false;
        }
        return true;
    }

    if (obj1 instanceof Object && obj2 instanceof Object) {
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) return false;
        for (let key of keys1) {
            if (!keys2.includes(key) || !isSimilar(obj1[key], obj2[key])) return false;
        }
        return true;
    }

    return obj1 === obj2;
}

console.log(isSimilar(["cars", "trains", ["roads", ["railways"]]], ["cars", "trains", ["roads", ["railways"]]])); 
console.log(isSimilar({"pairs": [[3, 5], [1, 7], [2, 6], [0, 8]]}, {"pairs": [[3, 5], [1, 1], [2, 6], [0, 8]]})); 
console.log(isSimilar({"Sam": 4, "Elliot": 4, "equality": true}, {"Sam": 4, "Elliot": 5, "equality": false})); 
console.log(isSimilar([{"D": [0, 3]}, {"X": [1, 3]}, {"D": [3, 7]}], [{"D": [0, 3]}, {"X": [1, 3]}, {"D": [3, 7]}])); 