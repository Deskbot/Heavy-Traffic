<script>
    import { directionOfAngle } from "./util.js";

    export let x;
    export let y;
    export let orientation;

    const size = 30;
    const transform = `rotate(${directionOfAngle(orientation)}, ${x}, ${y})`
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

<g transform={transform}>
    <circle class="human" r={size} cx={x} cy={y} />
    <circle class="eye" r={size / 4} cx={x} cy={y - size} />
</g>
