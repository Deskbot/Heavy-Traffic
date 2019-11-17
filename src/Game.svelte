<script>
	import Level from "./Level.svelte";
	import { intsUpTo } from "./util.js";

	let middle = {
		x: Math.floor(window.innerWidth / 2),
		y: Math.floor(window.innerHeight / 2),
	};

	window.addEventListener("resize", () => {
		middle.x = window.innerWidth / 2;
		middle.y = window.innerHeight / 2;
	});

	let currentLevelNum = 1;
	const totalLevels = 4;
	const allcurrentLevelNums = intsUpTo(totalLevels).map(n => n + 1);

	function changeLevel(newLevel) {
		currentLevelNum = newLevel;
	}

	function explainControls() {
		const info = [
			"The goal is to clear the golden region.",
			"wasd to move",
			"shfit to change character",
			"e to teleport red character to blue",
			"space to grab and ungrab",
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

<div id="controls" on:click={loseFocus}>
	<div id="level-controls">
		<select on:change={e => changeLevel(e.target.value)}>
			{#each allcurrentLevelNums as level}
				<option selected={currentLevelNum === level} value={level}>Level {level}</option>
			{/each}
		</select>
		<button on:click={() => currentLevelNum--} disabled={currentLevelNum === 1}>
			Previous
		</button>
		<button on:click={() => currentLevelNum++} disabled={currentLevelNum === totalLevels}>
			Next
		</button>
		<button on:click={restart} on:click={loseFocus}>
			Restart
		</button>
	</div>
	<button id="howto-button" on:click={explainControls}>
		How To
	</button>
</div>
<svg height="100%" width="100%">
	<defs>
		<filter id="shadow">
			<feDropShadow stdDeviation="3" flood-color="white" dx="0" dy="0"/>
		</filter>
	</defs>

	{#if currentLevelNum === 1}
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
	{:else if currentLevelNum === 2}
		<Level
			carDef={[
				[1,2, 2, 1],
				[3,0, 1, 3],
				[0,3, 2, 1]
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
	{:else if currentLevelNum === 3}
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
