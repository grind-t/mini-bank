<script lang="ts">
  import type { StringFilter } from "$lib/trpc";
  import FilterFieldset from "./FilterFieldset.svelte";

  let {
    legend,
    value = $bindable(),
  }: {
    legend: string;
    value: StringFilter;
  } = $props();
</script>

<FilterFieldset {legend}>
  <label class="input">
    <span class="label">Включает</span>
    <input
      type="text"
      bind:value={
        () => value.in?.join(","),
        (v) => {
          value.in = v?.split(",");
        }
      }
    />
  </label>
  <label class="input">
    <span class="label">Исключает</span>
    <input
      type="text"
      bind:value={
        () => value.nin?.join(","),
        (v) => {
          value.nin = v?.split(",");
        }
      }
    />
  </label>
</FilterFieldset>
