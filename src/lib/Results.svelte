<script lang="ts">
    import type { Compared } from "./comparer";
    import Textarea from "./components/ui/textarea/textarea.svelte";
    import Hidable from "./Hidable.svelte";

    let { compared }: { compared?: Compared } = $props();
</script>

{#snippet commands()}
    <div class="flex gap-8">
        <Textarea readonly={true} value={compared?.commands.first} />
        <Textarea readonly={true} value={compared?.commands.second} />
    </div>
{/snippet}

{#snippet classPaths()}
    <h1>Same</h1>
    <Textarea readonly={true} value={compared?.cp.same.join("\n")} />
    <h1>Differents</h1>
    <div class="flex gap-8">
        <Textarea readonly={true} value={compared?.cp.different1.join("\n")} />
        <Textarea readonly={true} value={compared?.cp.different2.join("\n")} />
    </div>
{/snippet}

{#snippet argsWithoutValues()}
    <h1>Same</h1>
    <Textarea
        readonly={true}
        value={compared?.args.same.withoutValues.join("\n")}
    />
    <h1>Differents</h1>
    <div class="flex gap-8">
        <Textarea
            readonly={true}
            value={compared?.args.differents.withoutValues1.join("\n")}
        />
        <Textarea
            readonly={true}
            value={compared?.args.differents.withoutValues2.join("\n")}
        />
    </div>
{/snippet}

{#snippet argsWithValues()}
    <h1>Same</h1>
    <Textarea
        readonly={true}
        value={compared?.args.same.withValues.join("\n")}
    />
    <h1>Differents</h1>
    <div class="flex gap-8">
        <Textarea
            readonly={true}
            value={compared?.args.differents.withValues1.join("\n")}
        />
        <Textarea
            readonly={true}
            value={compared?.args.differents.withValues1.join("\n")}
        />
    </div>
{/snippet}

{#snippet otherArgs()}
    <h1>Same</h1>
    <Textarea readonly={true} value={compared?.args.same.other.join("\n")} />
    <h1>Differents</h1>
    <div class="flex gap-8">
        <Textarea
            readonly={true}
            value={compared?.args.differents.other1.join("\n")}
        />
        <Textarea
            readonly={true}
            value={compared?.args.differents.other2.join("\n")}
        />
    </div>
{/snippet}

<div class="flex w-full justify-center">
    <div class="flex gap-100">
        <h1 class="text-gray-200">First command</h1>
        <h1 class="text-gray-200">Second command</h1>
    </div>
</div>
<Hidable title="Commands" content={commands} />
<Hidable title="Class Paths" content={classPaths} />
<Hidable title="Args with included values" content={argsWithoutValues} />
<Hidable title="Args with separated values" content={argsWithValues} />
<Hidable title="Other args" content={otherArgs} />
