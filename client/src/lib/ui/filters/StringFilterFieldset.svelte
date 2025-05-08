<script lang="ts">
  import type { StringFilter } from "$lib/trpc";
  import MultiSelect from "../MultiSelect.svelte";
  import FilterFieldset from "./FilterFieldset.svelte";

  let {
    legend,
    value = $bindable(),
    inItems,
    ninItems,
  }: {
    legend: string;
    value: StringFilter;
    inItems?: { label: string; value: string }[];
    ninItems?: { label: string; value: string }[];
  } = $props();
</script>

<FilterFieldset {legend}>
  <label class="input max-w-80">
    <span class="label">Включает</span>
    {#if inItems}
      <MultiSelect items={inItems} bind:value={value.in} />
    {:else}
      <input
        type="text"
        bind:value={
          () => value.in?.join(","),
          (v) => {
            value.in = v?.split(",");
          }
        }
      />
    {/if}
  </label>
  <label class="input max-w-80">
    <span class="label">Исключает</span>
    {#if ninItems}
      <MultiSelect items={ninItems} bind:value={value.nin} />
    {:else}
      <input
        type="text"
        bind:value={
          () => value.nin?.join(","),
          (v) => {
            value.nin = v?.split(",");
          }
        }
      />
    {/if}
  </label>
</FilterFieldset>
