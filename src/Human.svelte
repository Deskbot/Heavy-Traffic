<script>
    import { directionOfAngle } from "./util.js";
    import Character from "./Character.svelte";

    export let orientation;
    export let x;
    export let y;
</script>

<Character
    colour={"blue"}
    orientation={orientation}
    size={30}
    x={x}
    y={y}
/>
