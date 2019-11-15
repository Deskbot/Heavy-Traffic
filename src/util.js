export function arrEquals(arr1, arr2) {
    if (arr1.length !== arr2.length) {
        return false;
    }

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) {
            return false;
        }
    }

    return true;
}

export function intsUpTo(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(i);
    }

    return arr;
}
