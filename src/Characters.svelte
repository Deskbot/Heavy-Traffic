<script>
    import Human from "./Human.svelte";
    import Legion from "./Legion.svelte";

    export let startX;
    export let startY;

    function up() {

    }

    function left() {

    }

    function right() {

    }

    function down() {

    }

    window.addEventListener("keydown", (e) => {
        const eventMap = {
            w: up(),
            a: left(),
            s: down(),
            d: right(),
        }

        eventMap[e.key]();
    });
</script>

<Legion
    x={startX}
    y={startY}
/>
<Human
    x={startX}
    y={startY}
/>
