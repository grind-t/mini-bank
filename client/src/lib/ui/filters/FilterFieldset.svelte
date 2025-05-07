<script lang="ts">
  import type { Snippet } from "svelte";

  let { legend, children }: { legend: string; children: Snippet } = $props();
</script>

<fieldset class="fieldset">
  <legend class="fieldset-legend">{legend}</legend>
  <div class="flex flex-col gap-2">
    {@render children()}
  </div>
</fieldset>
