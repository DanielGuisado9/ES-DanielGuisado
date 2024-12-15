function fizzbuzz(n) {
    if (n % 15 === 0) return 'fizzbuzz';
    if (n % 3 === 0) return 'fizz';
    if (n % 5 === 0) return 'buzz';
    return n;
}
function fizzbuzz(n, conditions) {
    for (let key in conditions) {
        if (n % key === 0) return conditions[key];
    }
    return n;
}

const n = 100;
const conditions = {
    2: 'poo',
    3: 'fizz',
    5: 'buzz',
    15: 'foo'
};

console.log(fizzbuzz(n, conditions));
module.exports = fizzbuzz;