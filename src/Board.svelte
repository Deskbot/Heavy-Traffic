<script>
    import { arrEquals, intsUpTo } from "./util.js";

    export let rows;
    export let cols;
    export let offset;
    export let cellsToClear;

    const size = 150;
    const boardWidth = size * cols;
    const boardHeight = size * rows;

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
            width={size}
            height={size}
            x={colNum * size + offset.x - boardHeight / 2}
            y={rowNum * size + offset.y - boardWidth / 2}
        />
    {/each}
{/each}
