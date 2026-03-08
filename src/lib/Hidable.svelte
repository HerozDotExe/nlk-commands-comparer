<script lang="ts">
    import * as Accordion from "$lib/components/ui/accordion/index.js";

    let { title, content } = $props();
</script>

<div class="flex w-full justify-center">
    <Accordion.Root type="multiple" class="w-full sm:max-w-[80%]">
        <Accordion.Item>
            <Accordion.Trigger class="text-xl">{title}</Accordion.Trigger>
            <Accordion.Content class="flex flex-col gap-4 text-balance">
                {@render content()}
            </Accordion.Content>
        </Accordion.Item>
    </Accordion.Root>
</div>
