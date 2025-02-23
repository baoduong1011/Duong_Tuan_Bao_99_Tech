// Option 1
function sumNumbersFrom1toN(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// Option 2
function sumNumbersFrom1toN(n) {
    if (n === 1) return 1;
    return n + sumNumbersFrom1toN(n - 1);
}

// Option 2
function sumNumbersFrom1toN(n) {
    return (n * (n + 1)) / 2;
}