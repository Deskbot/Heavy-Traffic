<script>
    export let x;
    export let y;

    const size = 30;
</script>

<style>
    .human {
        fill: blue;
        stroke: black;
        stroke-width: 2px;
    }

    .eye {
        fill: black;
    }
</style>

<g>
    <circle class="human" r={size} cx={x} cy={y} />
    <circle class="eye" r={size / 4} cx={x} cy={y - size} />
</g>
