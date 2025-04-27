<script lang="ts">
  import type { BooleanFilter } from "$lib/trpc";

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

<fieldset class="fieldset">
  <legend class="fieldset-legend">{legend}</legend>
  <div class="flex flex-col gap-2">
    <label class="label">
      <input
        indeterminate={isIndeterminate}
        bind:checked={
          () => value.eq,
          () => {
            value.eq = isIndeterminate ? false : isChecked ? undefined : true;
          }
        }
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
  </div>
</fieldset>
