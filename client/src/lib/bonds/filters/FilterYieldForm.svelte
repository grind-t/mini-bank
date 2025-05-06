<script lang="ts">
  import type { BondListFilter } from "$lib/trpc";
  import BooleanFilterFieldset from "$lib/ui/filters/BooleanFilterFieldset.svelte";
  import NumberFilterFieldset from "$lib/ui/filters/NumberFilterFieldset.svelte";
  import StringFilterFieldset from "$lib/ui/filters/StringFilterFieldset.svelte";

  let {
    filter,
    onSubmit,
  }: {
    filter: BondListFilter;
    onSubmit: (filter: BondListFilter) => void;
  } = $props();

  let effectiveYield = $state(filter.yield || {});
  let nominal = $state(filter.nominal || {});
  let currency = $state(filter.currency || {});
  let hasAmortization = $state(filter.hasAmortization || {});
  let hasOffer = $state(filter.hasOffer || {});
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    onSubmit({
      ...filter,
      yield: effectiveYield,
      nominal,
      currency,
      hasAmortization,
      hasOffer,
    });
  }}
>
  <h2 class="mb-2">Фильтр доходности</h2>
  <div class="flex flex-col gap-2">
    <NumberFilterFieldset
      legend="Эффективная доходность"
      bind:value={effectiveYield}
    />
    <NumberFilterFieldset legend="Номинал" bind:value={nominal} />
    <StringFilterFieldset legend="Валюта" bind:value={currency} />
    <BooleanFilterFieldset legend="Амортизация" bind:value={hasAmortization} />
    <BooleanFilterFieldset legend="Оферта" bind:value={hasOffer} />
  </div>
  <button class="btn btn-primary mt-4">Применить</button>
</form>
