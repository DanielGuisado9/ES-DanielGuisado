function oddishOrEvenish(num) {
    const sumOfDigits = num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    return sumOfDigits % 2 === 0 ? "Evenish" : "Oddish";
}

// Examples
console.log(oddishOrEvenish(43)); // "Oddish"
console.log(oddishOrEvenish(373)); // "Oddish"
console.log(oddishOrEvenish(4433)); // "Evenish"
console.log(oddishOrEvenish(121)); // "Evenish"
console.log(oddishOrEvenish(41)); // "Oddish"