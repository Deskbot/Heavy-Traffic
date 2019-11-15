import { Direction } from "./framework.js";

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

export function directionOfAngle(dir) {
    switch (dir) {
        case Direction.UP: return 0;
        case Direction.LEFT: return -90;
        case Direction.RIGHT: return 90;
        case Direction.DOWN: return 180;
    }
}

export function intsUpTo(n) {
    const arr = [];

    for (let i = 0; i < n; i++) {
        arr.push(i);
    }

    return arr;
}
