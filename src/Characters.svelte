<script>
    import Human from "./Human.svelte";
    import Legion from "./Legion.svelte";

    export let maxX;
    export let maxY;
    export let minX;
    export let minY;
    export let spacing;
    export let startX;
    export let startY;

    const maxPos = {
        x: maxX,
        y: maxY,
    };

    const minPos = {
        x: minX,
        y: minY,
    };

    let human = {
        x: startX,
        y: startY,
    };
    let legion = {
        x: startX,
        y: startY,
    };

    let currentCharacter = human;
    let otherCharacter = legion;

    function generalMove(character, axis, distance) {
        const finalMagnitude = character[axis] + distance;

        if (finalMagnitude > maxPos[axis]) {
            return;
        }

        if (finalMagnitude < minPos[axis]) {
            return;
        }

        character[axis] = finalMagnitude;
    }

    function up() {
        generalMove(currentCharacter, "y", -spacing);
    }

    function left() {
        generalMove(currentCharacter, "x", -spacing);
    }

    function right() {
        generalMove(currentCharacter, "x", spacing);
    }

    function down() {
        generalMove(currentCharacter, "y", spacing);
    }

    function swapCharacter() {
        let iTooAmAComputerScientist = currentCharacter;
        currentCharacter = otherCharacter;
        otherCharacter = iTooAmAComputerScientist;
    }

    window.addEventListener("keydown", (e) => {
        const eventMap = {
            w: () => up(),
            a: () => left(),
            s: () => down(),
            d: () => right(),
        }

        if (e.shiftKey) {
            swapCharacter();
            return;
        }

        const whatToDo = eventMap[e.key]
        if (whatToDo) {
            whatToDo();

            // update
            currentCharacter = currentCharacter;
            human = human;
            legion = legion;
        }

        console.log(currentCharacter, minPos, maxPos)
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
