<script>
    import Cars from "./Cars.svelte";
    import Characters from "./Characters.svelte";
    import { Direction, Entity, allCarPoses, translate } from "./framework.js";
    import { arrEquals, emptyMatrix, intsUpTo } from "./util.js";

    export let carDef;
    export let rows;
    export let cols;
    export let bounds;
    export let cellsToClear;
    export let startCell;

    const size = 150;
    const levelWidth = size * cols;
    const levelHeight = size * rows;
    $: levelTopLeftX = bounds.x / 2 - levelWidth / 2;
    $: levelTopLeftY = bounds.y / 2.2 - levelHeight / 2;

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
                for (const pos of car.poses) {
                    if (cell[0] === pos.x && cell[1] === pos.y) {
                        return false;
                    }
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
            // moving to a space not occupied by any vehicle except maybe the one grabbed
            const occupiedPoses = allCarPoses(
                cars.filter(aCarThatExists => aCarThatExists !== grabbedCar)
            );
            const cantGoThere = occupiedPoses.some(pos => pos.x === x && pos.y === y);

            if (!cantGoThere && canMoveCar(grabbedCar, dir, otherChar)) {
                return [char, grabbedCar];
            }
            return [];
        } else {
            // character moving to empty space
            const poses = allCarPoses(cars);
            if (poses.some(car => car.x === x && car.y === y)) {
                return [];
            }

            return [char];
        }
    }

    function canMoveCar(car, dir, otherChar) {
        for (const pos of car.poses) {
            const [x,y] = translate(pos, dir);

            if (x < 0 || y < 0) {
                return false;
            }

            if (x > cols - 1 || y > rows - 1) {
                return false;
            }

            const poses = allCarPoses(
                cars.filter(aCarThatExists => aCarThatExists !== car)
            );
            const cantGoThere = poses.some(pos => pos.x === x && pos.y === y)
                || otherChar.x === x && otherChar.y === y;

            if (cantGoThere) {
                return false;
            }
        }

        return true;
    }

    function toggleGrab(legion) {
        if (legion.grabbing) {
            unGrab(legion);
        } else {
            grab(legion);
        }
    }

    function grab(legion) {
        // get the thing in that loc
        const [x,y] = translate(legion, legion.orientation);

        for (const car of cars) {
            if (car.poses.find(pos => pos.x === x && pos.y === y) !== undefined) {
                legion.grabbing = true;
                car.grabbed = true;
                cars = cars;
                break;
            }
        }
    }

    function unGrab(legion) {
        legion.grabbing = false;

        for (const car of cars) {
            car.grabbed = false;
        }

        cars = cars;
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

    text {
        font-size: 100px;
        text-shadow: white 2px 2px;
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
    unGrab={unGrab}
    toggleGrab={toggleGrab}
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
    <text x={levelTopLeftX + levelWidth * 0.25} y={levelTopLeftY + levelHeight * 0.25}>
        Success!
    </text>
{/if}
