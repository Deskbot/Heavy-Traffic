<script>
    import Human from "./Human.svelte";
    import Legion from "./Legion.svelte";

    export let spacing;
    export let startX;
    export let startY;

    const human = {
        x: startX,
        y: startY,
    };
    const legion = {
        x: startX,
        y: startY,
    };

    let currentCharacter = human;

    function up() {
        currentCharacter.x -= spacing;
    }

    function left() {
        currentCharacter.y -= spacing;
    }

    function right() {
        currentCharacter.x += spacing;
    }

    function down() {
        currentCharacter.y += spacing;
    }

    window.addEventListener("keydown", (e) => {
        const eventMap = {
            w: up(),
            a: left(),
            s: down(),
            d: right(),
        }

        const whatToDo = eventMap[e.key]
        if (whatToDo) {
            whatToDo();
        }
    });
</script>

<Legion
    bind:x={legion.x}
    bind:y={legion.y}
/>
<Human
    bind:x={human.x}
    bind:y={human.y}
/>
