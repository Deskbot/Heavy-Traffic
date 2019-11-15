<script>
    import { intsUpTo } from "./util.js";

    export let rows;
    export let cols;
    export let offset;

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
</style>

{#each rowsArr as rowNum}
    {#each colsArr as colNum}
        <rect
            width={size}
            height={size}
            x={rowNum * size + offset.x - boardHeight / 2}
            y={colNum * size + offset.y - boardWidth / 2}
        />
    {/each}
{/each}
