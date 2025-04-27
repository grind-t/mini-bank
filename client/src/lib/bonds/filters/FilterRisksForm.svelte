<script lang="ts">
  import type { BondListFilter } from "$lib/trpc";
  import BooleanFilterFieldset from "$lib/ui/filters/BooleanFilterFieldset.svelte";
  import NumberFilterFieldset from "$lib/ui/filters/NumberFilterFieldset.svelte";
  import GenericError from "$lib/ui/GenericError.svelte";
  import GenericLoader from "$lib/ui/GenericLoader.svelte";
  import type { Promisable } from "type-fest";

  let {
    filter,
    onSubmit,
  }: {
    filter: BondListFilter;
    onSubmit: (filter: BondListFilter) => Promisable<void>;
  } = $props();

  let tInvest = $state(filter.rating?.tInvest || {});
  let bondFinder = $state(filter.rating?.bondFinder || {});
  let forQual = $state(filter.forQual || {});
  let submitPromise = $state<Promisable<void>>();
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    submitPromise = onSubmit({
      ...filter,
      rating: {
        tInvest,
        bondFinder,
      },
      forQual,
    });
  }}
>
  <h2 class="mb-2">Фильтр рисков</h2>
  <div class="flex flex-col gap-2">
    <NumberFilterFieldset
      legend="Рейтинг рейтингового агенства"
      bind:value={bondFinder}
    />
    <NumberFilterFieldset legend="Рейтинг Т-Инвестиций" bind:value={tInvest} />
    <BooleanFilterFieldset
      legend="Для квалифицированных инвесторов"
      bind:value={forQual}
    />
  </div>
  <button class="btn btn-primary mt-4">
    {#await submitPromise}
      <GenericLoader />
    {:then}
      Применить
    {:catch error}
      <GenericError {error} />
    {/await}
  </button>
</form>
