<script>
    export let height;
    export let width;
    export let x;
    export let y;

    const size = 100;
</script>

<style>
    rect {
        fill: #444444;
        stroke: black;
        stroke-width: 4px;
    }
</style>

<rect height={size} width={size} x={x} y={y}/>