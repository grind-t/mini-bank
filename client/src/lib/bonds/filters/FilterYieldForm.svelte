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

  let ytm = $state(filter.ytm || {});
  let eytm = $state(filter.eytm || {});
  let nominal = $state(filter.nominal || {});
  let currency = $state(filter.currency || {});
  let hasAmortization = $state(filter.hasAmortization || {});
  let hasOffer = $state(filter.hasOffer || {});
  let isFloater = $state(filter.isFloater || {});
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    onSubmit({
      ...filter,
      ytm,
      eytm,
      nominal,
      currency,
      hasAmortization,
      hasOffer,
    });
  }}
>
  <h2 class="mb-2">Фильтр доходности</h2>
  <div class="flex flex-col gap-2">
    <NumberFilterFieldset legend="Доходность к погашению" bind:value={ytm} />
    <NumberFilterFieldset
      legend="Эффективная доходность к погашению"
      bind:value={eytm}
    />
    <NumberFilterFieldset legend="Номинал" bind:value={nominal} />
    <StringFilterFieldset legend="Валюта" bind:value={currency} />
    <BooleanFilterFieldset legend="Амортизация" bind:value={hasAmortization} />
    <BooleanFilterFieldset legend="Оферта" bind:value={hasOffer} />
    <BooleanFilterFieldset legend="Флоатер" bind:value={isFloater} />
  </div>
  <button class="btn btn-primary mt-4">Применить</button>
</form>
