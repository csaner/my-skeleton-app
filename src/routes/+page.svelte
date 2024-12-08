<!-- YOU CAN DELETE EVERYTHING IN THIS PAGE -->
<script lang="ts">
	import { RangeSlider, AppBar  } from '@skeletonlabs/skeleton';
	import { LightSwitch } from '@skeletonlabs/skeleton';
	import { faker } from '@faker-js/faker';

	let value = 50;
	let max = 100;

	let numEvents = 0;
	import { writable } from 'svelte/store';

	const tableArr = Array(5)
		.fill(undefined)
		.map(() => faker.science.chemicalElement());

	const messages = writable([]);
	const evtSource = new EventSource("https://sse.dev/test");
	evtSource.onmessage = function(event) {
		//console.log(event);
		var dataobj = JSON.parse(event.data);
		messages.update(arr => arr.concat(dataobj));
		numEvents += 1
	}
</script>


<div class="container h-full mx-auto my-6 flex  justify-center items-center">
	<div class="space-y-5">
		<AppBar gridColumns="grid-cols-2" slotDefault="place-self-center" slotTrail="place-content-end" >
			<h1 class="h1 ">Titel</h1>
			<svelte:fragment slot="trail"><LightSwitch /></svelte:fragment>
		</AppBar>
		
		<h1 class="h1">Let's get cracking bones!</h1>
		<p>Start by exploring:</p>
		<ul>
			<li><code class="code">/src/routes/+layout.svelte</code> - barebones layout</li>
			<li><code class="code">/src/app.postcss</code> - app wide css</li>
			<li>
				<code class="code">/src/routes/+page.svelte</code> - this page, you can replace the contents
			</li>
		</ul>

		<div class="card card-hover">
			<header class="card-header">(header)</header>
			<section class="p-4">
				<label class="label">
					<span>Input</span>
					<input class="input" type="text" placeholder="Input" />
				</label>
				<label class="label">
					<span>Select</span>
					<select class="select">
						<option value="1">Option 1</option>
						<option value="2">Option 2</option>
						<option value="3">Option 3</option>
						<option value="4">Option 4</option>
						<option value="5">Option 5</option>
					</select>
				</label>
				<label class="label">
					<span>Textarea</span>
					<textarea class="textarea" rows="4" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit." />
				</label>
				<div class="space-y-2">
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" checked />
						<p>Option 1</p>
					</label>
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" />
						<p>Option 2</p>
					</label>
					<label class="flex items-center space-x-2">
						<input class="checkbox" type="checkbox" />
						<p>Option 3</p>
					</label>
				</div>
				<RangeSlider name="range-slider" bind:value={value} max={max} step={10} ticked>
					<div class="flex justify-between items-center">
						<div class="font-bold">Label</div>
						<div class="text-xs">{value} / {max}</div>
					</div>
				</RangeSlider>
			</section>
			<footer>
				<div class="text-center py-4">
					<p><span class="badge variant-filled">{numEvents}</span>
					{$messages.at(-1)?.msg} - {$messages.at(-1)?.now}</p>
				</div>
				
			</footer>
		</div>

		
		<!-- Responsive Container (recommended) -->
		<div class="table-container">
			<!-- Native Table Element -->
			<table class="table table-hover table-interactive">
				<thead>
					<tr>
						<th>Name</th>
						<th>Symbol</th>
						<th>Weight</th>
					</tr>
				</thead>
				<tbody>
					{#each tableArr as row, i}
						<tr>
							<td>{row.name}</td>
							<td>{row.symbol}</td>
							<td><span class="badge variant-soft-primary">{row.atomicNumber}</span></td>
						</tr>
					{/each}
				</tbody>
				<tfoot>
					<tr>
						<th colspan="2">Calculated Total Weight</th>
						<td>{tableArr.length} Elements</td>
					</tr>
				</tfoot>
			</table>
		</div>

		
		
		<!--
		{#each $messages as m}
			<p class="items-center">{numEvents} {m.msg} - {m.now}</p>
		{/each}
		-->
	</div>
</div>
