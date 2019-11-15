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
        } else {
            generalMove(currentCharacter, "y", -spacing);
        }
    }

    function left() {
        if (currentCharacter.orientation !== Direction.LEFT) {
            currentCharacter.orientation = Direction.LEFT;
        } else {
            generalMove(currentCharacter, "x", -spacing);
        }
    }

    function right() {
        if (currentCharacter.orientation !== Direction.RIGHT) {
            currentCharacter.orientation = Direction.RIGHT;
        } else {
            generalMove(currentCharacter, "x", spacing);
        }
    }

    function down() {
        if (currentCharacter.orientation !== Direction.DOWN) {
            currentCharacter.orientation = Direction.DOWN;
        } else {
            generalMove(currentCharacter, "y", spacing);
        }
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
    bind:orientation={legion.orientation}
    bind:x={legion.x}
    bind:y={legion.y}
/>
<Human
    bind:orientation={human.orientation}
    bind:x={human.x}
    bind:y={human.y}
/>
