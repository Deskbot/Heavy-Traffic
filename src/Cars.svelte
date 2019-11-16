<script>
    import Car from "./Car.svelte";

    export let minX;
    export let minY;
    export let cars;
    export let spacing;

    const size = 100;
</script>

{#each cars as car}
    <Car
        grabbed={car.grabbed}
        height={size}
        width={size}
        x={car.x * spacing + minX + (spacing / 2 - size / 2)}
        y={car.y * spacing + minY + (spacing / 2 - size / 2)}
    />
{/each}