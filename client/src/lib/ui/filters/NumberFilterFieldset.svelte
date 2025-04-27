<script lang="ts">
  import type { NumberFilter } from "$lib/trpc";

  let {
    legend,
    value = $bindable(),
  }: {
    legend: string;
    value: NumberFilter;
  } = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">{legend}</legend>
  <div class="flex flex-col gap-2">
    <label class="input">
      <span class="label">Не меньше</span>
      <input type="number" bind:value={value.gte} />
    </label>
    <label class="input">
      <span class="label">Не больше</span>
      <input type="number" bind:value={value.lte} />
    </label>
  </div>
</fieldset>
