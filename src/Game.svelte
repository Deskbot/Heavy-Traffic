<script>
	import Level from "./Level.svelte";

	let middle = {
		x: Math.floor(window.innerWidth / 2),
		y: Math.floor(window.innerHeight / 2),
	};

	window.addEventListener("resize", () => {
		middle.x = window.innerWidth / 2;
		middle.y = window.innerHeight / 2;
	});

	let levelNumber = 1;

	function changeLevel(newLevel) {
		levelNumber = newLevel;
	}
</script>

<style>
	svg {
		background-color: #AABBEE;
	}
</style>

<select on:change={(e) => changeLevel(parseInt(e.target.value))}>
	<option value="1">Level 1</option>
	<option value="2">Level 2</option>
	<option value="3">Level 3</option>
	<option value="4">Level 4</option>
</select>
<svg height="100%" width="100%">
	<defs>
		<filter id="shadow">
			<feDropShadow stdDeviation="3" flood-color="white" dx="0" dy="0"/>
		</filter>
	</defs>

	{#if levelNumber === 1}
		<Level
			carDef={[
				[1,2, 2, 1],
			]}
			bind:offset={middle}
			rows={5}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[2,0], [2,1], [2,2], [2,3], [2,4],
			]}
			startCell={[3,4]}
		/>
	{:else if levelNumber === 2}
		<Level
			carDef={[
				[0,0, 1, 2],
				[1,0, 2, 1],
				[3,0, 2, 1],
				[2,1, 1, 1],
				[2,2, 1, 1],
				[0,3, 1, 2],
				[1,2, 1, 3],
				[3,3, 2, 1],
			]}
			bind:offset={middle}
			rows={5}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[2,0], [2,1], [2,2], [2,3], [2,4],
			]}
			startCell={[3,4]}
		/>
	{/if}
</svg>
