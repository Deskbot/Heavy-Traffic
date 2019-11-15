<script>
    import Characters from "./Characters.svelte";
    import { arrEquals, intsUpTo } from "./util.js";

    export let rows;
    export let cols;
    export let offset;
    export let cellsToClear;
    export let startCell;

    const size = 150;
    const levelWidth = size * cols;
    const levelHeight = size * rows;
    const levelTopLeftX = offset.x - levelHeight / 2;
    const levelTopLeftY = offset.y - levelWidth / 2;

    const rowsArr = intsUpTo(rows);
    const colsArr = intsUpTo(cols);
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
</style>

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

<Characters
    spacing={size}
    startX={startCell[0] + levelTopLeftX + size / 2}
    startY={startCell[1] + levelTopLeftY + size / 2}
/>
