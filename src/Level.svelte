<script>
    import Cars from "./Cars.svelte";
    import Characters from "./Characters.svelte";
    import { Direction, Entity, translate } from "./framework.js";
    import { arrEquals, emptyMatrix, intsUpTo } from "./util.js";

    export let carDef;
    export let rows;
    export let cols;
    export let offset;
    export let cellsToClear;
    export let startCell;

    const size = 150;
    const levelWidth = size * cols;
    const levelHeight = size * rows;
    $: levelTopLeftX = offset.x - levelHeight / 2;
    $: levelTopLeftY = offset.y - levelWidth / 2;

    const rowsArr = intsUpTo(rows);
    const colsArr = intsUpTo(cols);

    let cars = [];

    $: grabbedCar = cars.find(car => car.grabbed);

    for (const car of carDef) {
        const [x, y, across, down] = car;
        const poses = [];

        let partX = x;
        let partY = y;

        for (let i = 0; i < across; i++) {
            for (let i = 0; i < down; i++) {
                poses.push({
                    x: partX,
                    y: partY,
                });

                partY++;
            }
            partY = y;
            partX++;
        }

        cars.push({
            poses,
            x,
            y,
            across,
            down,
            grabbed: false,
        });
    }

    $: win = (() => {
        for (const cell of cellsToClear) {
            for (const car of cars) {
                if (cell[0] === car.x && cell[1] === car.y) {
                    return false;
                }
            }
        }
        return true;
    })();

    function canMove(char, dir, otherChar) {
        let [x,y] = translate(char, dir);

        if (x < 0 || y < 0) {
            return [];
        }

        if (x > cols - 1 || y > rows - 1) {
            return [];
        }

        if (char.grabbing) {
            if (canMoveCar(grabbedCar, dir, otherChar)) {
                return [char, grabbedCar];
            }
            return [];
        } else {
            // character moving to empty space
            const allCarPoses = cars
                .map(car => car.poses)
                .reduce((prev, curr) => prev.concat(curr), []);
            if (allCarPoses.some(car => car.x === x && car.y === y)) {
                return [];
            }

            return [char];
        }
    }

    function canMoveCar(car, dir, otherChar) {
        let [x,y] = translate(car, dir);

        if (x < 0 || y < 0) {
            return false;
        }

        if (x > cols - 1 || y > rows - 1) {
            return false;
        }

        return !cars.some(car => car.x === x && car.y === y)
            && !(otherChar.x === x && otherChar.y === y);
    }

    function grab(legion) {
        if (legion.grabbing) {
            legion.grabbing = false;

            for (const car of cars) {
                car.grabbed = false;
            }

            cars = cars;

            return;
        }

        // get the thing in that loc
        const [x,y] = translate(legion, legion.orientation);

        const car = cars.find(car => car.x === x && car.y === y);
        if (car !== undefined) {
            legion.grabbing = true;
            car.grabbed = true;
            cars = cars;
        }
    }

    function forceCarsUpdate() {
        cars = cars;
    }
</script>

<style>
    rect {
        fill: #888888;
        stroke: black;
        stroke-width: 2px;
    }

    .toClear {
        fill: #EEBB00;
    }

    #outer {
        stroke: black;
        stroke-width: 10px;
    }
</style>

<rect id="outer" height={size * rows} width={size * cols} x={levelTopLeftX} y={levelTopLeftY}/>

{#each colsArr as colNum}
    {#each rowsArr as rowNum}
        <rect
            class:toClear={cellsToClear.some(cell => arrEquals(cell, [colNum, rowNum]))}
            height={size}
            width={size}
            x={colNum * size + levelTopLeftX}
            y={rowNum * size + levelTopLeftY}
        />
    {/each}
{/each}

<Cars
    minX={levelTopLeftX}
    minY={levelTopLeftY}
    bind:cars={cars}
    spacing={size}
/>
<Characters
    canMove={canMove}
    grab={grab}
    maxX={levelTopLeftX + levelWidth}
    maxY={levelTopLeftY + levelHeight}
    minX={levelTopLeftX + size / 2}
    minY={levelTopLeftY + size / 2}
    on:moved={forceCarsUpdate}
    spacing={size}
    startX={startCell[0]}
    startY={startCell[1]}
/>
{#if win}
    <text x={levelTopLeftX + levelWidth / 2} y={levelTopLeftY + levelHeight / 2}>
        A Winner is You!
    </text>
{/if}
