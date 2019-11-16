<script>
    import { directionOfAngle } from "./util.js";

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
        box-shadow: white;
    }

    .selected {
        filter:url(#shadow);
        /* -webkit-filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7));
        filter: drop-shadow( 3px 3px 2px rgba(0, 0, 0, .7)); */
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
