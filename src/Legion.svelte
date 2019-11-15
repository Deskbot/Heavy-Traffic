<script>
    import { directionOfAngle } from "./util.js";

    export let orientation;
    export let x;
    export let y;

    const size = 50;
    const rotate = `rotate(${directionOfAngle(orientation)}, ${x}, ${y})`
</script>

<style>

    .legion {
        fill: red;
        stroke: black;
        stroke-width: 2px;
    }

    .eye {
        fill: black;
    }
</style>

<g transform={rotate}>
    <circle class="legion" r={size} cx={x} cy={y} />
    <circle class="eye" r={size / 4} cx={x} cy={y - size} />
</g>
