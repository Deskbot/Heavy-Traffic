<script>
    export let grabbed;
    export let height;
    export let width;
    export let x;
    export let y;
</script>

<style>
    rect {
        fill: #444444;
        stroke: black;
        stroke-width: 4px;
    }

    .grabbed {
        fill: black;
    }
</style>

<rect class:grabbed={grabbed} height={height} width={width} x={x} y={y}/>