<script lang="ts">
  import type { StringFilter } from "$lib/trpc";

  let {
    legend,
    value = $bindable(),
  }: {
    legend: string;
    value: StringFilter;
  } = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">{legend}</legend>
  <div class="flex flex-col gap-2">
    <label class="input">
      <span class="label">Включает</span>
      <input
        type="text"
        bind:value={
          () => value.in?.join(","),
          (v) => {
            value.in = v?.split(",");
          }
        }
      />
    </label>
    <label class="input">
      <span class="label">Исключает</span>
      <input
        type="text"
        bind:value={
          () => value.nin?.join(","),
          (v) => {
            value.nin = v?.split(",");
          }
        }
      />
    </label>
  </div>
</fieldset>
