<script lang="ts">
  import { onMount, type Snippet } from "svelte";
  import { getToastHubContext } from "./ToastHub.svelte";

  let props: { class: string; children: Snippet } = $props();

  const snippets = getToastHubContext();

  onMount(() => {
    addToast();
    return removeToast;
  });

  function addToast() {
    snippets.push(toast);
  }

  function removeToast() {
    snippets.splice(snippets.indexOf(toast), 1);
  }
</script>

{#snippet toast()}
  <button class="{props.class} text-wrap" onclick={removeToast}>
    {@render props.children()}
  </button>
{/snippet}
