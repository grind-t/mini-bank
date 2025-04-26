<script lang="ts" module>
  import { getContext, setContext, type Snippet } from "svelte";

  const key = Symbol("toast-hub");
  export const getToastHubContext = () => getContext<Snippet[]>(key);
</script>

<script lang="ts">
  let props: { children: Snippet } = $props();
  let toasts = $state([] as Snippet[]);

  setContext(key, toasts);
</script>

{@render props.children()}
<div class="toast">
  {#each toasts as snippet (snippet)}
    {@render snippet()}
  {/each}
</div>
