<script lang="ts">
	import { afterNavigate, goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { parseCacheControl, secondsToString } from '$lib/parse';

	$: cacheControl = $page.url.searchParams.get('cache') ?? '';
	$: parsed = parseCacheControl(selectedExample || cacheControl);

	afterNavigate(() => {
		selectedExample = '';
	});

	function enhance(e: SubmitEvent) {
		const data = new FormData(e.target as HTMLFormElement);
		// https://github.com/microsoft/TypeScript/issues/30584
		const params = new URLSearchParams(data as any).toString();
		goto(`?${params.toString()}`, { keepFocus: true });

		e.preventDefault();
	}

	function display(value: any) {
		if (typeof value === 'number') {
			return toDurationString(value);
		} else if (typeof value === 'boolean') {
			return value ? 'yes' : 'no';
		}
		return value;
	}

	function toDurationString(seconds: number) {
		return secondsToString(seconds);
	}

	let examples = [
		'max-age=1245',
		's-maxage=604873',
		'public, max-age=604800, immutable',
		'no-store'
	];

	let selectedExample = '';
</script>

<form on:submit={enhance}>
	<label for="cache">Cache-Control: </label>
	<input id="cache" value={cacheControl} name="cache" />
	<button>Explain</button>
</form>

<p>Or use one of these examples:</p>
{#each examples as example, idx}
	<div>
		<input id="example-{idx}" type="radio" value={example} bind:group={selectedExample} />
		<label for="example-{idx}">{example}</label>
	</div>
{/each}

<ul>
	{#each Object.entries(parsed) as [k, v]}
		<li>{k}: {display(v)}</li>
	{/each}
</ul>
