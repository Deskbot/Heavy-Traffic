<script>
	import Level from "./Level.svelte";
	import { intsUpTo } from "./util.js";

	let bounds = {
		x: Math.floor(window.innerWidth),
		y: Math.floor(window.innerHeight),
	};

	window.addEventListener("resize", () => {
		bounds.x = window.innerWidth;
		bounds.y = window.innerHeight;
	});

	let currentLevelNum = 1;
	const totalLevels = 8;
	const allcurrentLevelNums = intsUpTo(totalLevels).map(n => n + 1);

	function changeLevel(newLevel) {
		currentLevelNum = newLevel;
	}

	function explainControls() {
		const info = [
			"The goal is to clear the golden region.",
			"WASD to move",
			"shift to change character",
			"E to teleport red character to blue",
			"space (only as the red character) to grab and ungrab",
			"While grabbing, you can only move forwards or backwards in the direction you are facing."
		].join("\n");
		alert(info);
	}

	function loseFocus(e) {
		e.target.blur();
	}

	function restart() {
		const tmp = currentLevelNum;
		currentLevelNum = Infinity;
		setTimeout(() => currentLevelNum = tmp, 0);
	}
</script>

<style>
	#controls {
		display: flex;
		justify-content: space-between;
	}
	#level-controls {
		justify-content: flex-start;
	}
	#howto-button {
		align-self: flex-end;
	}
	button {
		cursor: pointer;
	}
	button:disabled {
		background-color: #DDD;
		color: #888;
		cursor: default;
	}
	select {
		outline: none;
	}
</style>

<div id="controls">
	<div id="level-controls">
		<select bind:value={currentLevelNum}>
			{#each allcurrentLevelNums as level}
				<option selected={currentLevelNum == level} value={level}>Level {level}</option>
			{/each}
		</select>
		<button on:click={() => currentLevelNum--} disabled={currentLevelNum == 1} on:click={loseFocus}>
			Previous
		</button>
		<button on:click={() => currentLevelNum++} disabled={currentLevelNum == totalLevels} on:click={loseFocus}>
			Next
		</button>
		<button on:click={restart} on:click={loseFocus}>
			Restart
		</button>
	</div>
	<button id="howto-button" on:click={explainControls} on:click={loseFocus}>
		How To
	</button>
</div>
<svg height="100%" width="100%">
	<defs>
		<filter id="shadow">
			<feDropShadow stdDeviation="3" flood-color="white" dx="0" dy="0"/>
		</filter>
	</defs>

	{#if currentLevelNum == 1}
		<Level
			carDef={[
				[1,2, 2, 1],
			]}
			bind:bounds={bounds}
			rows={4}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[2,0], [2,1], [2,2], [2,3], [2,4],
			]}
			startCell={[4,3]}
		/>
	{:else if currentLevelNum == 2}
		<Level
			carDef={[
				[2,2, 2, 1],
				[1,0, 1, 3],
			]}
			bind:bounds={bounds}
			rows={4}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[2,0], [2,1], [2,2], [2,3], [2,4],
			]}
			startCell={[3,3]}
		/>
	{:else if currentLevelNum == 3}
		<Level
			carDef={[
				[1,2, 2, 1],
				[3,0, 1, 3],
				[0,3, 2, 1]
			]}
			bind:bounds={bounds}
			rows={4}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[2,0], [2,1], [2,2], [2,3], [2,4],
			]}
			startCell={[3,3]}
		/>
	{:else if currentLevelNum == 4}
		<Level
			carDef={[
				[0,0, 1, 2],
				[4,0, 1, 2],
				[1,2, 3, 1],
				[0,3, 3, 1],
				[4,3, 1, 2],
			]}
			bind:bounds={bounds}
			rows={5}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[0,0], [0,1], [0,2], [0,3], [0,4],
			]}
			startCell={[2,4]}
		/>
	{:else if currentLevelNum == 5}
		<Level
			carDef={[
				[2,1, 2, 2],
				[1,2, 1, 3],
				[3,3, 2, 2],
				[0,0, 1, 1],
				[0,1, 2, 1],
			]}
			bind:bounds={bounds}
			rows={5}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[2,0], [2,1], [2,2], [2,3], [2,4],
			]}
			startCell={[2,4]}
		/>
	{:else if currentLevelNum == 6}
		<Level
			carDef={[
				[2,1, 2, 2],
				[4,2, 1, 3],
				[0,3, 2, 2],
				[0,1, 1, 1],
				[0,0, 1, 1],
			]}
			bind:bounds={bounds}
			rows={5}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[2,0], [2,1], [2,2], [2,3], [2,4],
			]}
			startCell={[2,4]}
		/>
	{:else if currentLevelNum == 7}
		<Level
			carDef={[
				[0,0, 1, 1],
				[0,3, 1, 1],
				[1,3, 1, 1],
				[1,0, 2, 1],
				[3,0, 1, 2],
				[2,1, 1, 3],
				[3,3, 2, 1],
				[3,4, 1, 1],
			]}
			bind:bounds={bounds}
			rows={5}
			cols={5}
			cellsToClear={[
				[1,0], [1,1], [1,2], [1,3], [1,4],
				[2,0], [2,1], [2,2], [2,3], [2,4],
			]}
			startCell={[2,4]}
		/>
	{:else if currentLevelNum == 8}
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
			bind:bounds={bounds}
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
