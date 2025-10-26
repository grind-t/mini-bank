<script lang="ts">
  import type { NumberFilter } from "$lib/trpc";
  import SignleSelect from "../SignleSelect.svelte";
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
      <SignleSelect items={gteItems} bind:value={value.gte} />
    {:else}
      <input
        type="number"
        bind:value={() => value.gte, (v) => (value.gte = v ?? undefined)}
      />
    {/if}
  </label>
  <label class={lteItems ? "select" : "input"}>
    <span class="label">Не больше</span>
    {#if lteItems}
      <SignleSelect items={lteItems} bind:value={value.lte} />
    {:else}
      <input
        type="number"
        bind:value={() => value.lte, (v) => (value.lte = v ?? undefined)}
      />
    {/if}
  </label>
</FilterFieldset>
