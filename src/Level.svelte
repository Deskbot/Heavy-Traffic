<script>
    import Cars from "./Cars.svelte";
    import Characters from "./Characters.svelte";
    import { Direction, Entity, translate } from "./framework.js";
    import { arrEquals, emptyMatrix, intsUpTo } from "./util.js";

    export let carPoses;
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

    const carLocations = emptyMatrix(rows, cols);
    let cars = [];

    let grabbing;
    $: grabbedCar = cars.find(car => car.grabbed);

    for (const pos of carPoses) {
        carLocations[pos[0]][pos[1]] = true;
        cars.push({
            x: pos[0],
            y: pos[1],
            grabbed: false,
        })
    }

    function canMove(char, dir) {
        let [x,y] = translate(char, dir);

        if (x < 0 || y < 0) {
            return false;
        }

        if (x > cols - 1 || y > rows - 1) {
            return false;
        }

        return !carLocations[x][y]; // nothing here
    }

    function grab(legion) {
        if (legion.grabbing) {
            legion.grabbing = false;

            for (const car of cars) {
                car.grabbed = false;
            }

            return;
        }

        // get the thing in that loc
        const [x,y] = translate(legion, legion.orientation);

        if (carLocations[x][y]) {
            legion.grabbing = true;

            const car = cars.find(car => car.x === x && car.y === y);
            car.grabbed = true;
            cars = cars;
        }
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
            class:toClear={cellsToClear.some(cell => arrEquals(cell, [rowNum, colNum]))}
            height={size}
            width={size}
            x={colNum * size + levelTopLeftX}
            y={rowNum * size + levelTopLeftY}
        />
    {/each}
{/each}

<Cars
    maxX={levelTopLeftX + levelWidth}
    maxY={levelTopLeftY + levelHeight}
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
    spacing={size}
    startX={startCell[0]}
    startY={startCell[1]}
/>
