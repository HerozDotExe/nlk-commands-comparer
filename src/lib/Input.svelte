<script lang="ts">
    import { Textarea } from "$lib/components/ui/textarea/index.js";
    import { Button } from "$lib/components/ui/button/index.js";
    import { Input } from "$lib/components/ui/input/index.js";
    import { Label } from "$lib/components/ui/label/index.js";
    import { Checkbox } from "$lib/components/ui/checkbox/index.js";
    import { onMount } from "svelte";
    import { comparer, type Compared } from "$lib/comparer";

    let { compared = $bindable() }: { compared?: Compared } = $props();

    let cli1 = $state("");
    let cli2 = $state("");

    let rootPath1 = $state("");
    let rootPath2 = $state("");

    let error = $state("");

    let isWindows = $state(false);

    onMount(() => {
        cli1 = localStorage.getItem("lastCli1") || "";
        cli2 = localStorage.getItem("lastCli2") || "";
        rootPath1 = localStorage.getItem("rootPath1") || "";
        rootPath2 = localStorage.getItem("rootPath2") || "";
        isWindows = localStorage.getItem("isWindows") === "true";

        compare();
    });

    function parse(cli: string): [string, string[]] {
        const args = cli.split(" ");
        const command = args.shift();

        return [command!, args];
    }

    $inspect(compared);

    function compare() {
        if (
            cli1 !== "" &&
            cli2 !== "" &&
            rootPath1 !== "" &&
            rootPath2 !== ""
        ) {
            error = "";

            // remove accessToken
            const regex = /--accessToken ([^\ ]*)/gm;
            cli1 = cli1.replaceAll(regex, "--accessToken token");
            cli2 = cli2.replaceAll(regex, "--accessToken token");

            localStorage.setItem("lastCli1", cli1);
            localStorage.setItem("lastCli2", cli2);
            localStorage.setItem("rootPath1", rootPath1);
            localStorage.setItem("rootPath2", rootPath2);
            localStorage.setItem("isWindows", isWindows ? "true" : "false");

            const parsed1 = parse(cli1.replaceAll(rootPath1, "${root}"));
            const parsed2 = parse(cli2.replaceAll(rootPath2, "${root}"));

            compared = comparer(parsed1, parsed2, isWindows);
        } else {
            error = "Please fill out every fields.";
        }
    }
</script>

<header class="p-4">
    <div class="flex gap-8 flex-col">
        <h1 class="text-xl">First command</h1>
        <Textarea placeholder="CLI 1" class="h-40" bind:value={cli1} />
        <Input
            type="text"
            placeholder="Root Path"
            class="w-full"
            bind:value={rootPath1}
        />

        <h1 class="text-xl">Second command</h1>
        <Textarea placeholder="CLI 2" class="h-40" bind:value={cli2} />
        <Input
            type="email"
            placeholder="Root Path"
            class="w-full"
            bind:value={rootPath2}
        />
    </div>

    <div class="flex items-center space-x-2 justify-center mt-8">
        <Checkbox id="os" bind:checked={isWindows} />
        <Label for="os" class="w-full">Windows</Label>
    </div>

    <div class="mt-8 flex w-full justify-center">
        <Button class="w-100" onclick={compare}>Compare</Button>
    </div>
    <div class="mt-8">
        <p class="text-red-500 w-full text-center">{error}</p>
    </div>
</header>
