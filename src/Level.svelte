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

    for (const pos of carPoses) {
        carLocations[pos[0]][pos[1]] = true;
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
    poses={[
        [3,3]
    ]}
    spacing={size}
/>
<Characters
    canMove={canMove}
    maxX={levelTopLeftX + levelWidth}
    maxY={levelTopLeftY + levelHeight}
    minX={levelTopLeftX + size / 2}
    minY={levelTopLeftY + size / 2}
    spacing={size}
    startX={startCell[0]}
    startY={startCell[1]}
/>
