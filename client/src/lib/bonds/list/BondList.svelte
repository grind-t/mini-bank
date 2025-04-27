<script lang="ts">
  import type { Snippet } from "svelte";

  let props: { children: Snippet } = $props();
</script>

<ul class="list">
  {@render props.children()}
</ul>
