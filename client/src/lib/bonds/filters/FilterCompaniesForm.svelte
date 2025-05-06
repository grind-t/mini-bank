<script lang="ts">
  import type { BondListFilter } from "$lib/trpc";
  import StringFilterFieldset from "$lib/ui/filters/StringFilterFieldset.svelte";

  let {
    filter,
    onSubmit,
  }: {
    filter: BondListFilter;
    onSubmit: (filter: BondListFilter) => void;
  } = $props();

  let sector = $state(filter.sector || {});
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    onSubmit({
      ...filter,
      sector,
    });
  }}
>
  <h2 class="mb-2">Фильтр компаний</h2>
  <StringFilterFieldset legend="Сектор" bind:value={sector} />
  <button class="btn btn-primary mt-4">Применить</button>
</form>
