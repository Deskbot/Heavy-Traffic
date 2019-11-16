<script>
    import { directionOfAngle } from "./framework.js";

    export let colour;
    export let orientation;
    export let selected;
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
    .selected {
        filter:url(#shadow);
    }
</style>

<g transform="{rotate} {translate}" >
    <circle
        class="character"
        fill={colour}
        r={size}
        class:selected={selected}
    />
    <circle class="eye" r={size / 4} cy={-size} />
</g>
