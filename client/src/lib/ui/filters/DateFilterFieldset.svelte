<script lang="ts">
  import type { DateFilter } from "$lib/trpc";
  import FilterFieldset from "./FilterFieldset.svelte";

  let {
    legend,
    value = $bindable(),
  }: {
    legend: string;
    value: DateFilter;
  } = $props();
</script>

<FilterFieldset {legend}>
  <label class="input">
    <span class="label">Не меньше</span>
    <input
      type="date"
      bind:value={
        () => value.gte?.toISOString().split("T")[0],
        (v) => {
          value.gte = v ? new Date(v) : undefined;
        }
      }
    />
  </label>
  <label class="input">
    <span class="label">Не больше</span>
    <input
      type="date"
      bind:value={
        () => value.lte?.toISOString().split("T")[0],
        (v) => {
          value.lte = v ? new Date(v) : undefined;
        }
      }
    />
  </label>
</FilterFieldset>
