<script lang="ts">
	import "./app.css";
	import Input from "$lib/Input.svelte";
	import Results from "$lib/Results.svelte";
    import type { Compared } from "$lib/comparer";

	let compared: Compared | undefined = $state();
</script>

<Input bind:compared></Input>
<Results compared={compared}></Results>
