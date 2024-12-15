function drawSquare(size) {
    for (let i = 0; i < size; i++) {
        console.log('* '.repeat(size));
    }
}

function drawTriangle(size) {
    for (let i = 1; i <= size; i++) {
        console.log('* '.repeat(i));
    }
}

// Example usage:
drawSquare(5);
console.log('\n');
drawTriangle(5);