<script>
    import { createEventDispatcher } from 'svelte';
    import { Direction, Entity, isParallel, translate } from "./framework.js";
    import Human from "./Human.svelte";
    import Legion from "./Legion.svelte";

    export let canMove;
    export let toggleGrab;
    export let unGrab;
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
        grabbing: false,
        orientation: Direction.UP,
        type: Entity.Character,
        x: startX,
        y: startY,
    };

    let currentCharacter = human;
    let otherCharacter = legion;

    $: humanIsSelected = human === currentCharacter;
    $: legionIsSelected = legion === currentCharacter;

    function canRotate(char, dir) {
        return !(char.grabbing && !isParallel(char.orientation, dir));
    }

    function generalMove(character, direction) {
        if (character === legion) {
            if (canRotate(character, direction)) {
                currentCharacter.orientation = direction;
            } else {
                return;
            }
        } else if (character === human) {
            currentCharacter.orientation = direction;
        }

        const toMove = canMove(currentCharacter, direction, otherCharacter);

        for (const mover of toMove) {
            const [x,y] = translate(mover, direction);
            mover.x = x;
            mover.y = y;

            if ("poses" in mover) {
                for (const pos of mover.poses) {
                    const [x,y] = translate(pos, direction);
                    pos.x = x;
                    pos.y = y;
                }
            }
        }

        if (toMove.length > 0) {
            dispatch("moved");
        }
    }

    function up() {
        generalMove(currentCharacter, Direction.UP);
    }

    function left() {
        generalMove(currentCharacter, Direction.LEFT);
    }

    function right() {
        generalMove(currentCharacter, Direction.RIGHT);
    }

    function down() {
        generalMove(currentCharacter, Direction.DOWN);
    }

    function swapCharacter() {
        unGrab(legion);
        let imSomeWhatOfAComputerScientistMyself = currentCharacter;
        currentCharacter = otherCharacter;
        otherCharacter = imSomeWhatOfAComputerScientistMyself;
    }

    function teleport() {
        unGrab(legion);
        legion.x = human.x;
        legion.y = human.y;
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
            " ": () => currentCharacter === legion && toggleGrab(legion),
        }

        const whatToDo = eventMap[e.key]
        if (whatToDo) {
            whatToDo();

            // update
            currentCharacter = currentCharacter;
            human = human;
            legion = legion;
        }
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
