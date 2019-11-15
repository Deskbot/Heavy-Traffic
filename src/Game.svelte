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
	<Board
		bind:offset={middle}
		rows={5}
		cols={5}
		cellsToClear={[
			[0,1], [1,1], [2,1], [3,1], [4,1],
			[0,2], [1,2], [2,2], [3,2], [4,2],
		]}
		startCell={[0,0]}
	/>
</svg>
