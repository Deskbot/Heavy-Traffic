<script>
    import Car from "./Car.svelte";

    export let maxX;
    export let maxY;
    export let minX;
    export let minY;
    export let poses;
    export let spacing;

    const size = 100;
</script>

<style>
    rect {
        fill: black;
    }
</style>

{#each poses as pos}
    <Car
        height={size}
        width={size}
        x={(pos[0]) * spacing + minX + (spacing / 2 - size / 2)}
        y={(pos[1]) * spacing + minY + (spacing / 2 - size / 2)}
    />
{/each}