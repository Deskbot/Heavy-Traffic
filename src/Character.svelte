<script>
    import { directionOfAngle } from "./util.js";

    export let colour;
    export let orientation;
    export let size;
    export let x;
    export let y;

    $: rotate = `rotate(${directionOfAngle(orientation)}, ${x}, ${y})`;
    $: translate = `translate(${x}, ${y})`;
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

<g transform="{rotate} {translate}" >
    <circle class="character" r={size} fill={colour} />
    <circle class="eye" r={size / 4} cy={size} />
</g>
