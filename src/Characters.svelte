<script>
    import { Direction } from "./framework.js";
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
        orientation: Direction.UP,
        x: startX,
        y: startY,
    };
    let legion = {
        orientation: Direction.UP,
        x: startX,
        y: startY,
    };

    let currentCharacter = human;
    let otherCharacter = legion;

    $: humanIsSelected = human === currentCharacter;
    $: legionIsSelected = legion === currentCharacter;

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
        if (currentCharacter.orientation !== Direction.UP) {
            currentCharacter.orientation = Direction.UP;
        }

        generalMove(currentCharacter, "y", -spacing);
    }

    function left() {
        if (currentCharacter.orientation !== Direction.LEFT) {
            currentCharacter.orientation = Direction.LEFT;
        }

        generalMove(currentCharacter, "x", -spacing);
    }

    function right() {
        if (currentCharacter.orientation !== Direction.RIGHT) {
            currentCharacter.orientation = Direction.RIGHT;
        }

        generalMove(currentCharacter, "x", spacing);
    }

    function down() {
        if (currentCharacter.orientation !== Direction.DOWN) {
            currentCharacter.orientation = Direction.DOWN;
        }

        generalMove(currentCharacter, "y", spacing);
    }

    function swapCharacter() {
        let imSomeWhatOfAComputerScientistMyself = currentCharacter;
        currentCharacter = otherCharacter;
        otherCharacter = imSomeWhatOfAComputerScientistMyself;
    }

    function teleport() {
        if (currentCharacter === legion) {
            legion.x = human.x;
            legion.y = human.y;
        }
    }

    window.addEventListener("keydown", (e) => {
        if (e.shiftKey) {
            swapCharacter();
            return;
        }

        const eventMap = {
            w: () => up(),
            a: () => left(),
            s: () => down(),
            d: () => right(),

            e: () => teleport(),
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
    bind:orientation={legion.orientation}
    bind:selected={legionIsSelected}
    bind:x={legion.x}
    bind:y={legion.y}
/>
<Human
    bind:orientation={human.orientation}
    bind:selected={humanIsSelected}
    bind:x={human.x}
    bind:y={human.y}
/>
