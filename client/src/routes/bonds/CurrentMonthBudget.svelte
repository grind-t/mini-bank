<script lang="ts">
  import { getCurrentMonthName } from "$lib/common/date";

  let props: { value: number; onChange: (value: number) => unknown } = $props();
</script>

<input
  value={props.value || undefined}
  class="input m-2"
  type="text"
  placeholder="Сумма на {getCurrentMonthName()}"
  onchange={(e) => {
    e.preventDefault();
    props.onChange(Number(e.currentTarget.value) || 0);
  }}
/>
