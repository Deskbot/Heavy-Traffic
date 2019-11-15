<script>
    import { directionOfAngle } from "./util.js";
    import Character from "./Character.svelte";

    export let orientation;
    export let x;
    export let y;
</script>

<Character
    colour={"red"}
    orientation={orientation}
    size={50}
    x={x}
    y={y}
/>
