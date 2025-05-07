<script lang="ts">
  import type { NumberFilter } from "$lib/trpc";
  import FilterFieldset from "./FilterFieldset.svelte";

  let {
    legend,
    value = $bindable(),
    gteItems,
    lteItems,
  }: {
    legend: string;
    value: NumberFilter;
    gteItems?: { label: string; value: number }[];
    lteItems?: { label: string; value: number }[];
  } = $props();
</script>

<FilterFieldset {legend}>
  <label class={gteItems ? "select" : "input"}>
    <span class="label">Не меньше</span>
    {#if gteItems}
      <select bind:value={value.gte}>
        <option value={undefined}></option>
        {#each gteItems as item}
          <option value={item.value}>{item.label}</option>
        {/each}
      </select>
    {:else}
      <input type="number" bind:value={value.gte} />
    {/if}
  </label>
  <label class={lteItems ? "select" : "input"}>
    <span class="label">Не больше</span>
    {#if lteItems}
      <select bind:value={value.lte}>
        <option value={undefined}></option>
        {#each lteItems as item}
          <option value={item.value}>{item.label}</option>
        {/each}
      </select>
    {:else}
      <input type="number" bind:value={value.lte} />
    {/if}
  </label>
</FilterFieldset>
