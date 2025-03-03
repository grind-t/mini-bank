<script lang="ts">
  import type { Snippet } from "svelte";

  let props: { ms: number; children: Snippet } = $props();
</script>

{#await new Promise((r) => setTimeout(r, props.ms))}
  {@render props.children()}
{/await}
