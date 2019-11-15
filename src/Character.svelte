<script>
    import { directionOfAngle } from "./util.js";

    export let colour;
    export let orientation;
    export let size;
    export let x;
    export let y;

    const rotate = `rotate(${directionOfAngle(orientation)}, ${x}, ${y})`
</script>

<style>
    .character {
        stroke: black;
        stroke-width: 2px;
    }

    .eye {
        fill: black;
    }
</style>

<g transform={rotate}>
    <circle class="character" r={size} cx={x} cy={y} fill={colour} />
    <circle class="eye" r={size / 4} cx={x} cy={y - size} />
</g>
