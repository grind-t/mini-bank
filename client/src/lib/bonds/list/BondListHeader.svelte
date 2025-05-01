<script lang="ts">
  import { getUserContext } from "$lib/auth/context";
  import type { BondListFilter } from "$lib/trpc";
  import BondListItem from "./BondListItem.svelte";
  import FilterButton from "../../../lib/ui/filters/FilterButton.svelte";
  import type { Promisable } from "type-fest";
  import Modal from "$lib/ui/Modal.svelte";
  import FilterCompaniesForm from "../filters/FilterCompaniesForm.svelte";
  import FilterRisksForm from "../filters/FilterRisksForm.svelte";
  import FilterYieldForm from "../filters/FilterYieldForm.svelte";
  import FilterMaturityDateForm from "../filters/FilterMaturityDateForm.svelte";
  import type { BondGroup, SelectedBond } from "./getBondListGroups";

  const user = getUserContext();

  let {
    groups,
    filter,
    onFilterChange,
  }: {
    groups: BondGroup[];
    filter: BondListFilter;
    onFilterChange: (filter: BondListFilter) => Promisable<void>;
  } = $props();

  let filterCompaniesModal = $state<Modal | null>(null);
  let filterRisksModal = $state<Modal | null>(null);
  let filterYieldModal = $state<Modal | null>(null);
  let filterMaturityDateModal = $state<Modal | null>(null);

  let totalSelected = $derived(
    groups.reduce((acc, group) => acc + group.selectedBonds.length, 0)
  );
</script>

<BondListItem sticky>
  {#if user}
    <div>{totalSelected} шт.</div>
  {/if}

  <div class="flex flex-col gap-2">
    <div class="line-clamp-1">Наименование</div>
    <FilterButton
      label="Фильтр компаний"
      onClick={() => filterCompaniesModal?.open()}
    />
    <Modal bind:this={filterCompaniesModal}>
      <FilterCompaniesForm
        {filter}
        onSubmit={async (v) => {
          await onFilterChange(v);
          filterCompaniesModal?.close();
        }}
      />
    </Modal>
  </div>

  <div class="flex flex-col gap-2">
    <div class="line-clamp-1">Рейтинг</div>
    <FilterButton label="Фильтр рисков" onClick={filterRisksModal?.open} />
    <Modal bind:this={filterRisksModal}>
      <FilterRisksForm
        {filter}
        onSubmit={async (v) => {
          await onFilterChange(v);
          filterRisksModal?.close();
        }}
      />
    </Modal>
  </div>

  <div class="flex flex-col gap-2">
    <div class="line-clamp-1">Доходность</div>
    <FilterButton label="Фильр доходности" onClick={filterYieldModal?.open} />
    <Modal bind:this={filterYieldModal}>
      <FilterYieldForm
        {filter}
        onSubmit={async (v) => {
          await onFilterChange(v);
          filterYieldModal?.close();
        }}
      />
    </Modal>
  </div>

  <div class="flex flex-col gap-2">
    <div class="line-clamp-1">Срок</div>
    <FilterButton
      label="Фильтр срока"
      onClick={filterMaturityDateModal?.open}
    />
    <Modal bind:this={filterMaturityDateModal}>
      <FilterMaturityDateForm
        {filter}
        onSubmit={async (v) => {
          await onFilterChange(v);
          filterMaturityDateModal?.close();
        }}
      />
    </Modal>
  </div>
</BondListItem>
