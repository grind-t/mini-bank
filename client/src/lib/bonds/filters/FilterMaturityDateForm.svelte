<script lang="ts">
  import type { BondListFilter } from "$lib/trpc";
  import DateFilterFieldset from "$lib/ui/filters/DateFilterFieldset.svelte";
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

  let maturityDate = $state(filter.maturityDate || {});
  let submitPromise = $state<Promisable<void>>();
</script>

<form
  onsubmit={(e) => {
    e.preventDefault();
    submitPromise = onSubmit({
      ...filter,
      maturityDate,
    });
  }}
>
  <h2 class="mb-2">Фильтр срока</h2>
  <DateFilterFieldset legend="Дата погашения" bind:value={maturityDate} />
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
