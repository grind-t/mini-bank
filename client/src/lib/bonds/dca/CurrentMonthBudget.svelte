<script lang="ts">
  import { getCurrentMonthName } from "@grind-t/toolkit/date";

  let props: { value: number; onChange: (value: number) => unknown } = $props();
</script>

<input
  value={props.value || undefined}
  class="flex-none input m-2"
  type="text"
  placeholder="Сумма на {getCurrentMonthName('ru')}"
  onchange={(e) => {
    e.preventDefault();
    props.onChange(Number(e.currentTarget.value) || 0);
  }}
/>
