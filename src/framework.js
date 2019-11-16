export const Direction = {
    UP: Symbol("UP"),
    LEFT: Symbol("LEFT"),
    RIGHT: Symbol("RIGHT"),
    DOWN: Symbol("DOWN"),
};

export const Entity = {
    Car: Symbol("Car"),
    Character: Symbol("Character"),
};

export function directionOfAngle(dir) {
    switch (dir) {
        case Direction.UP: return 0;
        case Direction.LEFT: return -90;
        case Direction.RIGHT: return 90;
        case Direction.DOWN: return 180;
    }
}

export function translate(pos, dir) {
    const map = {
        [Direction.UP]: [0, -1],
        [Direction.LEFT]: [-1, 0],
        [Direction.RIGHT]: [1, 0],
        [Direction.DOWN]: [0, 1],
    };

    const change = map[dir];

    return [
        pos.x + change[0],
        pos.y + change[1],
    ];
}