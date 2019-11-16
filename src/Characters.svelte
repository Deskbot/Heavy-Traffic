<script>
    import { createEventDispatcher } from 'svelte';
    import { Direction, Entity, translate } from "./framework.js";
    import Human from "./Human.svelte";
    import Legion from "./Legion.svelte";

    export let canMove;
    export let maxX;
    export let maxY;
    export let minX;
    export let minY;
    export let spacing;
    export let startX;
    export let startY;

    const dispatch = createEventDispatcher();

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
        type: Entity.Character,
        x: startX,
        y: startY,
    };
    let legion = {
        orientation: Direction.UP,
        type: Entity.Character,
        x: startX,
        y: startY,
    };

    let currentCharacter = human;
    let otherCharacter = legion;

    $: humanIsSelected = human === currentCharacter;
    $: legionIsSelected = legion === currentCharacter;

    function generalMove(character, direction) {
        const [x,y] = translate(character, direction);
        character.x = x;
        character.y = y;
    }

    function up() {
        if (!canMove(currentCharacter, Direction.UP)) {
            return;
        }
        if (currentCharacter.orientation !== Direction.UP) {
            currentCharacter.orientation = Direction.UP;
        }

        generalMove(currentCharacter, Direction.UP);
    }

    function left() {
        if (!canMove(currentCharacter, Direction.LEFT)) {
            return;
        }
        if (currentCharacter.orientation !== Direction.LEFT) {
            currentCharacter.orientation = Direction.LEFT;
        }

        generalMove(currentCharacter, Direction.LEFT);
    }

    function right() {
        if (!canMove(currentCharacter, Direction.RIGHT)) {
            return;
        }
        if (currentCharacter.orientation !== Direction.RIGHT) {
            currentCharacter.orientation = Direction.RIGHT;
        }

        generalMove(currentCharacter, Direction.RIGHT);
    }

    function down() {
        if (!canMove(currentCharacter, Direction.DOWN)) {
            return;
        }
        if (currentCharacter.orientation !== Direction.DOWN) {
            currentCharacter.orientation = Direction.DOWN;
        }

        generalMove(currentCharacter, Direction.DOWN);
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
    x={legion.x * spacing + minPos.x}
    y={legion.y * spacing + minPos.y}
/>
<Human
    bind:orientation={human.orientation}
    bind:selected={humanIsSelected}
    x={human.x * spacing + minPos.x}
    y={human.y * spacing + minPos.y}
/>
