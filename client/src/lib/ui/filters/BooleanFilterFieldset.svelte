<script lang="ts">
  import type { BooleanFilter } from "$lib/trpc";
  import FilterFieldset from "./FilterFieldset.svelte";

  let {
    legend,
    value = $bindable(),
  }: {
    legend: string;
    value: BooleanFilter;
  } = $props();

  const isChecked = $derived(!!value.eq);
  const isIndeterminate = $derived(value.eq === undefined);
</script>

<FilterFieldset {legend}>
  <label class="label">
    <input
      indeterminate={isIndeterminate}
      checked={value.eq}
      onchange={() => {
        value.eq = isIndeterminate ? false : isChecked ? undefined : true;
      }}
      type="checkbox"
      class="checkbox"
    />
    {#if isIndeterminate}
      Не важно
    {:else if isChecked}
      Да
    {:else}
      Нет
    {/if}
  </label>
</FilterFieldset>
