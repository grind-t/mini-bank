<script lang="ts">
  import type { NumberFilter } from "$lib/trpc";
  import FilterFieldset from "./FilterFieldset.svelte";

  let {
    legend,
    value = $bindable(),
  }: {
    legend: string;
    value: NumberFilter;
  } = $props();
</script>

<FilterFieldset {legend}>
  <label class="input">
    <span class="label">Не меньше</span>
    <input type="number" bind:value={value.gte} />
  </label>
  <label class="input">
    <span class="label">Не больше</span>
    <input type="number" bind:value={value.lte} />
  </label>
</FilterFieldset>
