<script lang="ts">
  import type { BondListFilter } from "$lib/trpc";
  import DateFilterFieldset from "$lib/ui/filters/DateFilterFieldset.svelte";

  let {
    filter,
    onSubmit,
  }: {
    filter: BondListFilter;
    onSubmit: (filter: BondListFilter) => void;
  } = $props();

  let maturityDate = $state(filter.maturityDate || {});
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    onSubmit({
      ...filter,
      maturityDate,
    });
  }}
>
  <h2 class="mb-2">Фильтр срока</h2>
  <DateFilterFieldset legend="Дата погашения" bind:value={maturityDate} />
  <button class="btn btn-primary mt-4">Применить</button>
</form>
