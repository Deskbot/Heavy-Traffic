<script>
	import Board from "./Board.svelte";

	let middle = {
		x: Math.floor(window.innerWidth / 2),
		y: Math.floor(window.innerHeight / 2),
	};

	window.addEventListener("resize", () => {
		middle.x = window.innerWidth / 2;
		middle.y = window.innerHeight / 2;

		console.log(middle)
	});
</script>

<style>
	svg {
		background-color: #AABBEE;
	}
</style>

<svg height="100%" width="100%">
	<Board rows={5} cols={5} bind:offset={middle} />
</svg>
