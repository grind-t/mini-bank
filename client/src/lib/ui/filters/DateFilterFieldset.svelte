<script lang="ts">
  import type { DateFilter } from "$lib/trpc";

  let {
    legend,
    value = $bindable(),
  }: {
    legend: string;
    value: DateFilter;
  } = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">{legend}</legend>
  <div class="flex flex-col gap-2">
    <label class="input">
      <span class="label">Не меньше</span>
      <input
        type="date"
        bind:value={
          () => value.gte?.toISOString().split("T")[0],
          (v) => {
            value.gte = v ? new Date(v) : undefined;
          }
        }
      />
    </label>
    <label class="input">
      <span class="label">Не больше</span>
      <input
        type="date"
        bind:value={
          () => value.lte?.toISOString().split("T")[0],
          (v) => {
            value.lte = v ? new Date(v) : undefined;
          }
        }
      />
    </label>
  </div>
</fieldset>
