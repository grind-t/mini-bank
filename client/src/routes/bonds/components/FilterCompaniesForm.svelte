<script lang="ts">
  import type { BondListFilter } from "$lib/trpc";
  import StringFilterFieldset from "$lib/ui/filters/StringFilterFieldset.svelte";
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

  let sector = $state(filter.sector || {});
  let submitPromise = $state<Promisable<void>>();
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    submitPromise = onSubmit({
      ...filter,
      sector,
    });
  }}
>
  <h2 class="mb-2">Фильтр компаний</h2>
  <StringFilterFieldset legend="Сектор" bind:value={sector} />
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
